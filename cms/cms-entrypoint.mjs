import { spawn } from 'node:child_process';

const directus = spawn(process.execPath, ['/directus/docker-entrypoint.cjs'], {
  stdio: 'inherit',
  env: process.env,
});

const pingUrl = 'http://127.0.0.1:8055/server/ping';

async function waitForDirectus(timeoutMs = 120000) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    try {
      const response = await fetch(pingUrl);
      if (response.ok) return;
    } catch {}
    await new Promise((resolve) => setTimeout(resolve, 2000));
  }
  throw new Error('Directus did not become ready within 120 seconds');
}

async function runScript(script) {
  const child = spawn(process.execPath, [`/directus/${script}`], {
    stdio: 'inherit',
    env: process.env,
  });
  const result = await new Promise((resolve, reject) => {
    child.on('error', reject);
    child.on('exit', (code, signal) => resolve({ code, signal }));
  });
  if (result.signal || result.code !== 0) {
    throw new Error(`${script} failed (code=${result.code}, signal=${result.signal ?? 'none'})`);
  }
}

for (const signal of ['SIGINT', 'SIGTERM', 'SIGHUP', 'SIGQUIT']) {
  process.on(signal, () => directus.kill(signal));
}

try {
  await waitForDirectus();
  await runScript('bootstrap.mjs');
  await runScript('configure-public.mjs');
  await runScript('migrate-brochures.mjs');
  console.log('BuildMate CMS bootstrap, public access, and original brochure migration completed successfully.');
} catch (error) {
  console.error(error?.stack ?? error);
  directus.kill('SIGTERM');
  process.exitCode = 1;
}

await new Promise((resolve) => directus.on('exit', resolve));
