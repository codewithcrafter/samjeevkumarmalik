const fs = require('fs');

const css = fs.readFileSync('assets/css/style.css', 'utf8');

// Parse media queries
let regex = /@media[^{]+\{/g;
let match;
const mediaQueries = [];

while ((match = regex.exec(css)) !== null) {
  const queryStr = match[0].trim();
  const startIdx = match.index;
  const openBrace = startIdx + match[0].length - 1;
  
  // Find matching closing brace
  let depth = 1;
  let endIdx = openBrace + 1;
  while (depth > 0 && endIdx < css.length) {
    if (css[endIdx] === '{') depth++;
    else if (css[endIdx] === '}') depth--;
    endIdx++;
  }
  
  const body = css.substring(openBrace + 1, endIdx - 1);
  mediaQueries.push({
    query: queryStr,
    start: startIdx,
    end: endIdx,
    bodyLength: body.length,
    selectors: [...new Set([...body.matchAll(/([.#a-zA-Z0-9_ -]+)\s*\{/g)].map(m => m[1].trim()))]
  });
}

console.log(`Found ${mediaQueries.length} media queries:`);
mediaQueries.forEach((mq, i) => {
  console.log(`\n[${i + 1}] ${mq.query} (length: ${mq.bodyLength})`);
  console.log(`Selectors (${mq.selectors.length}):`, mq.selectors.slice(0, 10).join(', ') + (mq.selectors.length > 10 ? '...' : ''));
});

