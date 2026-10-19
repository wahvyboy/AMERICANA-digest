import fs from 'fs';

const content = fs.readFileSync('src/data/curatedArticles.ts', 'utf8');

// Check imageUrls
const imgUrls = [];
const imgRegex = /imageUrl:\s*['"]([^'"]+)['"]/g;
let m;
while ((m = imgRegex.exec(content)) !== null) { imgUrls.push(m[1]); }

const imgCounts = {};
imgUrls.forEach(u => imgCounts[u] = (imgCounts[u] || 0) + 1);

// Check avatars
const avUrls = [];
const avRegex = /avatar:\s*['"]([^'"]+)['"]/g;
while ((m = avRegex.exec(content)) !== null) { avUrls.push(m[1]); }

const avCounts = {};
avUrls.forEach(u => avCounts[u] = (avCounts[u] || 0) + 1);

console.log('=== IMAGE UNIQUENESS AUDIT ===');
console.log('Total articles:', imgUrls.length);
console.log('Unique imageUrls:', Object.keys(imgCounts).length);
const dupImages = Object.entries(imgCounts).filter(([u, c]) => c > 1);
console.log('Duplicate imageUrls count:', dupImages.length);
if (dupImages.length) console.log('Duplicates:', dupImages);

console.log('Total avatars:', avUrls.length);
console.log('Unique avatars:', Object.keys(avCounts).length);
const dupAvatars = Object.entries(avCounts).filter(([u, c]) => c > 1);
console.log('Duplicate avatars count:', dupAvatars.length);
if (dupAvatars.length) console.log('Duplicates:', dupAvatars);

// Check SplashHero
const heroContent = fs.readFileSync('src/components/SplashHero.tsx', 'utf8');
const heroImgs = [...heroContent.matchAll(/src=['"]([^'"]+)['"]/g)].map(x => x[1]);
console.log('SplashHero images:', heroImgs);
const heroOverlap = heroImgs.filter(h => imgUrls.includes(h));
console.log('Hero overlap with articles count:', heroOverlap.length);
if (heroOverlap.length) console.log('Overlaps:', heroOverlap);
