with open('scratch/insert_about_sections.js', 'r', encoding='utf-8') as f:
    text = f.read()

import re
matches = re.findall(r'const\s+(section[ABCD])\s*=\s*`([\s\S]*?)`;', text)
for var_name, content in matches:
    print(f"Found {var_name}: length = {len(content)}, lines = {len(content.splitlines())}")
