with open('blog.html', 'r', encoding='utf-8') as f:
    blg = f.read()

import re
m_blg = re.search(r'<!--\s*Mobile Drawer Menu.*?-->\s*<div class="wm-mobile-drawer">.*?(?=<main)', blg, re.DOTALL)
if m_blg:
    print("=== blog.html drawer block ===")
    print(m_blg.group(0))

with open('contact.html', 'r', encoding='utf-8') as f:
    cnt = f.read()

m_cnt = re.search(r'<!--\s*Mobile Drawer Menu.*?-->\s*<div class="wm-mobile-drawer">.*?(?=<main)', cnt, re.DOTALL)
if m_cnt:
    print("=== contact.html drawer block ===")
    print(m_cnt.group(0))
