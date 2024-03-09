import { window as window } from "vscode";

type LogLevel = "INFO" | "ERROR";

export class Logger {
  private static _instance: Logger | undefined;
  private _outputChannel = window.createOutputChannel("Code Butler");

  private constructor() {}

  public static Instance() {
    if (this._instance === undefined) {
      this._instance = new Logger();
    }

    return this._instance;
  }

  public info(message: string) {
    this.log("INFO", message);
  }

  public error(error: Error | string) {
    if (error instanceof Error) {
      this.log(
        "ERROR",
        `${error.message}\n${error.stack ?? "No stack available"}`
      );
    } else if (typeof error === "string") {
      this.log("ERROR", error);
    } else {
      const json = JSON.stringify(error);
      this.log("ERROR", `Unknown error:\n${json}`);
    }
  }

  private log(logLevel: LogLevel, message: string) {
    const timeStamp = new Date().toISOString();
    this._outputChannel.appendLine(`[${logLevel} - ${timeStamp}] ${message}`);
    console.log(message);
  }
}
