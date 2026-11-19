const fs = require('fs');
const html = fs.readFileSync('services/wordpress-web-development.html', 'utf-8');
const mb = html.match(/id="wpMockupCard"/i);
if (mb) {
  console.log(html.slice(mb.index, mb.index + 1200));
}

