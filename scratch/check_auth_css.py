with open('css/styles.css', 'r', encoding='utf-8') as f:
    css = f.read()

import re
m = re.search(r'\.wm-auth-wrapper\s*\{[^}]*\}', css)
if m:
    print(m.group(0))

m_split = re.search(r'\.wm-auth-split\s*\{[^}]*\}', css)
if m_split:
    print(m_split.group(0))
