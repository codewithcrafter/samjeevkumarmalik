const fs = require('fs');
const html = fs.readFileSync('services/landing-page-design-development.html', 'utf-8');
const mat = html.match(/Funnel Performance Matrix/i);
console.log('mat found:', !!mat);
if (mat) {
  console.log(html.slice(mat.index - 50, mat.index + 500));
}

