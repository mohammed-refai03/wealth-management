import re

print("--- Step 2: Reconstructing services.html ---")

# 1. Read base services_original.html
with open('scratch/services_original.html', 'r', encoding='utf-8') as f:
    services_html = f.read()

# 2. Read new sections from services_insert_1500.js
with open('scratch/services_insert_1500.js', 'r', encoding='utf-8') as f:
    insert_js = f.read()

m = re.search(r'const\s+newSectionsHTML\s*=\s*`([\s\S]*?)`;', insert_js)
new_sections_html = m.group(1).strip()
print(f"Loaded new_sections_html ({len(new_sections_html)} chars)")

# 3. Clean preloader and remove top announcement bar
preloader_html = """
  <!-- ==========================================================================
       Preloader (Within 2s Institutional Wealth Loading Protocol)
       ========================================================================== -->
  <div id="wm-preloader" class="wm-preloader" aria-hidden="true">
    <div class="wm-preloader-bg-glow"></div>
    <div class="wm-preloader-content">
      <div class="wm-preloader-graphic">
        <svg class="wm-preloader-svg" viewBox="0 0 100 100">
          <circle class="wm-preloader-track" cx="50" cy="50" r="44"></circle>
          <circle class="wm-preloader-fill" cx="50" cy="50" r="44"></circle>
        </svg>
        <div class="wm-preloader-emblem">
          <i class="fa-solid fa-chart-line"></i>
        </div>
      </div>
      <div class="wm-preloader-brand">
        STACK<span>LY</span>
      </div>
      <div class="wm-preloader-sub">
        Institutional Wealth Architecture
      </div>
      <div class="wm-preloader-bar-wrap">
        <div class="wm-preloader-bar-fill"></div>
      </div>
      <div class="wm-preloader-footer">
        <span class="wm-preloader-status"><span class="wm-loader-dot"></span> Securing Client Vault</span>
        <span class="wm-preloader-percent" id="wmPreloaderPercent">0%</span>
      </div>
    </div>
  </div>
"""

body_idx = services_html.find('<body>')
header_idx = services_html.find('<header class="wm-header"')
if body_idx != -1 and header_idx != -1:
    services_html = services_html[:body_idx + 6] + preloader_html + '\n  ' + services_html[header_idx:]
    print("Preloader added and top announcement bar removed.")

# 4. Replace logos in header, drawer, and footer
header_logo_new = """<a href="index.html" class="wm-logo">
          <img src="assets/images/logo.webp" alt="Stackly Wealth Management" class="wm-logo-img">
        </a>"""

drawer_logo_new = """<a href="index.html" class="wm-logo">
        <img src="assets/images/logo.webp" alt="Stackly Wealth Management" class="wm-logo-img">
      </a>"""

footer_logo_new = """<a href="index.html" class="wm-logo" style="margin-bottom: 1.25rem;">
            <img src="assets/images/logo.webp" alt="Stackly Wealth Management" class="wm-logo-img">
          </a>"""

services_html = re.sub(
    r'<a href="index\.html" class="wm-logo">\s*<div class="wm-logo-icon">[\s\S]*?<\/div>\s*<div class="wm-logo-text">STACK<span>LY<\/span><\/div>\s*<\/a>',
    header_logo_new,
    services_html
)

services_html = re.sub(
    r'<a href="index\.html" class="wm-logo" style="margin-bottom: 1\.25rem;">\s*<div class="wm-logo-icon">[\s\S]*?<\/div>\s*<div class="wm-logo-text"[^>]*>STACK<span[^>]*>LY<\/span><\/div>\s*<\/a>',
    footer_logo_new,
    services_html
)

# 5. Replace Hero Banner with background banner (Request 8)
old_banner_m = re.search(r'<section class="wm-page-banner">[\s\S]*?<\/section>', services_html)
new_services_banner = """<section class="wm-page-banner" style="background-image: url('https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1920&q=80');">
      <div class="wm-container">
        <div class="wm-page-banner-content" data-aos="fade-up">
          <!-- Breadcrumbs -->
          <div class="wm-breadcrumbs" style="margin-bottom: 16px;">
            <a href="index.html">Home</a>
            <span class="wm-breadcrumbs-separator"><i class="fa-solid fa-chevron-right"></i></span>
            <span>Services</span>
          </div>
          
          <div class="wm-tag" style="background-color: rgba(229, 255, 94, 0.15); color: var(--wm-secondary); margin-bottom: 16px;">COMPREHENSIVE ADVISORY PLATFORM</div>
          <h1 style="color: var(--wm-white); font-size: clamp(2.2rem, 4vw, 3.25rem); font-weight: 700; margin-bottom: 16px;">Bespoke Wealth Management & Institutional Advisory</h1>
          <p class="wm-page-banner-desc">Stackly delivers an integrated ecosystem of fiduciary disciplines — uniting multi-factor portfolio strategy, advanced tax architecture, estate firewalls, and corporate liquidity for high-net-worth families, entrepreneurs, and institutions.</p>

          <div style="display: flex; gap: 16px; flex-wrap: wrap;">
            <a href="404.html" class="wm-btn wm-btn-primary">
              <span>Schedule Diagnostic Audit</span>
              <span class="wm-btn-icon"><i class="fa-solid fa-arrow-right"></i></span>
            </a>
            <a href="404.html" class="wm-btn wm-btn-outline" style="border-color: rgba(255,255,255,0.3); color: var(--wm-white);">
              <span>Explore Disciplines</span>
              <span class="wm-btn-icon"><i class="fa-solid fa-arrow-down"></i></span>
            </a>
          </div>

          <!-- Institutional Trust Highlights Strip -->
          <div class="wm-banner-trust-strip" data-aos="fade-up" data-aos-delay="100">
            <div class="wm-banner-trust-item">
              <i class="fa-solid fa-scale-balanced"></i>
              <div>
                <strong>100% Fee-Only</strong>
                <span>Strict Legal Fiduciary Duty</span>
              </div>
            </div>
            <div class="wm-banner-trust-item">
              <i class="fa-solid fa-vault"></i>
              <div>
                <strong>$2.8B+ Assets</strong>
                <span>Under Strategic Advisory</span>
              </div>
            </div>
            <div class="wm-banner-trust-item">
              <i class="fa-solid fa-shield-halved"></i>
              <div>
                <strong>Dual Custody</strong>
                <span>Charles Schwab & Fidelity</span>
              </div>
            </div>
            <div class="wm-banner-trust-item">
              <i class="fa-solid fa-award"></i>
              <div>
                <strong>99.4% Retention</strong>
                <span>Generational Capital Loyalty</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>"""

if old_banner_m:
    services_html = services_html[:old_banner_m.start()] + new_services_banner + services_html[old_banner_m.end():]
    print("Replaced services.html hero banner.")
else:
    print("ERROR: old_banner_m not found!")

# 6. Insert new sections before Section 7 (#booking)
# Look for SECTION 7 of 7 comment
target_marker = [line for line in services_html.splitlines() if 'SECTION 7 of 7: Schedule a Diagnostic Wealth Review' in line]
if target_marker:
    marker_line = target_marker[0]
    idx = services_html.find(marker_line)
    c_start = services_html.rfind('<!--', 0, idx)
    services_html = services_html[:c_start] + new_sections_html + "\n\n    " + services_html[c_start:]
    print("Inserted new sections into services.html.")
else:
    print("ERROR: Booking comment anchor not found!")

# 7. Drawer action button to 404
services_html = re.sub(
    r'(<div class="wm-drawer-links">[\s\S]*?<a href=")(#[^"]*)(" class="wm-btn wm-btn-primary"[^>]*>)',
    r'\g<1>404.html\g<3>',
    services_html
)

# 8. Update all content links in <main> to 404.html (Request 9)
main_match = re.search(r'(<main[\s\S]*?>)([\s\S]*?)(<\/main>)', services_html)
if main_match:
    main_head = main_match.group(1)
    main_body = main_match.group(2)
    main_tail = main_match.group(3)

    def repl_link(m):
        full = m.group(0)
        attrs = m.group(1)
        inner = m.group(2)
        # Check breadcrumb home
        if 'href="index.html"' in attrs and inner.strip() == 'Home':
            return full
        
        # Replace href
        new_attrs = re.sub(r'href="[^"]*"', 'href="404.html"', attrs, flags=re.I)
        # Remove data-open-modal
        new_attrs = re.sub(r'\s*data-open-modal="[^"]*"', '', new_attrs, flags=re.I)
        new_attrs = re.sub(r'\s*target="_blank"', '', new_attrs, flags=re.I)
        new_attrs = re.sub(r'\s*rel="[^"]*"', '', new_attrs, flags=re.I)
        return f'<a{new_attrs}>{inner}</a>'

    new_main_body = re.sub(r'<a\b([^>]*)>([\s\S]*?)<\/a>', repl_link, main_body, flags=re.I)
    services_html = services_html[:main_match.start()] + main_head + new_main_body + main_tail + services_html[main_match.end():]
    print("Updated main body links in services.html to 404.html cleanly.")

# 9. Footer policy, contact, and social links to 404.html
footer_match = re.search(r'(<footer[\s\S]*?>)([\s\S]*?)(<\/footer>)', services_html)
if footer_match:
    f_head = footer_match.group(1)
    f_body = footer_match.group(2)
    f_tail = footer_match.group(3)

    # Social links
    f_body = re.sub(r'<a href="https?:\/\/(?:linkedin|twitter|facebook|instagram)\.com[^"]*"', '<a href="404.html"', f_body)
    f_body = re.sub(r'<a href="policies\.html"', '<a href="404.html"', f_body)
    f_body = re.sub(r'<a href="terms\.html"', '<a href="404.html"', f_body)
    f_body = re.sub(r'<a href="privacy\.html"', '<a href="404.html"', f_body)
    f_body = re.sub(r'<a href="disclaimer\.html"', '<a href="404.html"', f_body)
    f_body = re.sub(r'<a href="mailto:[^"]*"', '<a href="404.html"', f_body)
    f_body = re.sub(r'<a href="tel:[^"]*"', '<a href="404.html"', f_body)
    f_body = re.sub(r'<a href="https?:\/\/maps\.google\.com[^"]*"', '<a href="404.html"', f_body)
    
    services_html = services_html[:footer_match.start()] + f_head + f_body + f_tail + services_html[footer_match.end():]
    print("Updated footer links in services.html.")

# 10. Ensure preloader controller script is before </body>
preloader_script = """
  <!-- Preloader Controller (Dismisses Within 2 Seconds) -->
  <script>
    (function() {
      const preloader = document.getElementById('wm-preloader');
      if (!preloader) return;
      const percentEl = document.getElementById('wmPreloaderPercent');
      const startTime = performance.now();
      const duration = 1500; // 1.5s active progress count

      function update(now) {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const percent = Math.floor(progress * 100);
        if (percentEl) percentEl.textContent = percent + '%';
        if (progress < 1) {
          requestAnimationFrame(update);
        } else {
          setTimeout(() => {
            preloader.classList.add('fade-out');
            setTimeout(() => {
              preloader.style.display = 'none';
            }, 450);
          }, 80);
        }
      }
      requestAnimationFrame(update);
    })();
  </script>
"""

if 'wm-preloader' in services_html and 'wmPreloaderPercent' not in services_html:
    services_html = services_html.replace('</body>', preloader_script + '\n</body>')
    print("Added preloader controller script to services.html.")

with open('services.html', 'w', encoding='utf-8') as out:
    out.write(services_html)

print(f"SUCCESS: services.html written! Length: {len(services_html)}, Lines: {len(services_html.splitlines())}")
