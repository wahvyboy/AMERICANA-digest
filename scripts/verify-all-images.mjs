import fs from 'fs';
import path from 'path';

function findFiles(dir, ext) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      results = results.concat(findFiles(fullPath, ext));
    } else if (ext.some(e => file.endsWith(e))) {
      results.push(fullPath);
    }
  });
  return results;
}

const files = findFiles('src', ['.ts', '.tsx']);
const allImages = [];

files.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  // Match URLs and /images/ paths
  const matches = content.match(/['"`](\/images\/[^'"`\s]+|https?:\/\/[^'"`\s]+)['"`]/g) || [];
  matches.forEach(m => {
    const clean = m.slice(1, -1);
    if (
      clean.match(/\.(jpg|jpeg|png|webp|svg|gif)(\?.*)?$/i) ||
      clean.includes('images.unsplash.com') ||
      clean.includes('api.dicebear.com') ||
      clean.startsWith('/images/')
    ) {
      allImages.push({ file: f, url: clean });
    }
  });
});

console.log('=== COMPREHENSIVE IMAGE AUDIT ===');
console.log('Total image references found across src/:', allImages.length);

const urlMap = new Map();
allImages.forEach(({ file, url }) => {
  if (!urlMap.has(url)) {
    urlMap.set(url, []);
  }
  urlMap.get(url).push(file);
});

const duplicates = [];
for (const [url, fileList] of urlMap.entries()) {
  if (fileList.length > 1) {
    duplicates.push({ url, count: fileList.length, files: fileList });
  }
}

console.log(`Unique image URLs: ${urlMap.size}`);
console.log(`Duplicate image URLs: ${duplicates.length}`);

if (duplicates.length > 0) {
  console.log('\n--- DUPLICATES FOUND ---');
  duplicates.forEach((d, i) => {
    console.log(`${i + 1}. [${d.count}x] ${d.url}`);
    console.log(`   Files: ${d.files.join(', ')}`);
  });
} else {
  console.log('\nSUCCESS: ZERO DUPLICATE IMAGES DETECTED!');
}
