import glob

files = glob.glob('*.html')
for fp in sorted(files):
    c = open(fp, encoding='utf-8').read()
    if 'wm-mobile-drawer' in c:
        print(f"Has drawer: {fp}")
