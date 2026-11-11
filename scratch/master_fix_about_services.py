import re

print("================================================================")
print("     MASTER FIX: about.html and services.html")
print("================================================================")

# ==============================================================================
# COMMON COMPONENTS
# ==============================================================================
PRELOADER_HTML = """
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

def get_header_html(active_page):
    about_act = ' active' if active_page == 'about' else ''
    serv_act = ' active' if active_page == 'services' else ''
    return f"""  <header class="wm-header" id="wm-header">
    <div class="wm-container">
      <div class="wm-header-inner">
        <!-- Logo -->
        <a href="index.html" class="wm-logo">
          <img src="assets/images/logo.webp" alt="Stackly Wealth Management" class="wm-logo-img">
        </a>

        <!-- Desktop Navigation: Home, About, Services, Blog, Contact -->
        <nav class="wm-nav" aria-label="Main Navigation">
          <ul class="wm-nav-list">
            <li class="wm-nav-item"><a href="index.html" class="wm-nav-link">Home</a></li>
            <li class="wm-nav-item"><a href="about.html" class="wm-nav-link{about_act}">About</a></li>
            <li class="wm-nav-item"><a href="services.html" class="wm-nav-link{serv_act}">Services</a></li>
            <li class="wm-nav-item"><a href="blog.html" class="wm-nav-link">Blog</a></li>
            <li class="wm-nav-item"><a href="contact.html" class="wm-nav-link">Contact</a></li>
          </ul>
        </nav>

        <!-- Header Actions: Login Button + Mobile Toggle -->
        <div class="wm-header-actions">
          <a href="login.html" class="wm-nav-login-btn">
            <i class="fa-solid fa-user-lock"></i>
            <span>Login</span>
          </a>

          <!-- Mobile Toggle Button -->
          <button class="wm-mobile-toggle" aria-label="Toggle navigation menu">
            <i class="fa-solid fa-bars"></i>
          </button>
        </div>
      </div>
    </div>
  </header>

  <!-- Mobile Drawer Menu -->
  <div class="wm-mobile-drawer">
    <div>
      <div class="wm-drawer-header">
        <a href="index.html" class="wm-logo">
          <img src="assets/images/logo.webp" alt="Stackly Wealth Management" class="wm-logo-img">
        </a>
        <button class="wm-drawer-close" aria-label="Close menu" style="background:none; border:none; font-size:1.6rem; cursor:pointer; color:var(--wm-dark);">
          <i class="fa-solid fa-xmark"></i>
        </button>
      </div>
      <div class="wm-drawer-links">
        <a href="index.html" class="wm-drawer-link">Home</a>
        <a href="about.html" class="wm-drawer-link{about_act}">About</a>
        <a href="services.html" class="wm-drawer-link{serv_act}">Services</a>
        <a href="blog.html" class="wm-drawer-link">Blog</a>
        <a href="contact.html" class="wm-drawer-link">Contact</a>
        <a href="login.html" class="wm-drawer-link" style="color: var(--wm-primary);">
          <i class="fa-solid fa-user-lock"></i> Login
        </a>
      </div>
    </div>
  </div>"""

FOOTER_HTML = """  <footer class="wm-footer">
    <div class="wm-container">
      <div class="wm-footer-grid">
        <!-- Column 1  Brand Information -->
        <div class="wm-footer-col">
          <a href="index.html" class="wm-logo" style="margin-bottom: 1.25rem;">
            <img src="assets/images/logo.webp" alt="Stackly Wealth Management" class="wm-logo-img">
          </a>
          <p style="font-size: 0.9375rem; line-height: 1.7; margin-bottom: 1.5rem;">
            Stackly is a premier financial and wealth management advisory platform delivering institutional-grade capital stewardship, tax strategy, and multi-generational family estate preservation.
          </p>
          <div style="display: flex; gap: 12px;">
            <a href="404.html" class="wm-team-social-link" title="LinkedIn">
              <i class="fa-brands fa-linkedin-in"></i>
            </a>
            <a href="404.html" class="wm-team-social-link" title="Twitter / X">
              <i class="fa-brands fa-x-twitter"></i>
            </a>
            <a href="404.html" class="wm-team-social-link" title="Facebook">
              <i class="fa-brands fa-facebook-f"></i>
            </a>
            <a href="404.html" class="wm-team-social-link" title="Instagram">
              <i class="fa-brands fa-instagram"></i>
            </a>
          </div>
        </div>

        <!-- Column 2  Quick Links (Navbar navigation items) -->
        <div class="wm-footer-col">
          <h4>Quick Links</h4>
          <ul class="wm-footer-links">
            <li><a href="index.html" class="wm-footer-link"><i class="fa-solid fa-angle-right"></i> Home</a></li>
            <li><a href="about.html" class="wm-footer-link"><i class="fa-solid fa-angle-right"></i> About</a></li>
            <li><a href="services.html" class="wm-footer-link"><i class="fa-solid fa-angle-right"></i> Services</a></li>
            <li><a href="blog.html" class="wm-footer-link"><i class="fa-solid fa-angle-right"></i> Blog</a></li>
            <li><a href="contact.html" class="wm-footer-link"><i class="fa-solid fa-angle-right"></i> Contact</a></li>
            <li><a href="login.html" class="wm-footer-link"><i class="fa-solid fa-angle-right"></i> Client Login</a></li>
          </ul>
        </div>

        <!-- Column 3  Policies -->
        <div class="wm-footer-col">
          <h4>Policies</h4>
          <ul class="wm-footer-links">
            <li><a href="404.html" class="wm-footer-link"><i class="fa-solid fa-shield-halved"></i> Privacy Policy</a></li>
            <li><a href="404.html" class="wm-footer-link"><i class="fa-solid fa-scale-balanced"></i> Terms and Conditions</a></li>
            <li><a href="404.html" class="wm-footer-link"><i class="fa-solid fa-cookie-bite"></i> Cookie Policy</a></li>
            <li><a href="404.html" class="wm-footer-link"><i class="fa-solid fa-triangle-exclamation"></i> Disclaimer</a></li>
          </ul>
        </div>

        <!-- Column 4  Contact Information (Single Source of Truth) -->
        <div class="wm-footer-col">
          <h4>Contact Information</h4>
          <div class="wm-footer-contact-item">
            <i class="fa-solid fa-location-dot wm-footer-contact-icon"></i>
            <span>MMR Complex, Chinna Thirupathi, near Chinna Muniyappan Kovil, Salem, Tamil Nadu 636008</span>
          </div>
          <div class="wm-footer-contact-item">
            <i class="fa-solid fa-envelope wm-footer-contact-icon"></i>
            <a href="404.html" class="wm-footer-contact-link">info@stackly.com</a>
          </div>
          <div class="wm-footer-contact-item">
            <i class="fa-solid fa-phone wm-footer-contact-icon"></i>
            <a href="404.html" class="wm-footer-contact-link">9876543210</a>
          </div>
          <div class="wm-footer-contact-item" style="margin-top: 14px;">
            <i class="fa-solid fa-map-location-dot wm-footer-contact-icon"></i>
            <a href="404.html" class="wm-footer-contact-link" style="color: var(--wm-secondary); font-weight: 600;">
              View on Google Maps <i class="fa-solid fa-arrow-up-right-from-square" style="font-size: 0.8rem;"></i>
            </a>
          </div>
        </div>
      </div>

      <!-- Bottom Bar -->
      <div class="wm-footer-bottom">
        <div>
          &copy; 2026 Stackly Wealth Management. All rights reserved. Registered Investment Advisor.
        </div>
        <div style="display: flex; gap: 20px;">
          <a href="404.html">Privacy Policy</a>
          <a href="404.html">Terms and Conditions</a>
          <a href="404.html">Cookie Policy</a>
          <a href="404.html">Disclaimer</a>
        </div>
      </div>
    </div>
  </footer>"""

PRELOADER_SCRIPT = """  <!-- Preloader Controller (Dismisses Within 2 Seconds) -->
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
  </script>"""

# ==============================================================================
# 1. BUILD ABOUT.HTML
# ==============================================================================
print("\n>>> Reconstructing about.html...")

with open('scratch/about_original.html', 'r', encoding='utf-8') as f:
    orig_about = f.read()

with open('scratch/insert_about_sections.js', 'r', encoding='utf-8') as f:
    ins_about_js = f.read()

secA = re.search(r'const\s+sectionA\s*=\s*`([\s\S]*?)`;', ins_about_js).group(1).strip()
secB = re.search(r'const\s+sectionB\s*=\s*`([\s\S]*?)`;', ins_about_js).group(1).strip()
secC = re.search(r'const\s+sectionC\s*=\s*`([\s\S]*?)`;', ins_about_js).group(1).strip()
secD = re.search(r'const\s+sectionD\s*=\s*`([\s\S]*?)`;', ins_about_js).group(1).strip()

head_match = re.search(r'<!DOCTYPE html>[\s\S]*?<body[^>]*>', orig_about)
head_html = head_match.group(0)

main_match = re.search(r'<main[\s\S]*?<\/main>', orig_about)
main_html = main_match.group(0)

# Replace hero banner in main_html
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

main_html = re.sub(r'<section class="wm-page-banner">[\s\S]*?<\/section>', new_about_banner, main_html)

# Insert Section A before Marquee (comment 8)
marquee_line = [l for l in main_html.splitlines() if '8. Custodian & Institutional Partners Marquee' in l][0]
idx_m = main_html.find(marquee_line)
c_m = main_html.rfind('<!--', 0, idx_m)
main_html = main_html[:c_m] + secA + "\n\n    " + main_html[c_m:]

# Insert Section B before Team (comment 9)
team_line = [l for l in main_html.splitlines() if '9. Senior Leadership & Advisory Committee' in l][0]
idx_t = main_html.find(team_line)
c_t = main_html.rfind('<!--', 0, idx_t)
main_html = main_html[:c_t] + secB + "\n\n    " + main_html[c_t:]

# Insert Section C & D before Contact (comment 10)
contact_line = [l for l in main_html.splitlines() if '10. Contact / Consultation Form Section' in l][0]
idx_c = main_html.find(contact_line)
c_c = main_html.rfind('<!--', 0, idx_c)
main_html = main_html[:c_c] + secC + "\n\n    " + secD + "\n\n    " + main_html[c_c:]

# Fix Our Heritage image wrap relative positioning (Request 5)
main_html = main_html.replace(
    '<div data-aos="fade-left">\n            <div class="wm-hero-image-wrap">',
    '<div data-aos="fade-left" style="position: relative;">\n            <div class="wm-hero-image-wrap">'
)
main_html = main_html.replace(
    '<div data-aos="fade-left">\r\n            <div class="wm-hero-image-wrap">',
    '<div data-aos="fade-left" style="position: relative;">\r\n            <div class="wm-hero-image-wrap">'
)

# Convert all content links inside main_html to 404.html (Request 9)
def repl_link_about(m):
    full = m.group(0)
    attrs = m.group(1)
    inner = m.group(2)
    # Check breadcrumb home
    if 'href="index.html"' in attrs and inner.strip() == 'Home':
        return full
    
    new_attrs = re.sub(r'href="[^"]*"', 'href="404.html"', attrs, flags=re.I)
    new_attrs = re.sub(r'\s*data-open-modal="[^"]*"', '', new_attrs, flags=re.I)
    new_attrs = re.sub(r'\s*target="_blank"', '', new_attrs, flags=re.I)
    new_attrs = re.sub(r'\s*rel="[^"]*"', '', new_attrs, flags=re.I)
    return f'<a{new_attrs}>{inner}</a>'

main_html = re.sub(r'<a\b([^>]*)>([\s\S]*?)<\/a>', repl_link_about, main_html, flags=re.I)

# Tail of about.html: everything after </main>
idx_foot = orig_about.rfind('</footer>')
tail_html = orig_about[idx_foot+9:]

if 'wmPreloaderPercent' not in tail_html:
    tail_html = tail_html.replace('</body>', PRELOADER_SCRIPT + '\n</body>')

about_final = head_html + '\n' + PRELOADER_HTML + '\n' + get_header_html('about') + '\n\n  ' + main_html + '\n\n' + FOOTER_HTML + '\n' + tail_html

# Update cache-busting CSS link
about_final = re.sub(r'href="css\/styles\.css(\?v=[^"]*)?"', 'href="css/styles.css?v=herogridv4"', about_final)

with open('about.html', 'w', encoding='utf-8') as out:
    out.write(about_final)

print(f"about.html written! Length: {len(about_final)}, Lines: {len(about_final.splitlines())}")

# ==============================================================================
# 2. BUILD SERVICES.HTML
# ==============================================================================
print("\n>>> Reconstructing services.html...")

with open('scratch/services_original.html', 'r', encoding='utf-8') as f:
    orig_serv = f.read()

with open('scratch/services_insert_1500.js', 'r', encoding='utf-8') as f:
    ins_serv_js = f.read()

new_sections_html = re.search(r'const\s+newSectionsHTML\s*=\s*`([\s\S]*?)`;', ins_serv_js).group(1).strip()

head_match_s = re.search(r'<!DOCTYPE html>[\s\S]*?<body[^>]*>', orig_serv)
head_html_s = head_match_s.group(0)

main_match_s = re.search(r'<main[\s\S]*?<\/main>', orig_serv)
main_html_s = main_match_s.group(0)

# Replace hero banner in main_html_s
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

main_html_s = re.sub(r'<section class="wm-page-banner">[\s\S]*?<\/section>', new_services_banner, main_html_s)

# Insert new sections (Tiers, Bento, Custody Vault, Case Studies) before SECTION 7 of 7 (#booking)
booking_line = [l for l in main_html_s.splitlines() if 'SECTION 7 of 7: Schedule a Diagnostic Wealth Review' in l][0]
idx_b = main_html_s.find(booking_line)
c_b = main_html_s.rfind('<!--', 0, idx_b)
main_html_s = main_html_s[:c_b] + new_sections_html + "\n\n    " + main_html_s[c_b:]

# Convert all content links inside main_html_s to 404.html (Request 9)
def repl_link_serv(m):
    full = m.group(0)
    attrs = m.group(1)
    inner = m.group(2)
    # Check breadcrumb home
    if 'href="index.html"' in attrs and inner.strip() == 'Home':
        return full
    
    new_attrs = re.sub(r'href="[^"]*"', 'href="404.html"', attrs, flags=re.I)
    new_attrs = re.sub(r'\s*data-open-modal="[^"]*"', '', new_attrs, flags=re.I)
    new_attrs = re.sub(r'\s*target="_blank"', '', new_attrs, flags=re.I)
    new_attrs = re.sub(r'\s*rel="[^"]*"', '', new_attrs, flags=re.I)
    return f'<a{new_attrs}>{inner}</a>'

main_html_s = re.sub(r'<a\b([^>]*)>([\s\S]*?)<\/a>', repl_link_serv, main_html_s, flags=re.I)

idx_foot_s = orig_serv.rfind('</footer>')
tail_html_s = orig_serv[idx_foot_s+9:]

if 'wmPreloaderPercent' not in tail_html_s:
    tail_html_s = tail_html_s.replace('</body>', PRELOADER_SCRIPT + '\n</body>')

services_final = head_html_s + '\n' + PRELOADER_HTML + '\n' + get_header_html('services') + '\n\n  ' + main_html_s + '\n\n' + FOOTER_HTML + '\n' + tail_html_s

services_final = re.sub(r'href="css\/styles\.css(\?v=[^"]*)?"', 'href="css/styles.css?v=herogridv4"', services_final)

with open('services.html', 'w', encoding='utf-8') as out:
    out.write(services_final)

print(f"services.html written! Length: {len(services_final)}, Lines: {len(services_final.splitlines())}")
print("\n================================================================")
print("     ALL RECONSTRUCTIONS FINISHED SUCCESSFULLY!")
print("================================================================")
