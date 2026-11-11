const fs = require('fs');

const files = ['index.html', 'about.html', 'services.html', 'blog.html', 'contact.html'];

files.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  console.log(`\n======================================================`);
  console.log(`FILE: ${f}`);
  console.log(`======================================================`);
  
  // Find all <a> tags in file
  const matches = [...content.matchAll(/<a\b([^>]*)>([\s\S]*?)<\/a>/gi)];
  
  matches.forEach((m, idx) => {
    const attrs = m[1];
    const inner = m[2].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
    const hrefMatch = attrs.match(/href="([^"]*)"/i);
    const href = hrefMatch ? hrefMatch[1] : '';
    
    // Determine location: navbar, drawer, footer, or body
    let loc = 'BODY';
    const indexInFile = m.index;
    const beforeText = content.substring(0, indexInFile);
    if (beforeText.includes('<footer') && !beforeText.includes('</footer>')) {
      loc = 'FOOTER';
    } else if (beforeText.includes('<header') && !beforeText.includes('</header>')) {
      loc = 'NAVBAR';
    } else if (beforeText.includes('class="wm-drawer') && !beforeText.includes('<!-- End of Drawer -->') && beforeText.lastIndexOf('<main>') < indexInFile && beforeText.lastIndexOf('wm-drawer') > beforeText.lastIndexOf('</header>')) {
      // check if inside drawer
      const lastDrawer = beforeText.lastIndexOf('class="wm-drawer"');
      const lastMain = beforeText.lastIndexOf('<main');
      if (lastDrawer > -1 && (lastMain === -1 || lastDrawer > lastMain)) {
        loc = 'DRAWER (NAVBAR)';
      }
    }
    
    console.log(`[${loc}] #${idx+1} href="${href}" -> "${inner.slice(0, 35)}"`);
  });
});
