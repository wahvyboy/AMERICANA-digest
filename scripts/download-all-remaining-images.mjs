import fs from 'fs';
import path from 'path';

const downloads = [
  {
    name: 'us-capitol.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/2/27/Capitol_Building_Full_View.jpg',
    headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36' }
  },
  {
    name: 'chick-fil-a.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/3/3a/Chick-fil-A_Corporate_HQ_-_Entrance.JPG',
    headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36' }
  },
  {
    name: 'abdul-el-sayed.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/6/65/Abdul_El-Sayed_meet-and-greet_by_Conlan_Houston_10.jpg',
    headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36' }
  },
  {
    name: 'machine-gun-kelly.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/d/db/Machine_Gun_Kelly_%28rapper%29_03.jpg',
    headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36' }
  },
  {
    name: 'intimacy-counseling.jpg',
    url: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=1200&q=80',
    headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36' }
  },
  {
    name: 'couple-laughter.jpg',
    url: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80',
    headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36' }
  },
  {
    name: 'family-digital.jpg',
    url: 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=1200&q=80',
    headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36' }
  },
  {
    name: 'pain-relief-gel.jpg',
    url: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=1200&q=80',
    headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36' }
  },
  {
    name: 'skincare-serum.jpg',
    url: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1200&q=80',
    headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36' }
  },
  {
    name: 'eyebrow-peptide.jpg',
    url: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=1200&q=80',
    headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36' }
  },
  {
    name: 'pill-reminder.jpg',
    url: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=1200&q=80',
    headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36' }
  }
];

async function run() {
  for (const item of downloads) {
    try {
      console.log(`Downloading ${item.name}...`);
      const res = await fetch(item.url, { headers: item.headers });
      if (!res.ok) {
        throw new Error(`HTTP ${res.status} ${res.statusText}`);
      }
      const buffer = Buffer.from(await res.arrayBuffer());
      fs.writeFileSync(path.join('public', 'images', item.name), buffer);
      console.log(`Successfully saved ${item.name} (${buffer.length} bytes)`);
    } catch (err) {
      console.error(`Failed ${item.name}:`, err.message);
    }
  }
}

run();
