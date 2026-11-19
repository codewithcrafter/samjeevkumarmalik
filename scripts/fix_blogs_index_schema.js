const fs = require('fs');

// Read blogs.html schema
const blogsHtml = fs.readFileSync('blogs.html', 'utf-8');
const blogsSchemaMatch = blogsHtml.match(/<script type=["']application\/ld\+json["']>([\s\S]*?)<\/script>/i);
if (blogsSchemaMatch) {
  let bIndexHtml = fs.readFileSync('blogs/index.html', 'utf-8');
  bIndexHtml = bIndexHtml.replace(
    /<script type=["']application\/ld\+json["']>[\s\S]*?<\/script>/i,
    blogsSchemaMatch[0]
  );
  fs.writeFileSync('blogs/index.html', bIndexHtml);
  console.log('✓ Successfully synchronized schema from blogs.html to blogs/index.html');
}

