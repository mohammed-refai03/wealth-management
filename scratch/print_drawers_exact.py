files = ['index.html', 'about.html', 'services.html', 'blog.html', 'contact.html']
for f in files:
    with open(f, 'r', encoding='utf-8') as fp:
        c = fp.read()
    start = c.find('wm-mobile-drawer')
    main_start = c.find('<main', start)
    print(f'*** {f} ***')
    print(c[start:main_start])
