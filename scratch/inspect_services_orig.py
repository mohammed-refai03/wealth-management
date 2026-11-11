import re

with open('scratch/services_original.html', 'r', encoding='utf-8') as f:
    text = f.read()

print(f"services_original.html length: {len(text)}")
sections = re.findall(r'<section\b([^>]*)>', text)
print(f"Total sections: {len(sections)}")
for idx, s in enumerate(sections):
    id_m = re.search(r'id="([^"]+)"', s)
    cl_m = re.search(r'class="([^"]+)"', s)
    print(f"  [{idx+1}] id={id_m.group(1) if id_m else 'NO_ID'} class={cl_m.group(1) if cl_m else 'NO_CLASS'}")
