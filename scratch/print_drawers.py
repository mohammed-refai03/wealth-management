import re

files = ['index.html', 'about.html', 'services.html', 'blog.html', 'contact.html']
for f in files:
    with open(f, 'r', encoding='utf-8') as fp:
        c = fp.read()
    start = c.find('wm-mobile-drawer')
    if start != -1:
        # find the end of that drawer div
        # search for next <main or </header or similar
        print(f"=== {f} ===")
        print(c[start-20:start+800])
