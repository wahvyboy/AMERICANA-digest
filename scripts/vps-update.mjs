import { Client } from 'ssh2';

const conn = new Client();

console.log('Connecting to VPS 147.90.182.115 to pull and rebuild...');

conn.on('ready', () => {
  console.log('>>> SSH connection established! Triggering git pull and build on live VPS...');

  const cmd = `
    set -e
    cd /var/www/americanadigest.blog
    echo ">>> Fetching latest commits from GitHub..."
    git fetch origin main
    git reset --hard origin/main
    
    echo ">>> Building optimized production client..."
    npm install --legacy-peer-deps --prefer-offline --no-audit
    npm run build
    
    echo ">>> Reloading Nginx..."
    systemctl reload nginx
    echo ">>> VPS UPDATE COMPLETE!"
  `;

  conn.exec(cmd, (err, stream) => {
    if (err) {
      console.error('Exec error:', err);
      conn.end();
      return;
    }

    stream.on('close', (code) => {
      console.log(`\nRemote update finished with exit code: ${code}`);
      conn.end();
    });

    stream.on('data', (d) => process.stdout.write(d.toString()));
    stream.stderr.on('data', (d) => process.stderr.write(d.toString()));
  });
});

conn.on('error', (err) => {
  console.error('SSH Error:', err.message);
});

conn.connect({
  host: '147.90.182.115',
  port: 22,
  username: 'root',
  password: 'FF16MhoVDUIJ',
  readyTimeout: 30000
});
