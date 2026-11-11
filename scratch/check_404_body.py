with open('404.html', 'r', encoding='utf-8') as f:
    c = f.read()

import re
m = re.findall(r'body[^{]*\{[^}]*\}', c)
for mm in m:
    print(mm)
