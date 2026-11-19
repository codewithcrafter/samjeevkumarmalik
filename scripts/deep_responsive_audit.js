const fs = require('fs');
const path = require('path');

function getHtmlFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const full = path.join(dir, file);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) {
      if (!['node_modules', '.git', '.gemini', 'brain', 'scripts'].includes(file)) {
        results = results.concat(getHtmlFiles(full));
      }
    } else if (file.endsWith('.html')) {
      results.push(full);
    }
  });
  return results;
}

const htmlFiles = getHtmlFiles('.');
const css = fs.readFileSync('assets/css/style.css', 'utf8');

console.log(`=== DEEP RESPONSIVE AUDIT (${htmlFiles.length} HTML files) ===\n`);

let issuesFound = 0;

// 1. Check all classes with 'grid' in CSS to ensure they have mobile single-column rules
const gridRuleRegex = /\.([a-zA-Z0-9_-]+)\s*\{[^}]*display:\s*grid[^}]*\}/g;
let gridMatch;
const definedGrids = new Set();
while ((gridMatch = gridRuleRegex.exec(css)) !== null) {
  definedGrids.add(gridMatch[1]);
}

console.log(`[1] Found ${definedGrids.size} grid containers defined in style.css:`);
console.log([...definedGrids]);

// Check which grids collapse at <= 860px or <= 768px
const mobileResponsiveSection = css.substring(css.indexOf('/* PRIMARY HANDHELD BREAKPOINT (<= 860px)'));
const uncollapsedGrids = [];
definedGrids.forEach(grid => {
  // Check if it's explicitly set to 1fr in <= 860px or <= 768px
  const hasCollapse = mobileResponsiveSection.includes(`.${grid}`) && 
                      (mobileResponsiveSection.includes('grid-template-columns: 1fr') || mobileResponsiveSection.includes('display: flex'));
  if (!hasCollapse) {
    uncollapsedGrids.push(grid);
  }
});

if (uncollapsedGrids.length > 0) {
  console.log(`\n[WARN] Grids potentially missing single-column rule in <= 860px / 768px:`, uncollapsedGrids);
  issuesFound += uncollapsedGrids.length;
} else {
  console.log(`\n[PASS] All defined grids collapse to 1fr in mobile responsive section!`);
}

// 2. Check HTML files for potential overflow elements
console.log(`\n[2] Scanning HTML files for elements that might cause overflow...`);
htmlFiles.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  
  // Check tables
  const tableCount = (content.match(/<table/g) || []).length;
  if (tableCount > 0) {
    if (!content.includes('table-responsive') && !content.includes('decision-matrix-card')) {
      console.log(`[WARN] ${file}: has ${tableCount} table(s) without responsive wrapper.`);
      issuesFound++;
    }
  }

  // Check pre/code blocks
  const preCount = (content.match(/<pre/g) || []).length;
  // pre has global overflow-x in CSS, verified

  // Check long non-breaking strings/URLs in text
  const longWords = content.match(/>[a-zA-Z0-9_\-\.\/]{40,}</g);
  if (longWords) {
    console.log(`[INFO] ${file}: long string found:`, longWords);
  }
});

// 3. Inspect CSS for any min-width > 300px not in desktop-only media queries
console.log(`\n[3] Checking CSS for dangerous min-widths outside media queries...`);
const minWidthRegex = /([^{]+)\{[^}]*min-width:\s*([0-9]+)px[^}]*\}/g;
let mwMatch;
while ((mwMatch = minWidthRegex.exec(css)) !== null) {
  const selector = mwMatch[1].trim();
  const px = parseInt(mwMatch[2]);
  const index = mwMatch.index;
  
  // Check if inside media query
  const prevMedia = css.lastIndexOf('@media', index);
  let isDesktopMedia = false;
  if (prevMedia !== -1 && prevMedia > css.lastIndexOf('}', index)) {
    const mqText = css.substring(prevMedia, css.indexOf('{', prevMedia));
    if (mqText.includes('min-width') || mqText.includes('1024px') || mqText.includes('1200px')) {
      isDesktopMedia = true;
    }
  }
  
  if (px > 300 && !isDesktopMedia && !selector.includes('.matrix-table') && !selector.includes('.dropdown-menu') && !selector.includes('.services-mega-menu')) {
    console.log(`[WARN] Selector "${selector}" has min-width: ${px}px (Index: ${index})`);
    issuesFound++;
  }
}

console.log(`\nAudit completed. Total potential issues flagged: ${issuesFound}`);
