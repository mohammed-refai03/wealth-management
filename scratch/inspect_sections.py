def inspect_file(filename):
    print(f"\n====================== {filename} ======================")
    with open(filename, 'r', encoding='utf-8') as f:
        content = f.read()

    lines = content.splitlines()
    print(f"Total lines: {len(lines)}, Length: {len(content)}")
    
    # Check section tags and their IDs/classes
    import re
    sections = re.findall(r'<section\b([^>]*)>', content)
    print(f"Total <section> tags: {len(sections)}")
    for i, s in enumerate(sections):
        id_match = re.search(r'id="([^"]+)"', s)
        class_match = re.search(r'class="([^"]+)"', s)
        sid = id_match.group(1) if id_match else 'NO_ID'
        sclass = class_match.group(1) if class_match else 'NO_CLASS'
        print(f"  [{i+1}] id={sid} | class={sclass}")

inspect_file('about.html')
inspect_file('services.html')
