import fs from 'fs';

const content = fs.readFileSync('src/data/curatedArticles.ts', 'utf8');

// Match each article block
const blocks = content.split(/\{\s*id:\s*'/).slice(1);

console.log('Total blocks:', blocks.length);

const list = blocks.map((b, idx) => {
  const idMatch = b.match(/^([^']+)'/);
  const titleMatch = b.match(/title:\s*'([^']+)'/);
  const catMatch = b.match(/category:\s*'([^']+)'/);
  const imgMatch = b.match(/imageUrl:\s*'([^']+)'/);
  const authorMatch = b.match(/name:\s*'([^']+)'/);
  const avatarMatch = b.match(/avatar:\s*'([^']+)'/);
  return {
    index: idx + 1,
    id: idMatch ? idMatch[1] : 'unknown',
    title: titleMatch ? titleMatch[1] : 'unknown',
    category: catMatch ? catMatch[1] : 'unknown',
    imageUrl: imgMatch ? imgMatch[1] : 'unknown',
    author: authorMatch ? authorMatch[1] : 'unknown',
    avatar: avatarMatch ? avatarMatch[1] : 'unknown'
  };
});

list.forEach(item => {
  console.log(`${item.index}. [${item.id}] [${item.category}]`);
  console.log(`   Title: ${item.title}`);
  console.log(`   Image: ${item.imageUrl}`);
  console.log(`   Author: ${item.author} (${item.avatar})`);
  console.log('---');
});
