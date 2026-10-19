import fs from 'fs';

async function searchWikimedia(query) {
  const url = `https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrsearch=${encodeURIComponent(query)}&gsrnamespace=6&gsrlimit=3&prop=imageinfo&iiprop=url|mime|size&format=json`;
  const res = await fetch(url, {
    headers: { 'User-Agent': 'AmericanaDigest/1.0 (editor@americanadigest.blog)' }
  });
  const data = await res.json();
  if (!data.query || !data.query.pages) return [];
  return Object.values(data.query.pages)
    .filter(p => p.imageinfo && p.imageinfo[0] && (p.imageinfo[0].mime === 'image/jpeg' || p.imageinfo[0].mime === 'image/png'))
    .map(p => ({
      title: p.title,
      url: p.imageinfo[0].url,
      size: p.imageinfo[0].size
    }));
}

async function run() {
  const queries = [
    'psychotherapy session',
    'laughing couple smartphone',
    'grandparents children tablet computer',
    'physical therapy knee massage',
    'dropper bottle cosmetic serum',
    'eyebrow makeup brush',
    'pill organizer medication dispenser'
  ];
  for (const q of queries) {
    console.log(`\n=== Query: ${q} ===`);
    const results = await searchWikimedia(q);
    results.forEach(r => console.log(`- ${r.title}\n  ${r.url}`));
  }
}

run();
