for script_name in ['scratch/insert_about_sections.js', 'scratch/insert_remaining_sections.js']:
    print(f"\n================= {script_name} =================")
    with open(script_name, 'r', encoding='utf-8') as f:
        text = f.read()
    lines = text.splitlines()
    print(f"Lines: {len(lines)}")
    for l in lines[:25]:
        print(l)
    print("...")
    for l in lines[-25:]:
        print(l)
