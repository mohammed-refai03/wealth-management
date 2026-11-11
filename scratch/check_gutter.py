with open('css/styles.css', 'r', encoding='utf-8') as f:
    css = f.read()

import re
m = re.findall(r'--wm-gutter[^;]*;', css)
for mm in m:
    print(mm)
