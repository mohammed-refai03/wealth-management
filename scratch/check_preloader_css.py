with open('css/styles.css', 'r', encoding='utf-8') as f:
    css = f.read()

import re
m = re.search(r'\.wm-preloader\s*\{[^}]*\}', css)
if m:
    print(m.group(0))
