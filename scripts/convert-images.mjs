import sharp from 'sharp';
import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const files = process.argv.slice(2);

const results = [];

async function convert(file) {
  const abs = path.join(root, file);
  const before = fs.statSync(abs).size;
  const out = abs.replace(/\.(jpe?g|png)$/i, '.webp');

  let width = 1920;
  let quality = 80;
  let buf;

  for (let attempt = 0; attempt < 3; attempt++) {
    buf = await sharp(abs)
      .resize({ width, withoutEnlargement: true })
      .webp({ quality })
      .toBuffer();
    if (buf.length <= 300 * 1024) break;
    if (quality > 70) quality = 70;
    else width = 1600;
  }

  fs.writeFileSync(out, buf);
  const after = buf.length;
  results.push({ file, before, after, width, quality });
  console.log(
    `${file}\t${(before / 1024).toFixed(0)} Ko -> ${(after / 1024).toFixed(0)} Ko\t(q=${quality}, w<=${width})`
  );
}

for (const f of files) {
  try {
    await convert(f);
  } catch (e) {
    console.error(`ECHEC ${f}: ${e.message}`);
    process.exitCode = 1;
  }
}

const totalBefore = results.reduce((a, r) => a + r.before, 0);
const totalAfter = results.reduce((a, r) => a + r.after, 0);
console.log(`---\nTOTAL ${(totalBefore / 1024 / 1024).toFixed(1)} Mo -> ${(totalAfter / 1024 / 1024).toFixed(1)} Mo`);
