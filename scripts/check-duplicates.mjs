import fs from 'fs';

const content = fs.readFileSync('src/data/curatedArticles.ts', 'utf8');
const imgMatches = [...content.matchAll(/imageUrl:\s*['"]([^'"]+)['"]/g)].map(m => m[1]);
const titleMatches = [...content.matchAll(/title:\s*['"]([^'"]+)['"]/g)].map(m => m[1]);

console.log('Total images:', imgMatches.length);
const imgCounts = {};
imgMatches.forEach(img => { imgCounts[img] = (imgCounts[img] || 0) + 1; });
const dupImgs = Object.entries(imgCounts).filter(([k, v]) => v > 1);
console.log('Duplicate images count:', dupImgs.length);
dupImgs.forEach(([k, v]) => console.log('Duplicate img:', k, v));

console.log('Total titles:', titleMatches.length);
const titleCounts = {};
titleMatches.forEach(t => { titleCounts[t] = (titleCounts[t] || 0) + 1; });
const dupTitles = Object.entries(titleCounts).filter(([k, v]) => v > 1);
console.log('Duplicate titles count:', dupTitles.length);
dupTitles.forEach(([k, v]) => console.log('Duplicate title:', k, v));
