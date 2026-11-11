const fs = require('fs');

// 1. services.html
{
  let content = fs.readFileSync('services.html', 'utf8');
  content = content.replace(
    /<section class="wm-page-banner">/,
    `<section class="wm-page-banner" style="background-image: url('https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1920&q=80');">`
  );
  content = content.replace(
    /<p style="max-width: 760px; color: rgba\(255, 255, 255, 0\.85\); font-size: 1\.125rem; line-height: 1\.7; margin-bottom: 28px;">[\s\S]*?<\/p>/,
    `<p class="wm-page-banner-desc">Stackly delivers an integrated ecosystem of fiduciary disciplines — uniting multi-factor portfolio strategy, advanced tax architecture, estate firewalls, and corporate liquidity for discerning clients.</p>`
  );
  fs.writeFileSync('services.html', content, 'utf8');
  console.log('Updated services.html');
}

// 2. blog.html
{
  let content = fs.readFileSync('blog.html', 'utf8');
  content = content.replace(
    /<section class="wm-page-banner">/,
    `<section class="wm-page-banner" style="background-image: url('https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&w=1920&q=80');">`
  );
  content = content.replace(
    /<p style="max-width: 760px; color: rgba\(255, 255, 255, 0\.85\); font-size: 1\.125rem; line-height: 1\.7; margin-bottom: 28px;">[\s\S]*?<\/p>/,
    `<p class="wm-page-banner-desc">Independent macroeconomic research, multi-factor portfolio strategy, private capital allocations, and advanced tax architecture authored by Stackly senior partners.</p>`
  );
  fs.writeFileSync('blog.html', content, 'utf8');
  console.log('Updated blog.html');
}

// 3. contact.html
{
  let content = fs.readFileSync('contact.html', 'utf8');
  content = content.replace(
    /<section class="wm-page-banner">/,
    `<section class="wm-page-banner" style="background-image: url('https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1920&q=80');">`
  );
  content = content.replace(
    /<p style="max-width: 760px; color: rgba\(255, 255, 255, 0\.85\); font-size: 1\.125rem; line-height: 1\.7; margin-bottom: 28px;">[\s\S]*?<\/p>/,
    `<p class="wm-page-banner-desc">Experience genuine fiduciary stewardship. Connect directly with our Senior Wealth Strategists, Tax Architects, and Family Office Principals at our Salem headquarters or via secure video conference.</p>`
  );
  fs.writeFileSync('contact.html', content, 'utf8');
  console.log('Updated contact.html');
}
