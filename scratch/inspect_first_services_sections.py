with open('services.html', 'r', encoding='utf-8') as f:
    text = f.read()

import re

# Find the first occurrence of </main> or first occurrence of repeated section
# Let's find all <section> tags and their start and end positions
matches = list(re.finditer(r'<section\b([^>]*)>', text))
print(f"Total section matches: {len(matches)}")
for i in range(min(12, len(matches))):
    m = matches[i]
    tag = m.group(0)
    print(f"[{i+1}] pos={m.start()}: {tag[:80]}")
