with open('index.html', 'r', encoding='utf-8') as f:
    text = f.read()

sub_main = text[126484:]
end_main = sub_main.find('</main>')
main_body = sub_main[:end_main]

import re
secs = list(re.finditer(r'<section\b([\s\S]*?)</section>', main_body))
for i, s in enumerate(secs):
    stext = s.group(0)
    sid = re.search(r'id="([^"]+)"', stext)
    o = stext.count('<div')
    c = stext.count('</div')
    print(f"[{i+1:2}] id={sid.group(1) if sid else '-':15}: open={o}, close={c}, diff={o-c}")
