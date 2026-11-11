with open('index.html', 'r', encoding='utf-8') as f:
    c = f.read()

import re
pos = c.find('wm-mobile-drawer')
print(c[pos-50:pos+800])
