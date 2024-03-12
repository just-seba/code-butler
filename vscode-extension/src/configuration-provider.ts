import * as vscode from "vscode";
import { Configuration } from "./configuration";

export class ConfigurationProvider {
  private static _configuration: Configuration | undefined;

  private constructor() {
    // static class
  }

  public static get configuration(): Configuration {
    if (this._configuration === undefined) {
      this._configuration = vscode.workspace.getConfiguration(
        "code-butler"
      ) as any;
    }

    return this._configuration as Configuration;
  }

  public static invalidate() {
    this._configuration = undefined;
  }
}
