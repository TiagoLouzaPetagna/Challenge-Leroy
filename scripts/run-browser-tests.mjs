import { spawn, spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const projectRoot = fileURLToPath(new URL("../", import.meta.url));
const vinextCli = fileURLToPath(
  new URL("../node_modules/vinext/dist/cli.js", import.meta.url),
);
const playwrightCli = fileURLToPath(
  new URL("../node_modules/@playwright/test/cli.js", import.meta.url),
);
const baseUrl = "http://localhost:4173";

function run(command, args, options = {}) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      cwd: projectRoot,
      stdio: "inherit",
      windowsHide: true,
      ...options,
    });
    child.once("error", reject);
    child.once("exit", (code, signal) => {
      if (signal) {
        reject(new Error(`${command} foi encerrado por ${signal}.`));
        return;
      }
      resolve(code ?? 1);
    });
  });
}

async function waitForServer(server) {
  for (let attempt = 0; attempt < 120; attempt += 1) {
    if (server.exitCode !== null) {
      throw new Error(
        `O servidor de teste encerrou antes de ficar pronto (${server.exitCode}).`,
      );
    }

    try {
      const response = await fetch(baseUrl);
      if (response.ok) return;
    } catch {
      // O servidor ainda está iniciando.
    }

    await new Promise((resolve) => setTimeout(resolve, 500));
  }

  throw new Error(`O servidor de teste não respondeu em ${baseUrl}.`);
}

function findWindowsListenerPids() {
  const result = spawnSync("netstat", ["-ano", "-p", "tcp"], {
    encoding: "utf8",
    windowsHide: true,
  });
  if (result.status !== 0) return [];

  const pids = new Set();
  for (const line of result.stdout.split(/\r?\n/)) {
    if (!line.includes(":4173") || !line.includes("LISTENING")) continue;
    const match = line.trim().match(/\s(\d+)$/);
    if (match) pids.add(Number(match[1]));
  }
  return [...pids];
}

function stopServerTree(server) {
  if (!server.pid) return;

  if (process.platform === "win32") {
    const targetPids = [...findWindowsListenerPids(), server.pid];
    for (const pid of new Set(targetPids)) {
      try {
        process.kill(pid, "SIGTERM");
      } catch {
        spawnSync("taskkill", ["/PID", String(pid), "/T", "/F"], {
          stdio: "ignore",
          windowsHide: true,
        });
      }
    }
    return;
  }

  server.kill("SIGTERM");
}

if (!process.argv.includes("--skip-build")) {
  const npmCli = process.env.npm_execpath;
  if (!npmCli) {
    throw new Error("npm_execpath ausente; execute pelo script npm test:browser.");
  }
  const buildExitCode = await run(process.execPath, [npmCli, "run", "build"]);
  if (buildExitCode !== 0) process.exit(buildExitCode);
}

const server = spawn(
  process.execPath,
  [vinextCli, "dev", "--port", "4173"],
  {
    cwd: projectRoot,
    stdio: "ignore",
    windowsHide: true,
  },
);

let exitCode = 1;
try {
  await waitForServer(server);
  exitCode = await run(process.execPath, [playwrightCli, "test"]);
} finally {
  stopServerTree(server);
}

process.exitCode = exitCode;
