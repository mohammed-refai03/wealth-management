with open('css/styles.css', 'r', encoding='utf-8') as f:
    css = f.read()

import re
matches = re.finditer(r'\.wm-mobile-drawer[^{]*\{[^}]*\}', css)
for m in matches:
    print(m.group(0))

print("\nDrawer links:")
matches_links = re.finditer(r'\.wm-drawer[^{]*\{[^}]*\}', css)
for m in matches_links:
    print(m.group(0))
