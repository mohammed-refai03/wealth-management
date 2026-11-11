import re, glob

files = glob.glob('*.html') + glob.glob('css/*.css') + glob.glob('js/*.js')
files = [f for f in files if 'scratch' not in f]

for fp in files:
    with open(fp, 'r', encoding='utf-8') as f:
        c = f.read()

    # find any url ending in an image extension or containing image keywords
    urls = re.findall(r'https?://[^\s"\'\)]+', c)
    for u in set(urls):
        if 'unsplash.com' in u: continue
        if any(u.lower().endswith(ext) or ext + '?' in u.lower() for ext in ['.png', '.jpg', '.jpeg', '.gif', '.webp', '.svg', '.ico', '.avif']):
            print(f"{fp}: {u}")
        elif any(k in u.lower() for k in ['image', 'photo', 'avatar', 'logo', 'icon', 'img', 'asset']):
            print(f"{fp} (keyword): {u}")
