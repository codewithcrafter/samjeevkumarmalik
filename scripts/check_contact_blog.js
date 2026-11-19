const fs = require('fs');

const contact = fs.readFileSync('contact-us.html', 'utf-8');
console.log('=== CONTACT US PREVIEW ===');
console.log(contact.slice(contact.indexOf('<main'), contact.indexOf('<main') + 1200));

const blog = fs.readFileSync('blogs/custom-wordpress-plugin-vs-off-the-shelf.html', 'utf-8');
console.log('\n=== BLOG PREVIEW ===');
console.log(blog.slice(blog.indexOf('<article'), blog.indexOf('<article') + 1200));

