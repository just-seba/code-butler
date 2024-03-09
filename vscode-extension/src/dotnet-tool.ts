import { spawn } from "child_process";
export async function run(documentText: string): Promise<string> {
  const tool = spawn("dotnet-code-butler", { stdio: ["pipe"] });
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
