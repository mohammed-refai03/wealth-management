with open('js/main.js', 'r', encoding='utf-8') as f:
    text = f.read()

import re
lines = text.splitlines()
for idx, l in enumerate(lines[:60]):
    print(f"{idx+1:2}: {l}")
