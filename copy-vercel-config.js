const fs = require('fs');
const path = require('path');

// 1. Write to dist/vercel.json (for static builders)
const distDir = path.join(__dirname, 'dist');
const distVercelFile = path.join(distDir, 'vercel.json');

const vercelJsonConfig = {
  cleanUrls: false,
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
fs.writeFileSync(distVercelFile, JSON.stringify(vercelJsonConfig, null, 2), 'utf8');
console.log('Successfully wrote vercel.json to dist/vercel.json');

// 2. Write to .vercel/output/config.json (for Build Output API / Zero Config Expo builders)
const vercelOutputDir = path.join(__dirname, '.vercel', 'output');
const configJsonFile = path.join(vercelOutputDir, 'config.json');

const buildOutputConfig = {
  version: 3,
  routes: [
    { handle: "filesystem" },
    { src: "/(.*)", dest: "/index.html" }
  ]
};

if (!fs.existsSync(vercelOutputDir)) {
  fs.mkdirSync(vercelOutputDir, { recursive: true });
}
fs.writeFileSync(configJsonFile, JSON.stringify(buildOutputConfig, null, 2), 'utf8');
console.log('Successfully wrote config.json to .vercel/output/config.json');
