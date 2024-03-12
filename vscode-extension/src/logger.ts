import { window as window } from "vscode";

type LogLevel = "INFO" | "ERROR";
const _outputChannel = window.createOutputChannel("Code Butler");

export function info(message: string) {
  log("INFO", message);
}

export function error(error: Error | string) {
  if (error instanceof Error) {
    log("ERROR", `${error.message}\n${error.stack ?? "No stack available"}`);
  } else if (typeof error === "string") {
    log("ERROR", error);
  } else {
    const json = JSON.stringify(error);
    log("ERROR", `Unknown error:\n${json}`);
  }
}

function log(logLevel: LogLevel, message: string) {
  const timeStamp = new Date().toISOString();
  _outputChannel.appendLine(
    `[${logLevel.slice(0, 3)} - ${timeStamp}] ${message}`
  );
  console.log(message);
}
