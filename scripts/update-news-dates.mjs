import fs from 'fs';

let content = fs.readFileSync('src/data/curatedArticles.ts', 'utf8');

const staggeredDates = [
  '2026-10-27T15:30:00Z', // Art 1 (Lead Jack Whigham)
  '2026-10-27T14:45:00Z', // Art 2 (Trump Overtime)
  '2026-10-27T14:10:00Z', // Art 3 (Hegseth Army Event)
  '2026-10-27T13:45:00Z', // Art 4 (Thom Tillis)
  '2026-10-27T13:15:00Z', // Art 5 (Midterm $10B)
  '2026-10-27T12:30:00Z', // Art 6 (Ohio Oops Trump)
  '2026-10-27T11:50:00Z', // Art 7 (Midterm Dem warning)
  '2026-10-27T11:15:00Z', // Art 8 (SCOTUS ad dispute)
  '2026-10-27T10:45:00Z', // Art 9 (Chick-fil-A CEO)
  '2026-10-27T10:10:00Z', // Art 10 (DOJ American Bar)
  '2026-10-27T09:30:00Z', // Art 11 (El-Sayed)
  '2026-10-27T08:50:00Z', // Art 12 (James Carville)
  '2026-10-27T08:15:00Z', // Art 13 (Televised Execution)
  '2026-10-27T07:45:00Z', // Art 14 (Megyn Kelly)
  '2026-10-27T07:15:00Z', // Art 15 (Scott Jennings)
  '2026-10-27T06:30:00Z', // Art 16 (Jen Psaki)
  '2026-10-27T05:45:00Z', // Art 17 (Mike Johnson Ilhan Omar)
  '2026-10-27T04:20:00Z', // Art 18 (Body Language)
  '2026-10-26T22:15:00Z', // Art 19 (Life: Intimacy questions)
  '2026-10-26T20:30:00Z', // Art 20 (Life: Funniest tweets)
  '2026-10-26T18:45:00Z', // Art 21 (Tech: USB)
  '2026-10-26T16:10:00Z', // Art 22 (Life: Grandparents boundary)
  '2026-10-26T14:20:00Z', // Art 23 (Life: MGK Megan Fox)
  '2026-10-26T12:00:00Z', // Art 24 (Life: Social Security)
  '2026-10-26T10:30:00Z', // Art 25 (Shopping: Pain relief gel)
  '2026-10-26T08:15:00Z', // Art 26 (Shopping: Water flosser)
  '2026-10-25T19:00:00Z', // Art 27 (Shopping: GLP-1 relief)
  '2026-10-25T16:45:00Z', // Art 28 (Shopping: Cushy sneakers)
  '2026-10-25T14:30:00Z', // Art 29 (Shopping: K-beauty serum)
  '2026-10-25T11:15:00Z', // Art 30 (Shopping: Sparse brows)
  '2026-10-25T09:00:00Z', // Art 31 (Shopping: Coffee machines)
  '2026-10-24T15:00:00Z'  // Art 32 (Shopping: Pill reminder)
];

function calcTimeAgo(dateStr) {
  const diffInSec = Math.floor((Date.now() - new Date(dateStr).getTime()) / 1000);
  if (diffInSec < 60) return 'Just now';
  const mins = Math.floor(diffInSec / 60);
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days === 1) return 'Yesterday';
  if (days < 7) return `${days}d ago`;
  return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

let idx = 0;
content = content.replace(/publishedAt:\s*'([^']+)'/g, (match, oldDate) => {
  if (idx < staggeredDates.length) {
    const newDate = staggeredDates[idx];
    idx++;
    return `publishedAt: '${newDate}'`;
  }
  return match;
});

// Also update timeAgo values accordingly
let timeAgoIdx = 0;
content = content.replace(/timeAgo:\s*'([^']+)'/g, (match, oldTimeAgo) => {
  if (timeAgoIdx < staggeredDates.length) {
    const newTimeAgo = calcTimeAgo(staggeredDates[timeAgoIdx]);
    timeAgoIdx++;
    return `timeAgo: '${newTimeAgo}'`;
  }
  return match;
});

fs.writeFileSync('src/data/curatedArticles.ts', content, 'utf8');
console.log(`Updated ${idx} dates and ${timeAgoIdx} timeAgo strings across all articles!`);
