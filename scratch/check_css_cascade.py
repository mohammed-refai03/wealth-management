import re

with open('css/styles.css', 'r', encoding='utf-8') as f:
    lines = f.readlines()

keywords = [
    'wm-hero-slider-container', 'wm-hero-slide', 'wm-slider-pagination',
    'wm-back-to-top', 'wm-charter-', 'wm-services-grid', 'wm-service-card',
    'wm-compare-', 'wm-featured-editorial', 'wm-featured-visual', 'wm-featured-content',
    'wm-featured-title', 'wm-article-meta', 'wm-tag', 'overflow-x'
]

for kw in keywords:
    hits = [i+1 for i, l in enumerate(lines) if kw in l]
    print(f"{kw}: lines {hits}")

print(f"\nTotal lines in styles.css: {len(lines)}")
print("Last 120 lines of styles.css:")
print(''.join(f"{i+1}: {lines[i]}" for i in range(max(0, len(lines)-120), len(lines))))
