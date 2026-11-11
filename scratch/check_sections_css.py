with open('css/styles.css', 'r', encoding='utf-8') as f:
    css = f.read()

import re
sections = ['.wm-section', '.wm-page-banner', '.wm-marquee-section', '.wm-footer']
for s in sections:
    m = re.search(re.escape(s) + r'\s*\{[^}]*\}', css)
    if m:
        print(m.group(0)[:150])
