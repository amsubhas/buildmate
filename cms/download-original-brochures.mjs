import fs from 'node:fs/promises';

const outputDir = '/directus/public/brochures/pdf';
const brochures = JSON.parse(await fs.readFile(new URL('./brochure-sources.json', import.meta.url), 'utf8'));

await fs.mkdir(outputDir, { recursive: true });

for (const brochure of brochures) {
  const target = `${outputDir}/${brochure.filename}`;
  const res = await fetch(brochure.url, { redirect: 'follow' });
  if (!res.ok) throw new Error(`Download failed for ${brochure.filename}: HTTP ${res.status}`);
  const bytes = Buffer.from(await res.arrayBuffer());
  if (bytes.length < 1000 || bytes.subarray(0, 5).toString('latin1') !== '%PDF-') {
    throw new Error(`Downloaded content is not a valid PDF for ${brochure.filename}`);
  }
  await fs.writeFile(target, bytes);
  console.log(`Downloaded original ${brochure.filename} (${bytes.length} bytes)`);
}

console.log(`Original brochure download complete: ${brochures.length} PDFs.`);
