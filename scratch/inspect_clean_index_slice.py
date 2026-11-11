with open('index.html', 'r', encoding='utf-8') as f:
    text = f.read()

# Let's check from 126484 to the end of <main>
sub_main = text[126484:]
end_main = sub_main.find('</main>')
main_body = sub_main[:end_main]

import re
secs = re.findall(r'<section\b([^>]*)>', main_body)
print(f"Total sections in slice: {len(secs)}")
for i, s in enumerate(secs):
    sid = re.search(r'id="([^"]+)"', s)
    scl = re.search(r'class="([^"]+)"', s)
    print(f"  [{i+1:2}] id={sid.group(1) if sid else '-':15} class={scl.group(1) if scl else '-'}")
