const fs = require('fs');
if (fs.existsSync('scripts/section_banner.html')) {
  console.log(fs.readFileSync('scripts/section_banner.html', 'utf-8'));
} else {
  console.log('No section_banner.html found');
}

