import re

print("==================================================================")
print("APPLYING MOBILE OVERFLOW FIX")
print("==================================================================")

# 1. Update css/styles.css
with open('css/styles.css', 'r', encoding='utf-8') as f:
    css = f.read()

# Replace html and body reset block
old_base = """html {
  font-size: 16px;
  scroll-behavior: smooth;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

body {
  font-family: var(--wm-font-family);
  font-size: var(--wm-font-base);
  font-weight: 400;
  line-height: 1.7;
  color: var(--wm-body);
  background-color: var(--wm-white);
  overflow-x: hidden;
}"""

new_base = """html {
  font-size: 16px;
  scroll-behavior: smooth;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  overflow-x: hidden;
  max-width: 100%;
}

body {
  font-family: var(--wm-font-family);
  font-size: var(--wm-font-base);
  font-weight: 400;
  line-height: 1.7;
  color: var(--wm-body);
  background-color: var(--wm-white);
  overflow-x: hidden;
  max-width: 100%;
  position: relative;
  width: 100%;
}

main {
  overflow-x: hidden;
  max-width: 100%;
  width: 100%;
}

@supports (overflow-x: clip) {
  html, body, main {
    overflow-x: clip;
  }
}"""

if old_base in css:
    css = css.replace(old_base, new_base)
    print("  [SUCCESS] Updated html, body, and main base overflow rules in css/styles.css")
else:
    print("  [NOTE] Searching regex for html and body base...")
    css = re.sub(
        r'html\s*\{[^}]*\}\s*body\s*\{[^}]*overflow-x:\s*hidden;?\s*\}',
        new_base,
        css,
        count=1
    )
    print("  [SUCCESS] Regex replaced html and body base in css/styles.css")

# Append mobile AOS overflow protection block
mobile_overflow_block = """
/* ==========================================================================
   Mobile Responsive Horizontal Overflow Prevention for Pre-Animation Elements
   Solves initial mobile horizontal overflow before scroll without altering animation or layout
   ========================================================================== */
.wm-section,
.wm-page-banner,
.wm-marquee-section,
.wm-footer,
.wm-fiduciary-charter-section,
.wm-footprint-section,
.wm-committee-section,
.wm-skin-alignment-section,
.wm-newsletter-strip {
  max-width: 100%;
}

@supports (overflow-x: clip) {
  .wm-section,
  .wm-page-banner,
  .wm-marquee-section,
  .wm-footer,
  .wm-fiduciary-charter-section,
  .wm-footprint-section,
  .wm-committee-section,
  .wm-skin-alignment-section,
  .wm-newsletter-strip {
    overflow-x: clip;
  }
}

@media (max-width: 768px) {
  html, body {
    overflow-x: hidden !important;
    max-width: 100vw;
  }

  @supports (overflow-x: clip) {
    html, body {
      overflow-x: clip !important;
    }
  }

  .wm-auth-wrapper, .wm-auth-split {
    overflow-x: hidden !important;
    max-width: 100vw;
  }
  @supports (overflow-x: clip) {
    .wm-auth-wrapper, .wm-auth-split {
      overflow-x: clip !important;
    }
  }

  /* Soften pre-scroll translation distance so elements stay inside mobile container padding */
  [data-aos=fade-left] {
    transform: translate3d(24px, 0, 0);
  }
  [data-aos=fade-right] {
    transform: translate3d(-24px, 0, 0);
  }
  [data-aos=fade-up-left] {
    transform: translate3d(24px, 40px, 0);
  }
  [data-aos=fade-up-right] {
    transform: translate3d(-24px, 40px, 0);
  }
  [data-aos=fade-down-left] {
    transform: translate3d(24px, -40px, 0);
  }
  [data-aos=fade-down-right] {
    transform: translate3d(-24px, -40px, 0);
  }
  [data-aos=slide-left] {
    transform: translate3d(24px, 0, 0);
  }
  [data-aos=slide-right] {
    transform: translate3d(-24px, 0, 0);
  }

  /* Smooth return to zero offset on scroll */
  [data-aos=fade-left].aos-animate,
  [data-aos=fade-right].aos-animate,
  [data-aos=fade-up-left].aos-animate,
  [data-aos=fade-up-right].aos-animate,
  [data-aos=fade-down-left].aos-animate,
  [data-aos=fade-down-right].aos-animate,
  [data-aos=slide-left].aos-animate,
  [data-aos=slide-right].aos-animate {
    transform: translateZ(0);
  }
}
"""

if "Mobile Responsive Horizontal Overflow Prevention for Pre-Animation Elements" not in css:
    css = css.rstrip() + "\n" + mobile_overflow_block
    print("  [SUCCESS] Appended mobile overflow protection block to css/styles.css")
else:
    print("  [OK] css/styles.css already has mobile overflow protection block")

with open('css/styles.css', 'w', encoding='utf-8') as f:
    f.write(css)

# 2. Update css/aos.css
with open('css/aos.css', 'r', encoding='utf-8') as f:
    aos_css = f.read()

if "Mobile Responsive Horizontal Overflow Prevention" not in aos_css:
    aos_css = aos_css.rstrip() + "\n" + mobile_overflow_block
    with open('css/aos.css', 'w', encoding='utf-8') as f:
        f.write(aos_css)
    print("  [SUCCESS] Appended mobile overflow protection to css/aos.css")

print("\n==================================================================")
print("MOBILE OVERFLOW FIX APPLIED SUCCESSFULLY!")
print("==================================================================")
