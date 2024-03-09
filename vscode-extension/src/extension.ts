// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import { Logger } from "./Logger";
import { CodeButlerConfigurationProvider } from "./CodeButlerConfigurationProvider";

import { runCleanup } from "./cleanup";
import { DotnetTool } from "./DotnetTool";

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export async function activate(context: vscode.ExtensionContext) {
  const logger = Logger.Instance();
  logger.info(`👋 Initializing ${context.extension.id}`);
  await DotnetTool.isInstalledOrAskToInstall();

  CodeButlerConfigurationProvider.load();

  const disposables = vscode.Disposable.from(
    // Configuration
    vscode.workspace.onDidChangeConfiguration(onDidChangeConfigurationHandler),

    // Commands
    vscode.commands.registerTextEditorCommand(
      "extension.code-butler.cleanup",
      commandHandler
    ),

    // Save text document
    vscode.workspace.onWillSaveTextDocument(onWillSaveTextDocumentHandler)
  );

  context.subscriptions.push(disposables);
}

// This method is called when your extension is deactivated
export function deactivate() {}

function onDidChangeConfigurationHandler(
  event: vscode.ConfigurationChangeEvent
) {
  if (event.affectsConfiguration("code-butler")) {
    CodeButlerConfigurationProvider.load();
  }
}

async function commandHandler(
  textEditor: vscode.TextEditor,
  _: vscode.TextEditorEdit,
  ...__: any[]
) {
  await runCleanup(textEditor?.document);
}

async function onWillSaveTextDocumentHandler(
  event: vscode.TextDocumentWillSaveEvent
) {
  if (!CodeButlerConfigurationProvider.configuration.cleanupOnSave) {
    return;
  }

  if (event.reason !== vscode.TextDocumentSaveReason.Manual) {
    return;
  }

  if (!event.document || event.document.languageId !== "csharp") {
    return;
  }

  event.waitUntil(runCleanup(event.document));
}
