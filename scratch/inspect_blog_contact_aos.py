for f in ['blog.html', 'contact.html']:
    with open(f, 'r', encoding='utf-8') as file:
        text = file.read()
    import re
    secs = list(re.finditer(r'<section\b([\s\S]*?)</section>', text))
    print(f"\nTotal sections in {f}: {len(secs)}")
    for i, s in enumerate(secs):
        stext = s.group(0)
        sid = re.search(r'id="([^"]+)"', stext)
        sid_str = sid.group(1) if sid else '-'
        aos_items = re.findall(r'<[a-zA-Z0-9]+[^>]*\bdata-aos="([^"]+)"[^>]*>', stext)
        print(f"[{i+1:2}] Section id={sid_str:20} | AOS elements: {len(aos_items):2} -> {', '.join(aos_items[:5])}")
