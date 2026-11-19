const fs = require('fs');
const path = require('path');

function getHtmlFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const full = path.join(dir, file);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) {
      if (!['node_modules', '.git', '.gemini', 'brain'].includes(file)) {
        results = results.concat(getHtmlFiles(full));
      }
    } else if (file.endsWith('.html') && !full.includes('scripts')) {
      results.push(full);
    }
  });
  return results;
}

const htmlFiles = getHtmlFiles('.');
console.log(`Auditing ${htmlFiles.length} HTML files...`);

const allGridClasses = new Set();
const allFlexClasses = new Set();
const potentialOverflowElements = [];

htmlFiles.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  
  // Find classes with grid
  const classMatches = content.match(/class="([^"]+)"/g) || [];
  classMatches.forEach(cm => {
    const val = cm.replace(/class="|"/g, '');
    val.split(/\s+/).forEach(c => {
      if (c.includes('grid')) allGridClasses.add(c);
      if (c.includes('row') || c.includes('strip') || c.includes('banner') || c.includes('list')) allFlexClasses.add(c);
    });
  });

  // Check for inline widths > 300px
  const inlineWidthMatches = content.match(/style="[^"]*width:\s*([0-9]+)px[^"]*"/g) || [];
  if (inlineWidthMatches.length > 0) {
    potentialOverflowElements.push({ file, matches: inlineWidthMatches });
  }

  // Check for tables without table-responsive wrapper
  const tableMatches = content.match(/<table/g) || [];
  if (tableMatches.length > 0) {
    // Check if table is wrapped in a container that has overflow-x
    if (!content.includes('table-responsive') && !content.includes('decision-matrix-card') && !content.includes('matrix-table-wrap')) {
      console.log(`[WARN] File ${file} has <table> but might be missing responsive wrapper.`);
    }
  }
});

console.log('--- Unique Grid Classes ---');
console.log([...allGridClasses].sort());

console.log('--- Sample Row/Strip/Banner Classes ---');
console.log([...allFlexClasses].sort().slice(0, 30));

if (potentialOverflowElements.length > 0) {
  console.log('--- Potential Inline Width Overflows ---');
  console.log(JSON.stringify(potentialOverflowElements, null, 2));
} else {
  console.log('No dangerous inline fixed pixel widths found in HTML files.');
}

