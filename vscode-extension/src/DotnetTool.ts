import { spawn, execFile, ExecFileException } from "child_process";
import { promisify } from "util";
import { window } from "vscode";
import { Logger } from "./Logger";
import { stderr, stdin } from "process";

const execFileAsync = promisify(execFile);

export class DotnetTool {
  private static _toolId = "code-butler";
  private static _command = "dotnet-code-butler";

  private constructor() {
    /* static class */
  }

  public static async executeRootCommand(
    documentText: string,
    config: { sortMebersByAlphabet: boolean }
  ): Promise<string> {
    if (!(await this.isInstalledOrAskToInstall())) {
      throw new Error(
        `Unable to execute root command. ${this._toolId} is not installed.`
      );
    }

    const args = [];
    config.sortMebersByAlphabet || args.push("--no-sort-members-by-alphabet");

    const cp = spawn(this._command, args, { stdio: ["pipe"] });
    const stdoutData: string[] = [];
    const stderrData: string[] = [];

    cp.stdout.setEncoding("utf-8");
    cp.stdout.on("data", (data) => stdoutData.push(data));

    cp.stderr.setEncoding("utf-8");
    cp.stderr.on("data", (data) => stderrData.push(data));

    const promise = new Promise<string>((resolve, reject) => {
      cp.on("error", (error) => {
        reject(error);
      });

      cp.on("close", (exitCode) => {
        if (exitCode === 0) {
          resolve(stdoutData.join(""));
        } else {
          reject(stderrData.join(""));
        }
      });
    });

    cp.stdin.end(documentText, "utf-8");
    return promise;
  }

  public static async isInstalledOrAskToInstall(): Promise<boolean> {
    const version = await this.getVersion();
    if (version !== null) {
      return true;
    }

    Logger.Instance().error(`${this._toolId} is not installed.`);

    window
      .showErrorMessage(
        `Code Butler: Global dotnet tool '${this._toolId}' is required.`,
        `Install ${this._toolId}`
      )
      .then(async (selection) => {
        if (selection === undefined) {
          return;
        }

        const logger = Logger.Instance();
        logger.info(`Installing global dotnet tool ${this._toolId}.`);
        try {
          await this.install();
          logger.info("Installation succeeded.");
        } catch (error) {
          logger.error(`Installation failed: ${error}`);
          window.showErrorMessage("Code Butler: Installation failed.");
        }
      });

    return false;
  }

  private static async getVersion(): Promise<string | null> {
    try {
      const { stdout } = await execFileAsync(this._command, ["--version"]);
      return stdout;
    } catch (error) {
      if ((error as ExecFileException)?.code === "ENOENT") {
        return null;
      }

      throw error;
    }
  }

  private static async install(): Promise<void> {
    await execFileAsync("dotnet", [
      "tool",
      "install",
      "--global",
      this._toolId,
    ]);
  }
}
