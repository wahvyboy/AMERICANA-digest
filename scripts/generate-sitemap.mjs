import fs from 'fs';
import path from 'path';

// Extract all articles
const dataFile = fs.readFileSync('src/data/curatedArticles.ts', 'utf8');
const idMatches = [...dataFile.matchAll(/id:\s*'([^']+)'/g)].map(m => m[1]);

const baseUrl = 'https://americanadigest.blog';
const today = new Date().toISOString().split('T')[0];

const staticRoutes = [
  { loc: '/', changefreq: 'hourly', priority: '1.0' },
  { loc: '/politics', changefreq: 'daily', priority: '0.9' },
  { loc: '/latest-news', changefreq: 'daily', priority: '0.9' },
  { loc: '/life', changefreq: 'daily', priority: '0.8' },
  { loc: '/shopping', changefreq: 'daily', priority: '0.8' },
  { loc: '/business-tech', changefreq: 'daily', priority: '0.8' }
];

let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n`;

// Static category sections
staticRoutes.forEach(r => {
  xml += `  <url>\n    <loc>${baseUrl}${r.loc}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>${r.changefreq}</changefreq>\n    <priority>${r.priority}</priority>\n  </url>\n`;
});

// News article URLs for crawlers
idMatches.forEach(id => {
  xml += `  <url>\n    <loc>${baseUrl}/news/${id}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>daily</changefreq>\n    <priority>0.85</priority>\n  </url>\n`;
});

xml += `</urlset>\n`;

fs.writeFileSync('public/sitemap.xml', xml, 'utf8');
console.log(`Generated public/sitemap.xml with ${staticRoutes.length + idMatches.length} URLs.`);
