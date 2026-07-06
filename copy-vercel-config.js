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

// 3. Copy dist contents to the root directory to handle cases where Vercel serves from the root directory '.'
console.log('Copying build output from dist/ to project root for deployment...');
try {
  if (fs.existsSync(distDir)) {
    const files = fs.readdirSync(distDir);
    for (const file of files) {
      const srcPath = path.join(distDir, file);
      const destPath = path.join(__dirname, file);
      
      // Avoid copying vercel.json if it conflicts, but copying it is fine.
      if (fs.statSync(srcPath).isDirectory()) {
        fs.cpSync(srcPath, destPath, { recursive: true, force: true });
      } else {
        fs.copyFileSync(srcPath, destPath);
      }
      console.log(`Copied ${file} to root.`);
    }
    console.log('Successfully copied all dist files to root.');
  } else {
    console.error('Error: dist directory does not exist!');
  }
} catch (error) {
  console.error('Error copying files:', error);
}
