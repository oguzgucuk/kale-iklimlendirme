import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const publicDir = path.resolve('public');
const sourceFile = path.join(publicDir, 'apple-touch-icon.png');

async function main() {
  const base = sharp(sourceFile);

  // Generate PNG sizes
  const buf16 = await base.clone().resize(16, 16).png().toBuffer();
  const buf32 = await base.clone().resize(32, 32).png().toBuffer();
  const buf48 = await base.clone().resize(48, 48).png().toBuffer();
  const buf96 = await base.clone().resize(96, 96).png().toBuffer();
  const buf192 = await base.clone().resize(192, 192).png().toBuffer();
  const buf512 = await base.clone().resize(512, 512).png().toBuffer();

  fs.writeFileSync(path.join(publicDir, 'favicon-48x48.png'), buf48);
  fs.writeFileSync(path.join(publicDir, 'favicon-96x96.png'), buf96);
  fs.writeFileSync(path.join(publicDir, 'icon-192.png'), buf192);
  fs.writeFileSync(path.join(publicDir, 'icon-512.png'), buf512);

  // Create multi-image ICO (16, 32, 48)
  const images = [
    { width: 16, height: 16, buf: buf16 },
    { width: 32, height: 32, buf: buf32 },
    { width: 48, height: 48, buf: buf48 },
  ];

  const headerSize = 6;
  const dirEntrySize = 16;
  let offset = headerSize + dirEntrySize * images.length;

  const header = Buffer.alloc(headerSize);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type: icon
  header.writeUInt16LE(images.length, 4); // count

  const dirEntries = [];
  for (const img of images) {
    const entry = Buffer.alloc(dirEntrySize);
    entry.writeUInt8(img.width === 256 ? 0 : img.width, 0);
    entry.writeUInt8(img.height === 256 ? 0 : img.height, 1);
    entry.writeUInt8(0, 2); // color palette
    entry.writeUInt8(0, 3); // reserved
    entry.writeUInt16LE(1, 4); // planes
    entry.writeUInt16LE(32, 6); // bpp
    entry.writeUInt32LE(img.buf.length, 8); // size
    entry.writeUInt32LE(offset, 12); // offset
    dirEntries.push(entry);
    offset += img.buf.length;
  }

  const icoBuf = Buffer.concat([header, ...dirEntries, ...images.map((i) => i.buf)]);
  fs.writeFileSync(path.join(publicDir, 'favicon.ico'), icoBuf);

  console.log('Favicons generated successfully!');
}

main().catch(console.error);
