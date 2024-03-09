import * as vscode from "vscode";
import { performance } from "perf_hooks";
import { Logger } from "./Logger";
import { DotnetTool } from "./DotnetTool";
import { CodeButlerConfigurationProvider } from "./CodeButlerConfigurationProvider";

export async function runCleanup(document: vscode.TextDocument) {
  const logger = Logger.Instance();

  try {
    logger.info(`Clean up started for ${document.fileName}.`);
    const start = performance.now();
    await runCleanupImplementation(document);
    const end = performance.now();
    logger.info(`Clean up done in ${Math.round(end - start)}ms.`);
  } catch (error) {
    logger.error(error as Error);
  }
}

async function runCleanupImplementation(document: vscode.TextDocument) {
  const logger = Logger.Instance();

  if (!document) {
    logger.error("No document specified.");
    return;
  }

  if (document.languageId !== "csharp") {
    logger.error("Only C# files are supported.");
    return;
  }

  if (document.lineCount <= 1) {
    logger.info("Empty document. Nothing to cleanup.");
    return;
  }

  const config = CodeButlerConfigurationProvider.configuration;
  const dotnetTool = new DotnetTool({
    sortMebersByAlphabet: config.sortMembersByAlphabet,
  });
  const result = await dotnetTool.run(document.getText());
  await replaceContent(document, result);
  await vscode.commands.executeCommand("editor.action.formatDocument");
}

function replaceContent(
  document: vscode.TextDocument,
  content: string
): Thenable<boolean> {
  const firstLine = document.lineAt(0);
  const lastLine = document.lineAt(document.lineCount - 1);

  const range = new vscode.Range(firstLine.range.start, lastLine.range.end);

  const edit = new vscode.WorkspaceEdit();
  edit.replace(document.uri, range, content);
  return vscode.workspace.applyEdit(edit);
}
