with open('css/styles.css', 'r', encoding='utf-8') as f:
    css = f.read()

import re

print("=== CHECKING FOR min-width or width > 300px ===")
matches = re.findall(r'([^{}]*\{[^{}]*(?:min-width|width):\s*(?:3[0-9]{2}|[4-9][0-9]{2}|[0-9]{4,})px[^{}]*\})', css)
for m in matches[:15]:
    # only show selector and rule
    sel = m.split('{')[0].strip()
    rule = [line.strip() for line in m.split('{')[1].split('}') if 'width' in line]
    print(f"{sel} -> {rule}")

print("\n=== CHECKING FOR minmax > 300px ===")
matches2 = re.findall(r'([^{}]*\{[^{}]*minmax\s*\(\s*(?:3[0-9]{2}|[4-9][0-9]{2})px[^{}]*\})', css)
for m in matches2:
    sel = m.split('{')[0].strip()
    rule = [line.strip() for line in m.split('{')[1].split('}') if 'minmax' in line]
    print(f"{sel} -> {rule}")
