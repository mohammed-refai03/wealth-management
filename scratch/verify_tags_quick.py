for fname in ['index.html', 'blog.html', 'contact.html', 'login.html', 'signup.html', '404.html']:
    c = open(fname, encoding='utf-8').read()
    od = c.count('<div')
    cd = c.count('</div')
    os = c.count('<section')
    cs = c.count('</section')
    print(f'{fname:15} | divs: {od} / {cd} | sections: {os} / {cs}')
