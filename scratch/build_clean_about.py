import re
import os

print("--- Step 1: Reconstructing about.html ---")

# 1. Read base about_original.html
with open('scratch/about_original.html', 'r', encoding='utf-8') as f:
    about_html = f.read()

# 2. Read sections from insert_about_sections.js
with open('scratch/insert_about_sections.js', 'r', encoding='utf-8') as f:
    insert_js = f.read()

secA_match = re.search(r'const\s+sectionA\s*=\s*`([\s\S]*?)`;', insert_js)
secB_match = re.search(r'const\s+sectionB\s*=\s*`([\s\S]*?)`;', insert_js)
secC_match = re.search(r'const\s+sectionC\s*=\s*`([\s\S]*?)`;', insert_js)
secD_match = re.search(r'const\s+sectionD\s*=\s*`([\s\S]*?)`;', insert_js)

secA = secA_match.group(1).strip()
secB = secB_match.group(1).strip()
secC = secC_match.group(1).strip()
secD = secD_match.group(1).strip()

print(f"Loaded Section A ({len(secA)} chars), B ({len(secB)} chars), C ({len(secC)} chars), D ({len(secD)} chars)")

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

body_idx = about_html.find('<body>')
header_idx = about_html.find('<header class="wm-header"')
if body_idx != -1 and header_idx != -1:
    about_html = about_html[:body_idx + 6] + preloader_html + '\n  ' + about_html[header_idx:]
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

about_html = re.sub(
    r'<a href="index\.html" class="wm-logo">\s*<div class="wm-logo-icon">[\s\S]*?<\/div>\s*<div class="wm-logo-text">STACK<span>LY<\/span><\/div>\s*<\/a>',
    header_logo_new,
    about_html
)

about_html = re.sub(
    r'<a href="index\.html" class="wm-logo" style="margin-bottom: 1\.25rem;">\s*<div class="wm-logo-icon">[\s\S]*?<\/div>\s*<div class="wm-logo-text"[^>]*>STACK<span[^>]*>LY<\/span><\/div>\s*<\/a>',
    footer_logo_new,
    about_html
)

# 5. Replace Hero Banner with background banner (Request 8)
old_banner_m = re.search(r'<section class="wm-page-banner">[\s\S]*?<\/section>', about_html)
new_about_banner = """<section class="wm-page-banner" style="background-image: url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1920&q=80');">
      <div class="wm-container">
        <!-- Breadcrumbs -->
        <div class="wm-breadcrumbs" data-aos="fade-down" style="margin-bottom: 16px;">
          <a href="index.html">Home</a>
          <span class="wm-breadcrumbs-separator"><i class="fa-solid fa-chevron-right"></i></span>
          <span style="color: var(--wm-white);">About Us</span>
        </div>
        <div class="wm-tag" style="background-color: rgba(229, 255, 94, 0.15); color: var(--wm-secondary); margin-bottom: 16px;" data-aos="fade-up">
          <span class="wm-tag-dot"></span>Fiduciary Standards
        </div>
        <h1 data-aos="fade-up" style="color: var(--wm-white); font-size: clamp(2.2rem, 4vw, 3.25rem); font-weight: 700; margin-bottom: 16px;">About Stackly Wealth Management</h1>
        <p class="wm-page-banner-desc" data-aos="fade-up" data-aos-delay="100" style="margin-bottom: 0;">
          Independent fee-only fiduciary wealth advisory dedicated to institutional capital stewardship, multi-generational estate preservation, and aligning client prosperity with absolute transparency.
        </p>
      </div>
    </section>"""

if old_banner_m:
    about_html = about_html[:old_banner_m.start()] + new_about_banner + about_html[old_banner_m.end():]
    print("Replaced about.html hero banner.")

# 6. Insert Section A, B, C, D using exact comment anchors
# Anchor 1: Marquee comment (Section 8 in original)
marquee_comment = [c for c in about_html.splitlines() if '8. Custodian & Institutional Partners Marquee' in c]
if marquee_comment:
    target = marquee_comment[0]
    idx = about_html.find(target)
    c_start = about_html.rfind('<!--', 0, idx)
    about_html = about_html[:c_start] + secA + "\n\n    " + about_html[c_start:]
    print("Inserted Section A before Marquee.")
else:
    print("ERROR: Marquee anchor not found!")

# Anchor 2: Team comment (Section 9 in original)
team_comment = [c for c in about_html.splitlines() if '9. Senior Leadership & Advisory Committee' in c]
if team_comment:
    target = team_comment[0]
    idx = about_html.find(target)
    c_start = about_html.rfind('<!--', 0, idx)
    about_html = about_html[:c_start] + secB + "\n\n    " + about_html[c_start:]
    print("Inserted Section B before Team.")
else:
    print("ERROR: Team anchor not found!")

# Anchor 3: Contact comment (Section 10 in original)
contact_comment = [c for c in about_html.splitlines() if '10. Contact / Consultation Form Section' in c]
if contact_comment:
    target = contact_comment[0]
    idx = about_html.find(target)
    c_start = about_html.rfind('<!--', 0, idx)
    about_html = about_html[:c_start] + secC + "\n\n    " + secD + "\n\n    " + about_html[c_start:]
    print("Inserted Section C & D before Contact.")
else:
    print("ERROR: Contact anchor not found!")

# 7. Update Our Heritage relative wrapper (Request 5)
about_html = about_html.replace(
    '<div data-aos="fade-left">\n            <div class="wm-hero-image-wrap">',
    '<div data-aos="fade-left" style="position: relative;">\n            <div class="wm-hero-image-wrap">'
)
about_html = about_html.replace(
    '<div data-aos="fade-left">\r\n            <div class="wm-hero-image-wrap">',
    '<div data-aos="fade-left" style="position: relative;">\r\n            <div class="wm-hero-image-wrap">'
)

# 8. Cache-busting stylesheet link
about_html = re.sub(r'href="css\/styles\.css(\?v=[^"]*)?"', 'href="css/styles.css?v=herogridv4"', about_html)

# 9. Drawer action button to 404
about_html = re.sub(
    r'(<div class="wm-drawer-links">[\s\S]*?<a href=")(#[^"]*)(" class="wm-btn wm-btn-primary"[^>]*>)',
    r'\g<1>404.html\g<3>',
    about_html
)

# 10. Update all content links in <main> to 404.html (Request 9)
main_match = re.search(r'(<main[\s\S]*?>)([\s\S]*?)(<\/main>)', about_html)
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
    about_html = about_html[:main_match.start()] + main_head + new_main_body + main_tail + about_html[main_match.end():]
    print("Updated main body links in about.html to 404.html cleanly.")

# 11. Footer policy, contact, and social links to 404.html
footer_match = re.search(r'(<footer[\s\S]*?>)([\s\S]*?)(<\/footer>)', about_html)
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
    
    about_html = about_html[:footer_match.start()] + f_head + f_body + f_tail + about_html[footer_match.end():]
    print("Updated footer links in about.html.")

with open('about.html', 'w', encoding='utf-8') as out:
    out.write(about_html)

print(f"SUCCESS: about.html written! Length: {len(about_html)}, Lines: {len(about_html.splitlines())}")
