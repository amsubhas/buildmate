import { spawn } from 'node:child_process';

// Render supplies PORT for the public web service. Directus itself defaults to 8055,
// so explicitly mirror Render's port into Directus' environment when present.
const runtimePort = Number(process.env.PORT || 8055);
const localDirectusUrl = `http://127.0.0.1:${runtimePort}`;
const directusEnv = {
  ...process.env,
  HOST: process.env.HOST || '0.0.0.0',
  PORT: String(runtimePort),
};

const directus = spawn(process.execPath, ['/directus/docker-entrypoint.cjs'], {
  stdio: 'inherit',
  env: directusEnv,
});

const pingUrl = `${localDirectusUrl}/server/ping`;

async function waitForDirectus(timeoutMs = 180000) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    try {
      const response = await fetch(pingUrl);
      if (response.ok) return;
    } catch {}
    await new Promise((resolve) => setTimeout(resolve, 2000));
  }
  throw new Error(`Directus did not become ready within ${timeoutMs / 1000} seconds on ${pingUrl}`);
}

async function runScript(script) {
  const child = spawn(process.execPath, [`/directus/${script}`], {
    stdio: 'inherit',
    env: {
      ...directusEnv,
      DIRECTUS_URL: localDirectusUrl,
    },
  });
  return new Promise((resolve, reject) => {
    child.on('error', reject);
    child.on('exit', (code, signal) => {
      if (signal || code !== 0) {
        reject(new Error(`${script} failed (code=${code}, signal=${signal ?? 'none'})`));
        return;
      }
      resolve();
    });
  });
}

for (const signal of ['SIGINT', 'SIGTERM', 'SIGHUP', 'SIGQUIT']) {
  process.on(signal, () => directus.kill(signal));
}

// Directus is the actual long-running web process. Initialization is deliberately
// performed only after Directus is already reachable so Render can pass its port /
// health checks instead of waiting behind schema and brochure work.
try {
  await waitForDirectus();
  console.log(`Directus is reachable on ${localDirectusUrl}; starting BuildMate CMS initialization.`);

  for (const script of ['bootstrap.mjs', 'configure-public.mjs', 'migrate-brochures.mjs']) {
    try {
      await runScript(script);
      console.log(`BuildMate CMS step completed: ${script}`);
    } catch (error) {
      // Keep the CMS process alive. A one-time content migration must never take
      // the public Directus API offline. The failed step can be retried on the next
      // deploy after its code/configuration is corrected.
      console.error(`BuildMate CMS step failed without stopping Directus: ${script}`);
      console.error(error?.stack ?? error);
    }
  }
} catch (error) {
  console.error('BuildMate CMS initialization could not start:', error?.stack ?? error);
}

// Keep this wrapper alive as long as Directus is alive. Render therefore sees the
// same long-running web service process and receives a clean shutdown signal.
await new Promise((resolve) => directus.on('exit', resolve));
