with open('css/styles.css', 'r', encoding='utf-8') as f:
    css = f.read()

import re
vw_matches = re.findall(r'[^{}]*\{[^}]*100vw[^}]*\}', css)
print("100vw matches:")
for m in vw_matches:
    print(" ", m.split('{')[0].strip())

neg_margin_matches = re.findall(r'[^{}]*\{[^}]*margin(?:-left|-right)?\s*:\s*-[^;}]*\}', css)
print("\nNegative margin matches:")
for m in neg_margin_matches[:10]:
    print(" ", m.split('{')[0].strip())
