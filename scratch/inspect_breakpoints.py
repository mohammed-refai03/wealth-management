with open('css/styles.css', 'r', encoding='utf-8') as f:
    css = f.read()

import re

for bp in ['420px', '375px', '320px']:
    print(f"=== BREAKPOINT {bp} ===")
    matches = re.findall(rf'@media[^{{]*{bp}[^{{]*\{{[^{{}}]*(?:\{{[^{{}}]*\}}[^{{}}]*)*\}}', css)
    for m in matches:
        print(m[:800])
        print("=" * 40)
