with open('css/styles.css', 'r', encoding='utf-8') as f:
    css = f.read()

import re
m = re.search(r'\.wm-404-page\s*\{[^}]*\}', css)
if m:
    print(m.group(0))

m_main = re.search(r'\.wm-404-main\s*\{[^}]*\}', css)
if m_main:
    print(m_main.group(0))
