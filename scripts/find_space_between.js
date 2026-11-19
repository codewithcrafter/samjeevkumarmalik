const fs = require('fs');

const css = fs.readFileSync('assets/css/style.css', 'utf8');

const regex = /([^{]+)\{[^}]*justify-content:\s*space-between[^}]*\}/g;
let m;
while ((m = regex.exec(css)) !== null) {
  const sel = m[1].trim();
  const rule = m[0];
  const hasWrap = rule.includes('flex-wrap: wrap') || rule.includes('flex-wrap:wrap');
  console.log(`Selector: "${sel.replace(/\n/g, ' ')}" -> flex-wrap: ${hasWrap ? 'YES' : 'NO'}`);
}
