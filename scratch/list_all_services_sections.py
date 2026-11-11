import re

with open('services.html', 'r', encoding='utf-8') as f:
    text = f.read()

sections = re.findall(r'<section\b([\s\S]*?)</section>', text)
print(f"Total sections found: {len(sections)}")
for idx, s in enumerate(sections):
    id_m = re.search(r'id="([^"]+)"', s)
    cl_m = re.search(r'class="([^"]+)"', s)
    h_m = re.search(r'<h[1-3][^>]*>(.*?)</h[1-3]>', s)
    sid = id_m.group(1) if id_m else '-'
    scl = cl_m.group(1) if cl_m else '-'
    sh = h_m.group(1).strip() if h_m else '-'
    print(f"[{idx+1:2}] id={sid:22} class={scl:35} h={sh[:45]}")
