for f in ['scratch/about_original.html', 'scratch/services_original.html']:
    with open(f, 'r', encoding='utf-8') as fp:
        c = fp.read()
    start = c.find('wm-mobile-drawer')
    print(f"=== {f} ===")
    print(c[start:start+600])
