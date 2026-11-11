const fs = require('fs');

const files = ['index.html', 'about.html', 'services.html', 'blog.html', 'contact.html'];

files.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  
  // Extract main content between </header> (or drawer) and <footer
  const mainMatch = content.match(/<\/div>\s*<\/div>\s*<\/div>\s*<main>([\s\S]*?)<\/main>/) ||
                    content.match(/<main>([\s\S]*?)<\/main>/);
  if (!mainMatch) {
    console.log(`Could not find <main> in ${f}`);
    return;
  }
  
  const mainContent = mainMatch[1];
  
  // Find all <a ...> tags
  const aMatches = mainContent.match(/<a\b[^>]*>/gi) || [];
  // Find all <button ...> tags
  const btnMatches = mainContent.match(/<button\b[^>]*>/gi) || [];

  console.log(`\n================ ${f} ================`);
  console.log(`Total <a> in main: ${aMatches.length}`);
  console.log(`Total <button> in main: ${btnMatches.length}`);
  
  console.log('\n--- <a> tags in main ---');
  aMatches.forEach((tag, i) => {
    // get href
    const hrefMatch = tag.match(/href="([^"]*)"/i);
    const href = hrefMatch ? hrefMatch[1] : 'NO HREF';
    const classMatch = tag.match(/class="([^"]*)"/i);
    const cls = classMatch ? classMatch[1] : '';
    console.log(`  ${i+1}: href="${href}" class="${cls}"`);
  });

  console.log('\n--- <button> tags in main ---');
  btnMatches.forEach((tag, i) => {
    const classMatch = tag.match(/class="([^"]*)"/i);
    const cls = classMatch ? classMatch[1] : '';
    const typeMatch = tag.match(/type="([^"]*)"/i);
    const type = typeMatch ? typeMatch[1] : 'button';
    console.log(`  ${i+1}: type="${type}" class="${cls}" tag="${tag.slice(0, 80)}"`);
  });
});
