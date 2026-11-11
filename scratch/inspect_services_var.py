with open('scratch/services_insert_1500.js', 'r', encoding='utf-8') as f:
    text = f.read()

import re
m = re.search(r'const\s+newSectionsHTML\s*=\s*`([\s\S]*?)`;', text)
if m:
    print(f"Found newSectionsHTML: length = {len(m.group(1))}, lines = {len(m.group(1).splitlines())}")
else:
    print("newSectionsHTML not found")
