for f in ['blog.html', 'contact.html']:
    print(f"\n===== {f} =====")
    with open(f, 'r', encoding='utf-8') as file:
        lines = file.readlines()
    for idx, l in enumerate(lines):
        if '<main' in l or '</main' in l:
            print(f"Line {idx+1}: {l.strip()}")
