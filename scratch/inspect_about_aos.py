with open('about.html', 'r', encoding='utf-8') as f:
    c = f.read()

import re
print("about.html scripts:")
for m in re.finditer(r'<script[^>]*>.*?</script>|<script[^>]*>', c, re.DOTALL):
    s = m.group(0).strip()
    if 'aos' in s.lower() or 'main.js' in s.lower():
        print(s[:150])

print("\nabout.html links:")
for m in re.finditer(r'<link[^>]*>', c):
    s = m.group(0).strip()
    if 'aos' in s.lower():
        print(s)
