import { spawn, execFile, ExecFileException } from "child_process";
import { promisify } from "util";
import { window } from "vscode";
import * as logger from "./logger";

const execFileAsync = promisify(execFile);

const _toolId = "code-butler";
const _command = "dotnet-code-butler";

export async function executeRootCommand(
  documentText: string,
  config: { sortMebersByAlphabet: boolean }
): Promise<string> {
  if (!(await isInstalledOrAskToInstall())) {
    throw new Error(
      `Unable to execute root command. ${_toolId} is not installed.`
    );
  }

  const args = [];
  config.sortMebersByAlphabet || args.push("--no-sort-members-by-alphabet");

  const cp = spawn(_command, args, { stdio: ["pipe"] });
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

export async function isInstalledOrAskToInstall(): Promise<boolean> {
  const version = await getVersion();
  if (version !== null) {
    return true;
  }

  logger.error(`${_toolId} is not installed.`);

  window
    .showErrorMessage(
      `Code Butler: Global dotnet tool '${_toolId}' is required.`,
      `Install ${_toolId}`
    )
    .then(async (selection) => {
      if (selection === undefined) {
        return;
      }

      logger.info(`Installing global dotnet tool ${_toolId}.`);
      try {
        await install();
        logger.info("Installation succeeded.");
      } catch (error) {
        logger.error(`Installation failed: ${error}`);
        window.showErrorMessage("Code Butler: Installation failed.");
      }
    });

  return false;
}

async function getVersion(): Promise<string | null> {
  try {
    const { stdout } = await execFileAsync(_command, ["--version"]);
    return stdout;
  } catch (error) {
    if ((error as ExecFileException)?.code === "ENOENT") {
      return null;
    }

    throw error;
  }
}

async function install(): Promise<void> {
  await execFileAsync("dotnet", ["tool", "install", "--global", _toolId]);
}
