with open('css/styles.css', 'r', encoding='utf-8') as f:
    lines = f.readlines()

for i, l in enumerate(lines):
    if 'wm-mobile-drawer' in l:
        print(f"Line {i+1}: {l.strip()}")
