import os, re

print("==================================================================")
print("     APPLYING ULTIMATE BULLETPROOF AOS ANIMATION FIX")
print("==================================================================")

# ==============================================================================
# 1. UPDATE CSS/STYLES.CSS: Embed AOS styles & fix prefers-reduced-motion
# ==============================================================================
print("\n>>> Step 1: Updating css/styles.css...")

with open('css/styles.css', 'r', encoding='utf-8') as f:
    css = f.read()

# Read the local aos.css
with open('css/aos.css', 'r', encoding='utf-8') as f:
    aos_css_content = f.read()

# Remove the prefers-reduced-motion override that was disabling AOS
old_perf_css = """/* ==========================================================================
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

new_perf_css = f"""/* ==========================================================================
   AOS CDNJS & Native Animation Core Rules
   ========================================================================== */
{aos_css_content}

/* Hardware-acceleration & Visibility Enhancements */
[data-aos] {{
  pointer-events: auto !important;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  will-change: transform, opacity;
}}

[data-aos].aos-animate {{
  will-change: auto;
}}"""

if old_perf_css in css:
    css = css.replace(old_perf_css, new_perf_css)
    print("  [SUCCESS] Replaced old AOS performance block in css/styles.css with complete embedded AOS rules.")
elif "AOS CDNJS & Native Animation Core Rules" not in css:
    css = css.rstrip() + "\n\n" + new_perf_css + "\n"
    print("  [SUCCESS] Appended complete embedded AOS rules to css/styles.css.")
else:
    print("  [OK] css/styles.css already contains embedded AOS rules.")

with open('css/styles.css', 'w', encoding='utf-8') as f:
    f.write(css)

# ==============================================================================
# 2. UPDATE JS/MAIN.JS: Robust AOS initialization engine
# ==============================================================================
print("\n>>> Step 2: Updating js/main.js...")

with open('js/main.js', 'r', encoding='utf-8') as f:
    main_js = f.read()

# Replace initAOS function with retry-enabled, once:false, mirror:true engine
old_init_aos_pattern = r'function initAOS\(\)\s*\{[\s\S]*?disable:\s*false[\s\S]*?\}\s*\}'

new_init_aos = """function initAOS() {
  function startAOS() {
    if (typeof AOS !== 'undefined') {
      AOS.init({
        duration: 800,
        easing: 'ease-out-cubic',
        once: false,       // Continuously animates when scrolling into view
        offset: 50,        // Responsive viewport trigger offset
        delay: 0,
        disable: false,    // Enabled across all viewports (mobile, tablet, desktop)
        mirror: true       // Smoothly animates elements when scrolling back
      });
      return true;
    }
    return false;
  }

  if (!startAOS()) {
    // Retry polling in case script is loading from CDN or local buffer
    var retryCount = 0;
    var timer = setInterval(function() {
      retryCount++;
      if (startAOS() || retryCount > 30) {
        clearInterval(timer);
      }
    }, 100);
  }
}"""

if re.search(old_init_aos_pattern, main_js):
    main_js = re.sub(old_init_aos_pattern, new_init_aos, main_js)
    print("  [SUCCESS] Replaced initAOS() with retry-polling and mirror-scroll support in js/main.js.")
elif "function startAOS()" not in main_js:
    # If regex didn't match, search for function initAOS() { ... }
    main_js = re.sub(r'function initAOS\(\)\s*\{[\s\S]*?\n\}', new_init_aos, main_js, count=1)
    print("  [SUCCESS] Fallback replaced initAOS() in js/main.js.")
else:
    print("  [OK] js/main.js already has robust initAOS().")

with open('js/main.js', 'w', encoding='utf-8') as f:
    f.write(main_js)

# ==============================================================================
# 3. UPDATE ALL HTML FILES: Clean CDNJS + Local Fallback links & scripts
# ==============================================================================
print("\n>>> Step 3: Updating HTML files...")

# Clean head links
CLEAN_HEAD_AOS = """  <!-- AOS (Animate On Scroll) Library - CDNJS with Local Fallback -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/aos/2.3.4/aos.css">
  <link rel="stylesheet" href="css/aos.css">"""

CLEAN_SCRIPTS_STANDARD = """  <!-- AOS (Animate On Scroll) JS - CDNJS with Local Fallback -->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/aos/2.3.4/aos.js"></script>
  <script src="js/aos.js"></script>
  <!-- Interaction Script -->
  <script src="js/main.js"></script>"""

# Preloader dismiss block ensuring AOS triggers as preloader fades out
PRELOADER_REFRESH = """            preloader.classList.add('fade-out');
            setTimeout(() => {
              preloader.style.display = 'none';
              if (typeof AOS !== 'undefined') {
                AOS.refreshHard();
              }
            }, 450);"""

standard_pages = ['index.html', 'about.html', 'services.html', 'blog.html', 'contact.html']

for page in standard_pages:
    with open(page, 'r', encoding='utf-8') as f:
        content = f.read()

    # 1. Replace AOS head link (remove integrity & crossorigin that break file:// and add local fallback)
    content = re.sub(
        r'<!-- AOS \(Animate On Scroll\) Library -->\s*<link rel="stylesheet" href="https://cdnjs\.cloudflare\.com/ajax/libs/aos/2\.3\.4/aos\.css"[^>]*>',
        CLEAN_HEAD_AOS,
        content
    )
    # Also if already replaced or slightly different
    content = re.sub(
        r'<link rel="stylesheet" href="https://cdnjs\.cloudflare\.com/ajax/libs/aos/2\.3\.4/aos\.css"[^>]*>',
        CLEAN_HEAD_AOS,
        content
    )
    # Deduplicate if duplicate CLEAN_HEAD_AOS was created
    while CLEAN_HEAD_AOS + "\n" + CLEAN_HEAD_AOS in content:
        content = content.replace(CLEAN_HEAD_AOS + "\n" + CLEAN_HEAD_AOS, CLEAN_HEAD_AOS)

    # 2. Replace AOS script before main.js
    content = re.sub(
        r'<!-- AOS \(Animate On Scroll\) JS -->\s*<script src="https://cdnjs\.cloudflare\.com/ajax/libs/aos/2\.3\.4/aos\.js"[^>]*></script>\s*<!-- Interaction Script -->\s*<script src="js/main\.js"></script>',
        CLEAN_SCRIPTS_STANDARD,
        content
    )
    # Also generic replace
    content = re.sub(
        r'<script src="https://cdnjs\.cloudflare\.com/ajax/libs/aos/2\.3\.4/aos\.js"[^>]*></script>\s*<script src="js/main\.js"></script>',
        CLEAN_SCRIPTS_STANDARD,
        content
    )

    with open(page, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"  [SUCCESS] {page} updated with clean CDNJS + local fallback.")

# ==============================================================================
# 4. UPDATE LOGIN.HTML & SIGNUP.HTML: Correct script order
# ==============================================================================
print("\n>>> Step 4: Updating login.html and signup.html...")

for auth_page in ['login.html', 'signup.html']:
    with open(auth_page, 'r', encoding='utf-8') as f:
        acontent = f.read()

    # Replace head link
    acontent = re.sub(
        r'<!-- AOS \(Animate On Scroll\) Library -->\s*<link rel="stylesheet" href="https://cdnjs\.cloudflare\.com/ajax/libs/aos/2\.3\.4/aos\.css"[^>]*>',
        CLEAN_HEAD_AOS,
        acontent
    )
    acontent = re.sub(
        r'<link rel="stylesheet" href="https://cdnjs\.cloudflare\.com/ajax/libs/aos/2\.3\.4/aos\.css"[^>]*>',
        CLEAN_HEAD_AOS,
        acontent
    )
    while CLEAN_HEAD_AOS + "\n" + CLEAN_HEAD_AOS in acontent:
        acontent = acontent.replace(CLEAN_HEAD_AOS + "\n" + CLEAN_HEAD_AOS, CLEAN_HEAD_AOS)

    # Remove the trailing aos script block at the end of body
    trailing_block = re.search(
        r'<!-- AOS \(Animate On Scroll\) JS -->\s*<script src="https://cdnjs\.cloudflare\.com/ajax/libs/aos/2\.3\.4/aos\.js"[^>]*></script>\s*<script>[\s\S]*?AOS\.init[\s\S]*?</script>',
        acontent
    )
    if trailing_block:
        acontent = acontent.replace(trailing_block.group(0), '')

    # Ensure aos.js & js/aos.js are placed BEFORE js/main.js
    if '<script src="js/aos.js"></script>' not in acontent:
        acontent = acontent.replace(
            '<script src="js/main.js"></script>',
            '<!-- AOS (Animate On Scroll) JS - CDNJS with Local Fallback -->\n  <script src="https://cdnjs.cloudflare.com/ajax/libs/aos/2.3.4/aos.js"></script>\n  <script src="js/aos.js"></script>\n  <script src="js/main.js"></script>'
        )

    with open(auth_page, 'w', encoding='utf-8') as f:
        f.write(acontent)
    print(f"  [SUCCESS] {auth_page} updated with correct script order & local fallback.")

# ==============================================================================
# 5. UPDATE 404.HTML
# ==============================================================================
print("\n>>> Step 5: Updating 404.html...")

with open('404.html', 'r', encoding='utf-8') as f:
    f404 = f.read()

f404 = re.sub(
    r'<link rel="stylesheet" href="https://cdnjs\.cloudflare\.com/ajax/libs/aos/2\.3\.4/aos\.css"[^>]*>',
    CLEAN_HEAD_AOS,
    f404
)
while CLEAN_HEAD_AOS + "\n" + CLEAN_HEAD_AOS in f404:
    f404 = f404.replace(CLEAN_HEAD_AOS + "\n" + CLEAN_HEAD_AOS, CLEAN_HEAD_AOS)

f404_script_old = re.search(
    r'<!-- AOS \(Animate On Scroll\) JS -->\s*<script src="https://cdnjs\.cloudflare\.com/ajax/libs/aos/2\.3\.4/aos\.js"[^>]*></script>\s*<script>[\s\S]*?AOS\.init[\s\S]*?</script>',
    f404
)

f404_script_new = """  <!-- AOS (Animate On Scroll) JS - CDNJS with Local Fallback -->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/aos/2.3.4/aos.js"></script>
  <script src="js/aos.js"></script>
  <script>
    function startAOS404() {
      if (typeof AOS !== 'undefined') {
        AOS.init({ duration: 800, easing: 'ease-out-cubic', once: false, offset: 30, disable: false, mirror: true });
        return true;
      }
      return false;
    }
    if (!startAOS404()) {
      var r = 0, t = setInterval(function() { r++; if (startAOS404() || r > 30) clearInterval(t); }, 100);
    }
  </script>"""

if f404_script_old:
    f404 = f404.replace(f404_script_old.group(0), f404_script_new)
elif "startAOS404()" not in f404:
    f404 = f404.replace('</body>', f404_script_new + '\n</body>')

with open('404.html', 'w', encoding='utf-8') as f:
    f.write(f404)
print("  [SUCCESS] 404.html updated with clean scripts & polling retry.")

print("\n==================================================================")
print("     ALL AOS ENHANCEMENTS APPLIED SUCCESSFULLY!")
print("==================================================================")
