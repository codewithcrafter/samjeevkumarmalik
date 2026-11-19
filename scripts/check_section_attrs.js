const fs = require('fs');

const oldMain = fs.readFileSync('scripts/old_main.html', 'utf-8');
const curMain = fs.readFileSync('scripts/cur_main.html', 'utf-8');

// Check the classes on sections
console.log('Old sections:', [...oldMain.matchAll(/<section\s+([^>]+)>/gi)].map(m => m[1]));
console.log('Cur sections:', [...curMain.matchAll(/<section\s+([^>]+)>/gi)].map(m => m[1]));

