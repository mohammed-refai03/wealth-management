with open('scratch/insert_about_sections.js', 'r', encoding='utf-8') as f:
    text = f.read()

import re
matches = [(m.start(), text[max(0, m.start()-40):min(len(text), m.start()+40)]) for m in re.finditer(r'\$', text)]
print(f"Total $ in insert_about_sections: {len(matches)}")
for pos, snippet in matches:
    print(f"  {pos}: {repr(snippet)}")
