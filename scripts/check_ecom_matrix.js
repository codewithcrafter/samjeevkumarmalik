const fs = require('fs');
const html = fs.readFileSync('services/ecommerce-website-development.html', 'utf-8');
const tableIndex = html.indexOf('<table');
if (tableIndex !== -1) {
  console.log(html.slice(tableIndex, tableIndex + 2500));
} else {
  console.log('No <table> found, looking for matrix');
  const matIndex = html.indexOf('capabilities-matrix-grid');
  console.log(html.slice(matIndex - 200, matIndex + 1500));
}

