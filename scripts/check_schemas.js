const fs = require('fs');
const path = require('path');

function getHtmlFiles(dir) {
  let results = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    if (entry.name === 'node_modules' || entry.name === '.git' || entry.name.startsWith('.system_generated')) continue;
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results = results.concat(getHtmlFiles(fullPath));
    } else if (entry.name.endsWith('.html')) {
      results.push(fullPath);
    }
  }
  return results;
}

const files = getHtmlFiles('.');
console.log('Total HTML files:', files.length);

files.forEach(f => {
  const content = fs.readFileSync(f, 'utf-8');
  const schemas = [...content.matchAll(/<script type=["']application\/ld\+json["']>([\s\S]*?)<\/script>/gi)];
  if (schemas.length === 0) {
    console.log(f + ': NO SCHEMA');
  } else {
    // print schema @type
    const types = schemas.map(s => {
      try {
        const obj = JSON.parse(s[1]);
        if (obj['@graph']) {
          return obj['@graph'].map(g => g['@type']).join(', ');
        }
        return obj['@type'] || 'unknown';
      } catch (e) {
        return 'invalid JSON';
      }
    });
    console.log(f + ': ' + schemas.length + ' schema(s) -> ' + types.join(' | '));
  }
});

