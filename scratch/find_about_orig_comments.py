with open('scratch/about_original.html', 'r', encoding='utf-8') as f:
    text = f.read()

import re
comments = re.findall(r'<!--\s*=+\s*\n\s*([^\n=]+)', text)
print("Comments in about_original:")
for c in comments:
    print("  ", c.strip())
