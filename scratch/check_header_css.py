with open('css/styles.css', 'r', encoding='utf-8') as f:
    css = f.read()

import re
m = re.search(r'\.wm-header\s*\{[^}]*\}', css)
if m:
    print(m.group(0))

m_scrolled = re.search(r'\.wm-header\.is-scrolled\s*\{[^}]*\}', css)
if m_scrolled:
    print(m_scrolled.group(0))
