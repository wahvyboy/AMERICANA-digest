import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const imagesDir = 'public/images';
if (!fs.existsSync(imagesDir)) {
  console.error(`Directory ${imagesDir} not found.`);
  process.exit(1);
}

// Find all base jpg/png images (exclude generated thumb/medium variants)
const files = fs.readdirSync(imagesDir).filter(f => 
  f.match(/\.(jpg|jpeg|png)$/i) && 
  !f.startsWith('_temp_') && 
  !f.includes('-thumb') && 
  !f.includes('-medium')
);

console.log(`=============================================`);
console.log(`Found ${files.length} base images to optimize into modern WebP & responsive sizes...`);
console.log(`=============================================\n`);

let totalOriginalBytes = 0;
let totalWebpBytes = 0;

for (const file of files) {
  const filePath = path.join(imagesDir, file);
  const stat = fs.statSync(filePath);
  totalOriginalBytes += stat.size;

  const baseName = path.parse(file).name;
  const webpPath = path.join(imagesDir, `${baseName}.webp`);
  const thumbPath = path.join(imagesDir, `${baseName}-thumb.webp`);
  const mediumPath = path.join(imagesDir, `${baseName}-medium.webp`);

  const inputBuffer = fs.readFileSync(filePath);

  // 1. Full Hero WebP (max width 1200)
  const fullWebpBuffer = await sharp(inputBuffer)
    .resize({ width: 1200, withoutEnlargement: true })
    .webp({ quality: 82, effort: 4 })
    .toBuffer();
  fs.writeFileSync(webpPath, fullWebpBuffer);

  // 2. Medium WebP (width 800)
  const mediumWebpBuffer = await sharp(inputBuffer)
    .resize({ width: 800, withoutEnlargement: true })
    .webp({ quality: 80, effort: 4 })
    .toBuffer();
  fs.writeFileSync(mediumPath, mediumWebpBuffer);

  // 3. Thumbnail WebP (width 400)
  const thumbWebpBuffer = await sharp(inputBuffer)
    .resize({ width: 400, withoutEnlargement: true })
    .webp({ quality: 78, effort: 4 })
    .toBuffer();
  fs.writeFileSync(thumbPath, thumbWebpBuffer);

  // 4. Also optimize the original JPG as fallback (max 1200 width)
  const optimizedJpgBuffer = await sharp(inputBuffer)
    .resize({ width: 1200, withoutEnlargement: true })
    .jpeg({ quality: 80, progressive: true, mozjpeg: true })
    .toBuffer();
  fs.writeFileSync(filePath, optimizedJpgBuffer);

  totalWebpBytes += fullWebpBuffer.length;

  console.log(`✓ ${file}:`);
  console.log(`   -> Full WebP:   ${(fullWebpBuffer.length / 1024).toFixed(1)} KB`);
  console.log(`   -> Medium WebP: ${(mediumWebpBuffer.length / 1024).toFixed(1)} KB`);
  console.log(`   -> Thumb WebP:  ${(thumbWebpBuffer.length / 1024).toFixed(1)} KB`);
}

// Clean up any stray temp files
const strayTemps = fs.readdirSync(imagesDir).filter(f => f.startsWith('_temp_'));
strayTemps.forEach(t => fs.unlinkSync(path.join(imagesDir, t)));

console.log('\n=============================================');
console.log(`TOTAL BASE REDUCTION (JPG -> WebP Full): ${(totalOriginalBytes / (1024 * 1024)).toFixed(2)} MB -> ${(totalWebpBytes / (1024 * 1024)).toFixed(2)} MB`);
console.log(`Bandwidth Saved: -${(((totalOriginalBytes - totalWebpBytes) / totalOriginalBytes) * 100).toFixed(1)}%`);
console.log('Responsive assets generated: Full (1200w), Medium (800w), Thumb (400w)');
console.log('=============================================');
