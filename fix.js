const fs = require('fs');
const path = require('path');

const cssPath = 'd:/cade/jiza/hard_verst/src/index.css';
let cssContent = fs.readFileSync(cssPath, 'utf8');

if (!cssContent.includes('.page-container')) {
  cssContent += `
.page-container {
  width: 100%;
  max-width: 1920px;
  margin: 0 auto;
  position: relative;
}
.nav-container {
  width: 100%;
  max-width: 1920px;
}
`;
  fs.writeFileSync(cssPath, cssContent);
}

const files = [
  'd:/cade/jiza/hard_verst/src/components/Catalog.tsx',
  'd:/cade/jiza/hard_verst/src/components/Topics.tsx',
  'd:/cade/jiza/hard_verst/src/components/HowItWorks.tsx',
  'd:/cade/jiza/hard_verst/src/components/Reviews.tsx',
  'd:/cade/jiza/hard_verst/src/components/Designer.tsx',
  'd:/cade/jiza/hard_verst/src/components/Navbar.tsx',
  'd:/cade/jiza/hard_verst/src/components/Footer.tsx',
  'd:/cade/jiza/hard_verst/src/components/Hero.tsx',
  'd:/cade/jiza/hard_verst/src/pages/DesignerServicePage.tsx',
];

files.forEach(fp => {
  if (!fs.existsSync(fp)) {
    console.log('Skipping missing file:', fp);
    return;
  }
  let content = fs.readFileSync(fp, 'utf8');
  let original = content;

  // Replace max-w-[1440px] logic with classes
  // General wrappers
  content = content.replace(/style=\{\{\s*maxWidth:\s*'1440px',\s*margin:\s*'0 auto'\s*\}\}\s*className="([^"]+)"/g, 'className="$1 page-container"');
  
  // Specific wrapper for Reviews which has padding in style
  content = content.replace(/className="([^"]+)"\n\s*style=\{\{\s*maxWidth:\s*'1440px',\s*margin:\s*'0 auto',\s*(padding:[^}]+)\s*\}\}/g, 'className="$1 page-container"\n        style={{ $2 }}');

  // Specific wrapper for DesignerServicePage
  content = content.replace(/style=\{\{\s*maxWidth:\s*'1440px',\s*margin:\s*'0 auto'\s*\}\}\n\s*className="w-full"/g, 'className="w-full page-container"');

  // Navbar specifics
  content = content.replace(/w-full z-20 (.*?)`\} style=\{\{\s*maxWidth:\s*'1440px'\s*\}\}/g, 'w-full z-20 nav-container $1`}');
  
  // Extra specific for Navbar (just in case)
  content = content.replace(/style=\{\{\s*maxWidth:\s*'1440px'\s*\}\}/g, '');

  // Recalculate clamps
  content = content.replace(/clamp\(([-0-9.px]+),\s*([-0-9.]+)vw,\s*([-0-9.px]+)\)/g, match => {
    const m = match.match(/clamp\(([-0-9.px]+),\s*([-0-9.]+)vw,\s*([-0-9.px]+)\)/);
    if (!m) return match;
    const min = m[1];
    const vw = parseFloat(m[2]);
    const newMax = Math.round(vw * 19.2);
    return `clamp(${min}, ${vw}vw, ${newMax}px)`;
  });

  // specific for Hero height
  content = content.replace(/clamp\(500px, 100svh, 1000px\)/g, 'clamp(500px, 100svh, 1080px)');

  if (content !== original) {
    fs.writeFileSync(fp, content);
    console.log('Fixed', fp);
  }
});
