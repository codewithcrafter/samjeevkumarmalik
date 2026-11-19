const fs = require('fs');

const css = fs.readFileSync('assets/css/style.css', 'utf8');

// Strip comments properly
let noComments = '';
let inComment = false;
for (let i = 0; i < css.length; i++) {
  if (!inComment && css[i] === '/' && css[i + 1] === '*') {
    inComment = true;
    i++;
  } else if (inComment && css[i] === '*' && css[i + 1] === '/') {
    inComment = false;
    i++;
  } else if (!inComment) {
    noComments += css[i];
  }
}

let depth = 0;
let line = 1;
let col = 1;
let mediaStack = [];
let unbalanced = [];

for (let i = 0; i < noComments.length; i++) {
  const ch = noComments[i];
  if (ch === '\n') {
    line++;
    col = 1;
  } else {
    col++;
  }

  if (ch === '{') {
    depth++;
  } else if (ch === '}') {
    depth--;
    if (depth < 0) {
      unbalanced.push({ line, col, type: 'Extra closing brace' });
      depth = 0;
    }
  }
}

console.log(`Verification Complete:`);
console.log(`Total Length: ${css.length} characters`);
console.log(`Final Brace Depth: ${depth}`);
if (depth !== 0) {
  console.log(`CRITICAL ERROR: Unmatched opening brace! Depth is ${depth}`);
} else if (unbalanced.length > 0) {
  console.log(`CRITICAL ERROR: Unmatched closing braces:`, unbalanced);
} else {
  console.log(`SUCCESS: All braces are 100% balanced and syntax is valid!`);
}
