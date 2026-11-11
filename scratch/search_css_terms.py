with open('css/styles.css', 'r', encoding='utf-8') as f:
    css = f.read()

import re
matches = re.findall(r'/\* ==+ (.*?) ==+ \*/', css)
print("Sections:")
for m in matches:
    if any(k in m.lower() for k in ['tier', 'bento', 'custody', 'study', 'case', 'layout', 'service']):
        print(f"  {m}")

# Search for any selector with bento or tier
bento_sels = [line.strip() for line in css.splitlines() if 'bento' in line.lower() or 'service-tier' in line.lower() or 'custody-vault' in line.lower()]
print("\nSelectors with bento/tier/custody (first 10):")
for s in bento_sels[:15]:
    print(f"  {s}")
