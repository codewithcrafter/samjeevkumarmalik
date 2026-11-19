/**
 * LIVE WATCHER: AUTO-UPDATES SITEMAP.XML AND LLMS.TXT
 * Runs continuously in the background to detect any changes or updates
 * in root HTML files or services/*.html and regenerates sitemap.xml and llms.txt.
 */

const fs = require('fs');
const path = require('path');
const { run } = require('./generate-sitemap-llms');

const ROOT_DIR = path.resolve(__dirname, '..');
const SERVICES_DIR = path.join(ROOT_DIR, 'services');
const BLOGS_DIR = path.join(ROOT_DIR, 'blogs');

let debounceTimer = null;

function triggerSync(filename) {
  if (debounceTimer) clearTimeout(debounceTimer);
  debounceTimer = setTimeout(() => {
    console.log(`[Auto-Sync] Detected modification in: ${filename}`);
    try {
      run();
    } catch (err) {
      console.error('[Auto-Sync Error]', err);
    }
  }, 300);
}

console.log('📡 Starting Real-Time Watcher for sitemap.xml & llms.txt...');

// Watch Root Directory for .html
fs.watch(ROOT_DIR, (eventType, filename) => {
  if (filename && filename.endsWith('.html')) {
    triggerSync(filename);
  }
});

// Watch Services Directory for .html
if (fs.existsSync(SERVICES_DIR)) {
  fs.watch(SERVICES_DIR, (eventType, filename) => {
    if (filename && filename.endsWith('.html')) {
      triggerSync(path.join('services', filename));
    }
  });
}

// Watch Blogs Directory for .html
if (fs.existsSync(BLOGS_DIR)) {
  fs.watch(BLOGS_DIR, (eventType, filename) => {
    if (filename && filename.endsWith('.html')) {
      triggerSync(path.join('blogs', filename));
    }
  });
}

// Initial Sync
run();
console.log('✨ Live Watcher is actively monitoring HTML changes.');

