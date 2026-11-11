with open('scratch/services_insert_1500.js', 'r', encoding='utf-8') as f:
    text = f.read()

import re
sections = re.findall(r'<!-- =+[\r\n\s]+SECTION\s+([^=\r\n]+)[\r\n\s]+=+', text)
print("Sections in services_insert_1500.js:")
for s in sections:
    print(f"  {s}")

section_tags = re.findall(r'<section\b([^>]*)>', text)
print("\nSection tags in services_insert_1500.js:")
for st in section_tags:
    print(f"  {st}")
