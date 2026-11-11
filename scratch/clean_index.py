with open('index.html', 'r', encoding='utf-8') as f:
    text = f.read()

import re

# 1. Header & before:
main_start = text.find('<main>')
header_part = text[:main_start]

# 2. Extract clean 10 sections from slice
sub_main = text[126484:]
end_main = sub_main.find('</main>')
raw_main = sub_main[:end_main]

# Fix the two corrupted <main> tags in FAQ text:
raw_main = raw_main.replace('<main>,000,000', '$1,000,000')
raw_main = raw_main.replace('<main>0,000,000', '$10,000,000')

# Extract exact 10 sections
sections = list(re.finditer(r'<section\b([\s\S]*?)</section>', raw_main))
clean_sections = [s.group(0) for s in sections]
print(f"Extracted {len(clean_sections)} clean sections")

clean_main = "<main>\n    " + "\n\n    ".join(clean_sections) + "\n  </main>"

# 3. Footer & after:
foot_idx = text.rfind('<footer class="wm-footer">')
footer_part = text[foot_idx:]

clean_index = header_part + clean_main + '\n\n  ' + footer_part

# Verify tag balances
for t in ['div', 'section', 'main', 'header', 'footer']:
    o = clean_index.count(f'<{t}')
    c = clean_index.count(f'</{t}>')
    print(f"Tag <{t}>: open={o}, close={c}")

with open('index.html', 'w', encoding='utf-8') as out:
    out.write(clean_index)

print(f"index.html saved! Length: {len(clean_index)}, Lines: {len(clean_index.splitlines())}")
