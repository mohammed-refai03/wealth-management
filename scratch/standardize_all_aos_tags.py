import re

files = ['index.html', 'about.html', 'services.html', 'blog.html', 'contact.html', 'login.html', 'signup.html', '404.html']

CLEAN_HEAD = """  <!-- AOS (Animate On Scroll) Library - CDNJS & Local Fallback -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/aos/2.3.4/aos.css">
  <link rel="stylesheet" href="css/aos.css">"""

CLEAN_BODY_MAIN = """  <!-- AOS (Animate On Scroll) JS - CDNJS & Local Fallback -->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/aos/2.3.4/aos.js"></script>
  <script src="js/aos.js"></script>
  <!-- Interaction Script -->
  <script src="js/main.js"></script>"""

CLEAN_BODY_404 = """  <!-- AOS (Animate On Scroll) JS - CDNJS & Local Fallback -->
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

for fname in files:
    with open(fname, 'r', encoding='utf-8') as f:
        c = f.read()

    # 1. Clean head: remove any existing aos link tags and comments
    c = re.sub(r'(\s*<!--[^\n]*AOS[^\n]*-->)?\s*<link[^>]*href="[^"]*aos[^"]*"[^>]*>', '', c, flags=re.IGNORECASE)
    # Insert clean head right before </head>
    c = c.replace('</head>', CLEAN_HEAD + '\n</head>')

    # 2. Clean scripts
    if fname == '404.html':
        c = re.sub(r'(\s*<!--[^\n]*AOS[^\n]*-->)?\s*<script[^>]*src="[^"]*aos[^"]*"[^>]*>.*?</script>|<script[^>]*src="[^"]*aos[^"]*"[^>]*>', '', c, flags=re.IGNORECASE | re.DOTALL)
        # remove any startAOS404 inline script
        c = re.sub(r'<script>\s*function startAOS404[\s\S]*?</script>', '', c)
        c = c.replace('</body>', CLEAN_BODY_404 + '\n</body>')
    else:
        # Remove any existing aos script tags
        c = re.sub(r'(\s*<!--[^\n]*AOS[^\n]*-->)?\s*<script[^>]*src="[^"]*aos[^"]*"[^>]*>.*?</script>|<script[^>]*src="[^"]*aos[^"]*"[^>]*>', '', c, flags=re.IGNORECASE | re.DOTALL)
        # remove trailing inline AOS.init if any
        c = re.sub(r'<script>\s*if\s*\(\s*typeof AOS !== [\'"]undefined[\'"]\s*\)\s*\{\s*AOS\.init[\s\S]*?\}\s*</script>', '', c)
        
        # Replace <script src="js/main.js"></script> and its comment
        c = re.sub(r'(\s*<!--[^\n]*Interaction Script[^\n]*-->)?\s*<script src="js/main\.js"></script>', '\n' + CLEAN_BODY_MAIN, c)

    with open(fname, 'w', encoding='utf-8') as f:
        f.write(c)

    print(f"Standardized {fname}")
