with open('css/styles.css', 'r', encoding='utf-8') as f:
    css = f.read()

import re

selectors = [
    'wm-hero-slider-container',
    'wm-hero-slide',
    'wm-hero-slide-content',
    'wm-slider-pagination',
    'wm-slider-arrow'
]

for s in selectors:
    print(f"=== CSS FOR {s} ===")
    matches = re.findall(rf'(\.{s}[^{{]*\{{[^}}]*\}})', css)
    for m in matches:
        print(m)
        print("-" * 30)

# Also check @media queries containing wm-hero-slider-container or wm-slider-pagination
print("=== MEDIA QUERIES FOR HERO ===")
media_matches = re.findall(r'@media[^{]*\{[^{}]*(?:\{[^{}]*\}[^{}]*)*\}', css)
for m in re.finditer(r'@media[^{]*\{', css):
    start = m.start()
    # find matching brace
    count = 0
    i = start
    while i < len(css):
        if css[i] == '{':
            count += 1
        elif css[i] == '}':
            count -= 1
            if count == 0:
                block = css[start:i+1]
                if 'wm-hero-slider-container' in block or 'wm-slider-pagination' in block or 'wm-hero-slide' in block:
                    print(block[:500] + '...')
                    print("=" * 40)
                break
        i += 1
