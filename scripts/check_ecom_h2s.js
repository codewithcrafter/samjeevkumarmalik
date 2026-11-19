const fs = require('fs');
const content = fs.readFileSync('services/ecommerce-website-development.html', 'utf-8');

// Find all h2s and their surrounding container classes
const h2Matches = [...content.matchAll(/<h2[^>]*>([\s\S]*?)<\/h2>/gi)];
h2Matches.forEach((m, i) => {
  const index = m.index;
  const snippetBefore = content.slice(Math.max(0, index - 300), index);
  console.log(`\nH2 [${i+1}]: ${m[1].replace(/<[^>]+>/g, '').trim()}`);
  // Find closest previous tag or class
  const classMatch = snippetBefore.match(/class=["']([^"']+)["'][^>]*$/) || snippetBefore.match(/<([a-z0-9-]+)[^>]*class=["']([^"']+)["']/i);
  console.log('Context before:', classMatch ? classMatch[0] : snippetBefore.slice(-100));
});

