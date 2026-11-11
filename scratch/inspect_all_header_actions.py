for f in ['index.html', 'blog.html', 'contact.html']:
    with open(f, 'r', encoding='utf-8') as file:
        t = file.read()
    m = t.find('<div class="wm-header-actions">')
    print(f"=== {f} header actions ===")
    print(t[m:m+600])
