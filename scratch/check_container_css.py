with open('css/styles.css', 'r', encoding='utf-8') as f:
    css = f.read()

import re
m = re.search(r'\.wm-container\s*\{[^}]*\}', css)
if m:
    print(m.group(0))

m_media = re.findall(r'@media[^{]*\{[^{}]*\.wm-container\s*\{[^}]*\}', css)
for mm in m_media:
    print(mm)
