with open('css/styles.css', 'r', encoding='utf-8') as f:
    css = f.read()

import re
matches = re.finditer(r'@media\s*\(\s*max-width\s*:\s*768px\s*\)\s*\{', css)
for m in matches:
    start = m.start()
    # find matching brace
    depth = 0
    end = start
    for i in range(start, len(css)):
        if css[i] == '{': depth += 1
        elif css[i] == '}':
            depth -= 1
            if depth == 0:
                end = i + 1
                break
    block = css[start:end]
    print(f"Block at char {start}: length={len(block)}")
    lines = block.splitlines()
    print("  First 5 lines:", lines[:5])
