import re

for f in ['blog.html', 'contact.html']:
    with open(f, 'r', encoding='utf-8') as file:
        text = file.read()
    sections = re.findall(r'<section\b([^>]*)>', text)
    print(f"\n{f} total sections: {len(sections)}")
    for idx, s in enumerate(sections):
        id_m = re.search(r'id="([^"]+)"', s)
        cl_m = re.search(r'class="([^"]+)"', s)
        sid = id_m.group(1) if id_m else "-"
        scl = cl_m.group(1) if cl_m else "-"
        print(f"  [{idx+1:2}] id={sid:22} class={scl}")
