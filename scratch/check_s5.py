with open('about.html', 'r', encoding='utf-8') as f:
    text = f.read()

import re
sections = list(re.finditer(r'<section\b([\s\S]*?)</section>', text))
s5 = sections[4].group(0)
print("=== Section 5 ===")
print(s5[:300])
