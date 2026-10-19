import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const imagesDir = 'public/images';
const files = fs.readdirSync(imagesDir).filter(f => f.match(/\.(jpg|jpeg|png)$/i) && !f.startsWith('_temp_'));

console.log(`Found ${files.length} images to compress and optimize...`);

let totalOriginalBytes = 0;
let totalCompressedBytes = 0;

for (const file of files) {
  const filePath = path.join(imagesDir, file);
  const stat = fs.statSync(filePath);
  totalOriginalBytes += stat.size;

  // Read file into memory buffer so sharp doesn't hold an active file lock
  const inputBuffer = fs.readFileSync(filePath);

  const outputBuffer = await sharp(inputBuffer)
    .resize({ width: 1280, withoutEnlargement: true })
    .jpeg({ quality: 82, progressive: true, mozjpeg: true })
    .toBuffer();

  totalCompressedBytes += outputBuffer.length;

  // Overwrite directly with buffer
  fs.writeFileSync(filePath, outputBuffer);

  console.log(`✓ ${file}: ${(stat.size / 1024).toFixed(0)} KB -> ${(outputBuffer.length / 1024).toFixed(0)} KB (-${(((stat.size - outputBuffer.length) / stat.size) * 100).toFixed(0)}%)`);
}

// Clean up any stray temp files
const strayTemps = fs.readdirSync(imagesDir).filter(f => f.startsWith('_temp_'));
strayTemps.forEach(t => fs.unlinkSync(path.join(imagesDir, t)));

console.log('=============================================');
console.log(`TOTAL REDUCTION: ${(totalOriginalBytes / (1024 * 1024)).toFixed(2)} MB -> ${(totalCompressedBytes / (1024 * 1024)).toFixed(2)} MB`);
console.log(`Bandwidth Saved: -${(((totalOriginalBytes - totalCompressedBytes) / totalOriginalBytes) * 100).toFixed(1)}%`);
console.log('=============================================');
