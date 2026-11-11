for f in ['404.html', 'login.html', 'signup.html']:
    print(f"\n====================== {f} ======================")
    with open(f, 'r', encoding='utf-8') as file:
        t = file.read()
    print("Length:", len(t), "Lines:", len(t.splitlines()))
    lines = t.splitlines()
    for l in lines[:30]:
        print(l)
    print("...")
    for l in lines[-25:]:
        print(l)
