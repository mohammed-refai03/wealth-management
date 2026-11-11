import os, glob

for f in glob.glob('*.html'):
    with open(f, 'r', encoding='utf-8') as fp:
        c = fp.read()
    if 'wm-mobile-drawer' in c:
        print(f"Has drawer: {f}")
    else:
        print(f"No drawer: {f}")
