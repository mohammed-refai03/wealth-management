with open('scratch/services_insert_1500.js', 'r', encoding='utf-8') as f:
    text = f.read()

import re
m = re.search(r'const\s+newSectionsHTML\s*=\s*`([\s\S]*?)`;', text)
if m:
    sec_html = m.group(1)
    links = re.findall(r'<a\b([^>]*)>([\s\S]*?)<\/a>', sec_html)
    print(f"Total <a> tags in newSectionsHTML: {len(links)}")
    for attrs, inner in links:
        print(f"  href in: {attrs[:40]} | inner: {inner.strip()[:30]}")
