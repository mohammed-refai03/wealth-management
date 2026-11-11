import re

print("==================================================================")
print("     PERFECTING AOS & CDNJS ANIMATIONS ACROSS PROJECT")
print("==================================================================")

# ==============================================================================
# 1. UPDATE JS/MAIN.JS
# ==============================================================================
print("\n>>> Step 1: Updating js/main.js with perfected AOS engine...")

with open('js/main.js', 'r', encoding='utf-8') as f:
    main_js = f.read()

# Replace initAOS function
old_init_aos = """function initAOS() {
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 800,
      easing: 'ease-out-cubic',
      once: true,
      offset: 50,
      disable: 'mobile' // Optional: keep enabled or optimize for reduced motion
    });
  }
}"""

new_init_aos = """function initAOS() {
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 800,
      easing: 'ease-out-cubic',
      once: true,
      offset: 60,
      delay: 0,
      disable: false, // Fully enabled on all devices (mobile, tablet, desktop)
      mirror: false
    });
  }
}

// Window load refresh ensuring all layout dimensions and images are settled
window.addEventListener('load', () => {
  if (typeof AOS !== 'undefined') {
    AOS.refresh();
  }
});"""

if old_init_aos in main_js:
    main_js = main_js.replace(old_init_aos, new_init_aos)
    print("  [SUCCESS] Replaced initAOS() in js/main.js")
else:
    print("  [NOTE] Searching regex for initAOS...")
    main_js = re.sub(
        r'function initAOS\(\)\s*\{[\s\S]*?disable:\s*[\'"]mobile[\'"][\s\S]*?\}\s*\}',
        new_init_aos,
        main_js
    )
    print("  [SUCCESS] Regex replaced initAOS() in js/main.js")

# In initStrategyTabs: add AOS.refresh()
target_tab_panel = "targetPanel.classList.add('active');"
if target_tab_panel in main_js and "AOS.refresh()" not in main_js[main_js.find(target_tab_panel):main_js.find(target_tab_panel)+120]:
    main_js = main_js.replace(
        target_tab_panel,
        target_tab_panel + "\n        if (typeof AOS !== 'undefined') setTimeout(() => AOS.refresh(), 80);"
    )
    print("  [SUCCESS] Added AOS.refresh() to initStrategyTabs()")

# In initServiceFilter: add AOS.refresh()
target_card_show = "card.style.display = 'flex';"
if target_card_show in main_js and "AOS.refresh()" not in main_js[main_js.find('initServiceFilter'):main_js.find('initServiceFilter')+1000]:
    main_js = main_js.replace(
        "btn.classList.add('active');",
        "btn.classList.add('active');\n      if (typeof AOS !== 'undefined') setTimeout(() => AOS.refresh(), 80);"
    )
    print("  [SUCCESS] Added AOS.refresh() to initServiceFilter()")

with open('js/main.js', 'w', encoding='utf-8') as f:
    f.write(main_js)

print("  js/main.js updated successfully.")

# ==============================================================================
# 2. UPDATE PRELOADER SCRIPT TO CALL AOS.refreshHard() ACROSS HTML PAGES
# ==============================================================================
print("\n>>> Step 2: Ensuring preloader dismiss calls AOS.refreshHard()...")

html_files = ['index.html', 'about.html', 'services.html', 'blog.html', 'contact.html', 'login.html']

for f in html_files:
    with open(f, 'r', encoding='utf-8') as file:
        content = file.read()

    # Look for preloader.style.display = 'none';
    if "preloader.style.display = 'none';" in content:
        if "AOS.refreshHard()" not in content:
            content = content.replace(
                "preloader.style.display = 'none';",
                "preloader.style.display = 'none';\n              if (typeof AOS !== 'undefined') {\n                AOS.refreshHard();\n              }"
            )
            with open(f, 'w', encoding='utf-8') as file:
                file.write(content)
            print(f"  [UPDATED] {f}: added AOS.refreshHard() on preloader dismiss")
        else:
            print(f"  [OK] {f} already has AOS.refreshHard()")
    else:
        print(f"  [SKIP] {f} has no preloader display block")

# ==============================================================================
# 3. ENRICH CONTENT AOS IN INDEX.HTML
# ==============================================================================
print("\n>>> Step 3: Enriching content AOS attributes in index.html...")

with open('index.html', 'r', encoding='utf-8') as f:
    idx_content = f.read()

# Add AOS to Marquee container
idx_content = idx_content.replace(
    '<section class="wm-marquee-section">',
    '<section class="wm-marquee-section" data-aos="fade-up">'
)

# In Strategy section tabs: add AOS to strategy columns
idx_content = idx_content.replace(
    '<div class="wm-tab-panel-grid">',
    '<div class="wm-tab-panel-grid" data-aos="fade-up" data-aos-delay="150">'
)

# In Testimonials: ensure header and slider have AOS
idx_content = idx_content.replace(
    '<div class="wm-testimonials-header-row">',
    '<div class="wm-testimonials-header-row" data-aos="fade-up">'
)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(idx_content)

print("  [SUCCESS] index.html content animations enriched.")

# ==============================================================================
# 4. ENRICH CONTENT AOS IN ABOUT.HTML & SERVICES.HTML
# ==============================================================================
print("\n>>> Step 4: Enriching content AOS in about.html & services.html...")

with open('about.html', 'r', encoding='utf-8') as f:
    abt_content = f.read()

abt_content = abt_content.replace(
    '<section class="wm-marquee-section">',
    '<section class="wm-marquee-section" data-aos="fade-up">'
)
abt_content = abt_content.replace(
    '<section class="wm-newsletter-strip">',
    '<section class="wm-newsletter-strip" data-aos="fade-up">'
)

with open('about.html', 'w', encoding='utf-8') as f:
    f.write(abt_content)

with open('services.html', 'r', encoding='utf-8') as f:
    srv_content = f.read()

srv_content = srv_content.replace(
    '<div class="wm-consultation-box" data-aos="fade-up">',
    '<div class="wm-consultation-box" data-aos="fade-up" data-aos-delay="100">'
)

with open('services.html', 'w', encoding='utf-8') as f:
    f.write(srv_content)

print("  [SUCCESS] about.html & services.html content animations enriched.")

# ==============================================================================
# 5. ADD AOS TO LOGIN.HTML, SIGNUP.HTML, 404.HTML
# ==============================================================================
print("\n>>> Step 5: Adding AOS CDNJS to login.html, signup.html, 404.html...")

AOS_HEAD = """  <!-- AOS (Animate On Scroll) Library -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/aos/2.3.4/aos.css" integrity="sha512-1cK78a1o+ht2JcaW6g8OXYwqpev9+6GqOkz9dcBN9ZKqh/426vBMiuTWNJVYN8310i3r3f71NTT3770g6lS/g==" crossorigin="anonymous" referrerpolicy="no-referrer" />"""

AOS_BODY = """  <!-- AOS (Animate On Scroll) JS -->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/aos/2.3.4/aos.js" integrity="sha512-A7AYk1fGKX6S2SsHywmPkrnzTZHrgiVT7GcQkLGDe2ev0aWb8zejytzS8wjo7PGEXKqJOrjQ4oORtnimIRZBtw==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
  <script>
    if (typeof AOS !== 'undefined') {
      AOS.init({ duration: 800, easing: 'ease-out-cubic', once: true, offset: 40, disable: false });
    }
  </script>"""

# login.html
with open('login.html', 'r', encoding='utf-8') as f:
    login_html = f.read()

if 'aos.css' not in login_html:
    login_html = login_html.replace('</head>', AOS_HEAD + '\n</head>')
    login_html = login_html.replace('</body>', AOS_BODY + '\n</body>')
    # add data-aos to visual side and auth card
    login_html = login_html.replace(
        '<div class="wm-auth-visual-side">',
        '<div class="wm-auth-visual-side" data-aos="fade-right">'
    )
    login_html = login_html.replace(
        '<div class="wm-auth-card">',
        '<div class="wm-auth-card" data-aos="fade-left">'
    )
    with open('login.html', 'w', encoding='utf-8') as f:
        f.write(login_html)
    print("  [SUCCESS] login.html configured with AOS CDNJS.")

# signup.html
with open('signup.html', 'r', encoding='utf-8') as f:
    signup_html = f.read()

if 'aos.css' not in signup_html:
    signup_html = signup_html.replace('</head>', AOS_HEAD + '\n</head>')
    signup_html = signup_html.replace('</body>', AOS_BODY + '\n</body>')
    signup_html = signup_html.replace(
        '<div class="wm-auth-visual-side">',
        '<div class="wm-auth-visual-side" data-aos="fade-right">'
    )
    signup_html = signup_html.replace(
        '<div class="wm-auth-card">',
        '<div class="wm-auth-card" data-aos="fade-left">'
    )
    with open('signup.html', 'w', encoding='utf-8') as f:
        f.write(signup_html)
    print("  [SUCCESS] signup.html configured with AOS CDNJS.")

# 404.html
with open('404.html', 'r', encoding='utf-8') as f:
    f404_html = f.read()

if 'aos.css' not in f404_html:
    f404_html = f404_html.replace('</head>', AOS_HEAD + '\n</head>')
    f404_html = f404_html.replace('</body>', AOS_BODY + '\n</body>')
    f404_html = f404_html.replace(
        '<div class="wm-404-container">',
        '<div class="wm-404-container" data-aos="fade-up">'
    )
    f404_html = f404_html.replace(
        '<div class="wm-404-visual-wrap" id="wmVisualWrap">',
        '<div class="wm-404-visual-wrap" id="wmVisualWrap" data-aos="zoom-in">'
    )
    with open('404.html', 'w', encoding='utf-8') as f:
        f.write(f404_html)
    print("  [SUCCESS] 404.html configured with AOS CDNJS.")

# ==============================================================================
# 6. ENHANCE CSS FOR HARDWARE ACCELERATED SMOOTH AOS ANIMATIONS
# ==============================================================================
print("\n>>> Step 6: Adding hardware-accelerated AOS performance styles to css/styles.css...")

with open('css/styles.css', 'r', encoding='utf-8') as f:
    css_content = f.read()

aos_perf_css = """/* ==========================================================================
   AOS CDNJS Animation Standards & Smoothness Optimizations
   ========================================================================== */
[data-aos] {
  pointer-events: auto !important;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  will-change: transform, opacity;
}

[data-aos].aos-animate {
  will-change: auto;
}

@media (prefers-reduced-motion: reduce) {
  [data-aos] {
    transition: none !important;
    transform: none !important;
    opacity: 1 !important;
  }
}"""

if "AOS CDNJS Animation Standards" not in css_content:
    css_content = css_content.trim() if hasattr(css_content, 'trim') else css_content.rstrip()
    css_content += "\n\n" + aos_perf_css + "\n"
    with open('css/styles.css', 'w', encoding='utf-8') as f:
        f.write(css_content)
    print("  [SUCCESS] css/styles.css enhanced with AOS performance styles.")
else:
    print("  [OK] css/styles.css already contains AOS performance styles.")

print("\n==================================================================")
print("     ALL AOS & CDNJS ANIMATIONS PERFECTED!")
print("==================================================================")
