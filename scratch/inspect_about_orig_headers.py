with open('scratch/about_original.html', 'r', encoding='utf-8') as f:
    text = f.read()

import re
matches = list(re.finditer(r'<section\b([^>]*)>', text))
for idx, m in enumerate(matches):
    start = m.start()
    end = text.find('</section>', start) + 10
    sec_content = text[start:end]
    id_m = re.search(r'id="([^"]+)"', sec_content)
    cl_m = re.search(r'class="([^"]+)"', sec_content)
    h2_m = re.search(r'<h[12][^>]*>(.*?)</h[12]>', sec_content)
    h2 = h2_m.group(1).strip() if h2_m else 'No H2'
    print(f"[{idx+1}] id={id_m.group(1) if id_m else '-':18} class={cl_m.group(1) if cl_m else '-':30} h2={h2}")
