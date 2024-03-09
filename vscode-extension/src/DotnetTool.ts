import { spawn } from "child_process";

export class DotnetTool {
  private readonly _config: { sortMebersByAlphabet: boolean };

  constructor(config: { sortMebersByAlphabet: boolean }) {
    this._config = config;
  }

  public async run(documentText: string): Promise<string> {
    const args = this.getArgs();
    const tool = spawn("dotnet-code-butler", args, { stdio: ["pipe"] });
    let stdOutData = "";
    let stdErrData = "";

    tool.stdout.setEncoding("utf-8");
    tool.stdout.on("data", (data) => {
      stdOutData += data;
    });

    tool.stderr.setEncoding("utf-8");
    tool.stderr.on("data", (data) => {
      stdErrData += data;
    });

    const promise = new Promise<string>((resolve, reject) => {
      tool.on("close", (exitCode) => {
        if (exitCode === 0) {
          resolve(stdOutData);
        } else {
          reject(stdErrData);
        }
      });
    });

    tool.stdin.end(documentText, "utf-8");
    return promise;
  }

  private getArgs(): string[] {
    const args = [];
    if (!this._config.sortMebersByAlphabet) {
      args.push("--no-sort-members-by-alphabet");
    }

    return args;
  }
}
