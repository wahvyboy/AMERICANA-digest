import fs from 'fs';

const filePath = 'src/data/curatedArticles.ts';
let content = fs.readFileSync(filePath, 'utf8');

// Replace imageUrl: '/images/NAME.jpg' with '/images/NAME.webp'
const updated = content.replace(/imageUrl:\s*'\/images\/([a-zA-Z0-9_-]+)\.jpg'/g, "imageUrl: '/images/$1.webp'");

fs.writeFileSync(filePath, updated);
console.log('Successfully updated curatedArticles.ts to reference .webp images!');
