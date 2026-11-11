with open('index.html', 'r', encoding='utf-8') as f:
    text = f.read()

import re
matches = list(re.finditer(r'<section\b([^>]*)>', text))
for i, m in enumerate(matches):
    print(f"[{i+1:2}] pos={m.start():6}: {m.group(0)[:70]}")
