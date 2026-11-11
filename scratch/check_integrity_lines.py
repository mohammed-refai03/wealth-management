files = ['index.html', 'about.html', 'services.html', 'blog.html', 'contact.html', 'login.html', 'signup.html', '404.html']
for fname in files:
    c = open(fname, encoding='utf-8').read()
    matches = [line for line in c.splitlines() if 'integrity' in line]
    print(f"{fname}: {len(matches)} lines with integrity")
    for m in matches:
        print("  ", m[:100])
