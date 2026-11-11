import re

for f in ['index.html', 'blog.html', 'contact.html', '404.html', 'login.html', 'signup.html']:
    with open(f, 'r', encoding='utf-8') as file:
        content = file.read()
    secs = re.findall(r'<section\b([^>]*)>', content)
    print(f"\n{f}: {len(secs)} sections")
    for idx, s in enumerate(secs):
        id_m = re.search(r'id="([^"]+)"', s)
        cl_m = re.search(r'class="([^"]+)"', s)
        sid = id_m.group(1) if id_m else "-"
        scl = cl_m.group(1) if cl_m else "-"
        print(f"   [{idx+1}] id={sid:25} class={scl}")
