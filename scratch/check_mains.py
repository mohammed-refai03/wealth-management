for f in ['blog.html', 'contact.html', 'index.html']:
    with open(f, 'r', encoding='utf-8') as file:
        t = file.read()
    print(f"{f}: <main> count = {t.count('<main')}, </main> count = {t.count('</main>')}")
