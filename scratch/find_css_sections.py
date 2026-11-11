with open('css/styles.css', 'r', encoding='utf-8') as f:
    lines = f.readlines()

print(f"Total CSS lines: {len(lines)}")
# Find all comment banners
for idx, line in enumerate(lines):
    if line.strip().startswith('/*') and ('SECTION' in line.upper() or 'ABOUT' in line.upper() or 'SERVICE' in line.upper() or 'BANNER' in line.upper()):
        print(f"Line {idx+1}: {line.strip()[:80]}")
