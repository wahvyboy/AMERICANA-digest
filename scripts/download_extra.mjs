import fs from 'fs';

async function main() {
  const items = [
    { url: 'https://upload.wikimedia.org/wikipedia/commons/6/60/TerreHauteUSP.jpg', dest: 'public/images/federal-execution-facility.jpg' },
    { url: 'https://upload.wikimedia.org/wikipedia/commons/0/02/Robert_F._Kennedy_Department_of_Justice_Building.jpg', dest: 'public/images/doj-building.jpg' }
  ];
  for (const item of items) {
    try {
      const res = await fetch(item.url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          'Referer': 'https://en.wikipedia.org/'
        }
      });
      const buf = Buffer.from(await res.arrayBuffer());
      fs.writeFileSync(item.dest, buf);
      console.log('Saved ' + item.dest + ' (' + buf.length + ' bytes)');
    } catch (e) {
      console.error('Error for ' + item.dest, e);
    }
  }
}
main();
