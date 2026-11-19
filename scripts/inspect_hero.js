const fs = require('fs');

const heroOld = fs.readFileSync('scripts/section_hero.html', 'utf-8');
const heroCur = fs.readFileSync('index.html', 'utf-8').match(/<section[^>]*id=["']hero["'][^>]*>[\s\S]*?<\/section>/i)[0];

console.log('=== OLD HERO ===');
console.log(heroOld);

