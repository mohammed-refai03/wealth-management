const fs = require('fs');

function processFile(filename, dryRun = true) {
  let content = fs.readFileSync(filename, 'utf8');
  console.log(`\n================ Processing ${filename} (dryRun=${dryRun}) ================`);

  // 1. Process mobile drawer action button if present (not the menu links)
  // e.g. <a href="#contact" class="wm-btn wm-btn-primary" style="width:100%; justify-content:center;">
  // or <a href="#consultation" ...
  content = content.replace(/(<div class="wm-drawer"[\s\S]*?<div class="wm-drawer-links">[\s\S]*?)(<a href=")(#[^"]*)(" class="wm-btn wm-btn-primary"[^>]*>)/, (m, p1, p2, p3, p4) => {
    console.log(`  [Drawer Action Button] ${p3} -> 404.html`);
    return `${p1}${p2}404.html${p4}`;
  });

  // 2. Process <main> section
  const mainRegex = /(<main[\s\S]*?>)([\s\S]*?)(<\/main>)/;
  const mainMatch = content.match(mainRegex);
  if (!mainMatch) {
    console.log(`  No <main> tag found in ${filename}`);
    return;
  }

  let mainBody = mainMatch[2];

  // In blog.html, convert the 3 whitepaper download buttons to <a href="404.html" ...>
  if (filename === 'blog.html') {
    mainBody = mainBody.replace(/<button class="wm-btn wm-btn-primary" style="width:100%; justify-content:center;" data-action="download-whitepaper"[^>]*>([\s\S]*?)<\/button>/g, (m, inner) => {
      console.log(`  [Whitepaper Button -> <a>] Converted to <a href="404.html">`);
      return `<a href="404.html" class="wm-btn wm-btn-primary" style="width:100%; justify-content:center;">${inner}</a>`;
    });
  }

  // Find all <a> tags inside mainBody
  mainBody = mainBody.replace(/<a\b([^>]*)>([\s\S]*?)<\/a>/gi, (match, attrs, inner) => {
    // Check if this is breadcrumb Home link
    if (attrs.includes('href="index.html"') && inner.trim() === 'Home') {
      console.log(`  [Breadcrumb Home] Preserving href="index.html"`);
      return match;
    }

    // Clean up attrs
    let newAttrs = attrs;

    // Replace href
    newAttrs = newAttrs.replace(/href="[^"]*"/i, 'href="404.html"');
    
    // Remove data-open-modal="consultation"
    newAttrs = newAttrs.replace(/\s*data-open-modal="[^"]*"/gi, '');

    // Remove target="_blank" and rel="..."
    newAttrs = newAttrs.replace(/\s*target="_blank"/gi, '');
    newAttrs = newAttrs.replace(/\s*rel="[^"]*"/gi, '');

    console.log(`  [Link] -> href="404.html" (text: "${inner.replace(/<[^>]+>/g, '').trim().slice(0, 30)}")`);
    return `<a${newAttrs}>${inner}</a>`;
  });

  const newContent = content.replace(mainRegex, `${mainMatch[1]}${mainBody}${mainMatch[3]}`);

  if (!dryRun) {
    fs.writeFileSync(filename, newContent, 'utf8');
    console.log(`  Saved ${filename}!`);
  }
}

['index.html', 'about.html', 'services.html', 'blog.html', 'contact.html'].forEach(f => processFile(f, true));
