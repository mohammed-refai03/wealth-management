with open('about.html', 'r', encoding='utf-8') as f:
    text = f.read()

import re
secs = list(re.finditer(r'<section\b([\s\S]*?)</section>', text))
for i, s in enumerate(secs):
    stext = s.group(0)
    sid = re.search(r'id="([^"]+)"', stext)
    h2 = re.search(r'<h[12][^>]*>(.*?)</h[12]>', stext)
    aos_c = stext.count('data-aos')
    print(f"[{i+1:2}] id={sid.group(1) if sid else '-':20} | AOS={aos_c:2} | h={h2.group(1)[:30] if h2 else 'No H2'}")
