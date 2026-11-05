import fs from 'fs';
import { CURATED_ARTICLES as existingArticles } from './_temp_curated.mjs';
import { leadArticle } from './lead-article-data.mjs';
import { NEW_ARTICLES as politicsArticles } from './new-articles-politics.mjs';
import { LATEST_NEWS_ARTICLES as latestArticles } from './new-articles-latest.mjs';
import { BUSINESS_TECH_ARTICLES as techArticles } from './new-articles-tech.mjs';
import { LIFE_SHOPPING_ARTICLES as lifeShoppingArticles } from './new-articles-life-shopping.mjs';

// The remaining 31 articles from the original dataset (skipping old lead article index 0)
const remainingExisting = existingArticles.slice(1);

console.log(`Original existing articles retained: ${remainingExisting.length}`);
console.log(`Lead article: 1`);
console.log(`New Politics articles: ${politicsArticles.length}`);
console.log(`New Latest News articles: ${latestArticles.length}`);
console.log(`New Tech articles: ${techArticles.length}`);
console.log(`New Life & Shopping articles: ${lifeShoppingArticles.length}`);

// Combine in optimal editorial order:
// 1. Lead Article (Behind the Spotlight)
// 2. High-impact breaking politics & latest news from today (Nov 5, 2026)
// 3. Tech & Business breakthroughs
// 4. Existing key investigation articles
// 5. Life & Wellness articles
// 6. Shopping & Consumer intelligence guides
const fullDataset = [
  leadArticle,
  ...politicsArticles,
  ...latestArticles,
  ...techArticles,
  ...lifeShoppingArticles,
  ...remainingExisting
];

console.log(`\n========================================`);
console.log(`TOTAL ARTICLES IN ASSEMBLED DATASET: ${fullDataset.length}`);
console.log(`========================================\n`);

// 1. Audit IDs
const idCounts = {};
fullDataset.forEach(a => {
  idCounts[a.id] = (idCounts[a.id] || 0) + 1;
});
const dupIds = Object.entries(idCounts).filter(([k, v]) => v > 1);
if (dupIds.length > 0) {
  console.error('ERROR: Duplicate IDs found:', dupIds);
  process.exit(1);
} else {
  console.log('✓ All Article IDs are 100% unique.');
}

// 2. Audit Titles
const titleCounts = {};
fullDataset.forEach(a => {
  titleCounts[a.title] = (titleCounts[a.title] || 0) + 1;
});
const dupTitles = Object.entries(titleCounts).filter(([k, v]) => v > 1);
if (dupTitles.length > 0) {
  console.error('ERROR: Duplicate Titles found:', dupTitles);
  process.exit(1);
} else {
  console.log('✓ All Article Titles are 100% unique.');
}

// 3. Audit Image URLs
const imageCounts = {};
fullDataset.forEach(a => {
  imageCounts[a.imageUrl] = (imageCounts[a.imageUrl] || 0) + 1;
});
const dupImages = Object.entries(imageCounts).filter(([k, v]) => v > 1);
if (dupImages.length > 0) {
  console.error('ERROR: Duplicate Image URLs found:', dupImages);
  dupImages.forEach(([url, count]) => {
    console.error(`  - [${count}x]: ${url}`);
    const matches = fullDataset.filter(a => a.imageUrl === url).map(a => a.id);
    console.error(`    In articles: ${matches.join(', ')}`);
  });
  process.exit(1);
} else {
  console.log('✓ SUCCESS: Every single article has a completely UNIQUE image URL (0 duplicates)!');
}

// Format into TypeScript source code for src/data/curatedArticles.ts
const tsOutput = `import { Article } from '../types';

export const CURATED_ARTICLES: Article[] = ${JSON.stringify(fullDataset, null, 2)};
`;

fs.writeFileSync('src/data/curatedArticles.ts', tsOutput, 'utf8');
console.log(`\n✓ Successfully wrote ${fullDataset.length} curated articles to src/data/curatedArticles.ts!`);

// Clean up temp file
if (fs.existsSync('scripts/_temp_curated.mjs')) {
  fs.unlinkSync('scripts/_temp_curated.mjs');
}

