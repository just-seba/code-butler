// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import * as logger from "./logger";
import { ConfigurationProvider } from "./configuration-provider";

import { runCleanup } from "./cleanup";
import * as dotnetTool from "./dotnet-tool";

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export async function activate(context: vscode.ExtensionContext) {
  logger.info(`👋 Initializing ${context.extension.id}`);
  await dotnetTool.isInstalledOrAskToInstall();

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
    ConfigurationProvider.invalidate();
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
  if (!ConfigurationProvider.configuration.cleanupOnSave) {
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
