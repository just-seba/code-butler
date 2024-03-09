import * as vscode from "vscode";
import { CodeButlerConfiguration } from "./CodeButlerConfiguration";

export class CodeButlerConfigurationProvider {
  static configuration: CodeButlerConfiguration;
  public static load() {
    this.configuration = vscode.workspace.getConfiguration(
      "code-butler"
    ) as any;
  }
}
