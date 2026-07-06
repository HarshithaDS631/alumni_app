const fs = require('fs');
const path = require('path');

const distDir = path.join(__dirname, 'dist');
const targetFile = path.join(distDir, 'vercel.json');

const config = {
  cleanUrls: true,
  rewrites: [
    {
      source: "/(.*)",
      destination: "/index.html"
    }
  ]
};

if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

fs.writeFileSync(targetFile, JSON.stringify(config, null, 2), 'utf8');
console.log('Successfully wrote vercel.json to dist/vercel.json');
