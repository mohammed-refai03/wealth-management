import re

files = ['index.html', 'about.html', 'services.html', 'blog.html', 'contact.html']
for f in files:
    with open(f, 'r', encoding='utf-8') as fp:
        c = fp.read()
    match = re.search(r'(<!--.*?Mobile Drawer.*?-->\s*<div class="wm-mobile-drawer">.*?</div>\s*</div>)', c, re.DOTALL)
    if match:
        print(f"=== {f} ===")
        print(match.group(1))
    else:
        print(f"=== {f}: NO MATCH ===")
