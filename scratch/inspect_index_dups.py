import re

with open('index.html', 'r', encoding='utf-8') as f:
    text = f.read()

# Let's inspect the sections of index.html
sections = list(re.finditer(r'<section\b([\s\S]*?)</section>', text))
print(f"Total sections: {len(sections)}")
for i, s in enumerate(sections):
    sid = re.search(r'id="([^"]+)"', s.group(0))
    scl = re.search(r'class="([^"]+)"', s.group(0))
    print(f"[{i+1:2}] id={sid.group(1) if sid else '-':15} class={scl.group(1) if scl else '-'}")
