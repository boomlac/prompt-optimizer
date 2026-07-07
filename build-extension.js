const esbuild = require('esbuild');
const fs = require('fs');
const path = require('path');

// Output folder
const outDir = 'extension-build';

// Clean output folder
if (fs.existsSync(outDir)) {
  fs.rmSync(outDir, { recursive: true });
}
fs.mkdirSync(outDir);

// Build extension TS files
esbuild.buildSync({
  entryPoints: [
    'src-extension/background.ts',
    'src-extension/content-script.ts'
  ],
  outdir: outDir,
  bundle: true,
  format: 'esm',
  target: 'es2020'
});

// Copy manifest.json
fs.copyFileSync('manifest.json', `${outDir}/manifest.json`);
fs.copyFileSync('dist/prompt-optimizer/background.js', `${outDir}/background.js`);
fs.copyFileSync('dist/prompt-optimizer/content-script.js', `${outDir}/content-script.js`);

// Copy Angular dist folder
copyRecursive('dist/extension-build', outDir);
copyRecursive('src-extension/icons', `${outDir}/icons`);



function copyRecursive(src, dest) {
  if (!fs.existsSync(dest)) fs.mkdirSync(dest);

  fs.readdirSync(src).forEach(item => {
    const srcPath = path.join(src, item);
    const destPath = path.join(dest, item);

    if (fs.lstatSync(srcPath).isDirectory()) {
      if (!fs.existsSync(destPath)) fs.mkdirSync(destPath);
      copyRecursive(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  });
}

console.log('✔ Extension build complete → extension-build/');
