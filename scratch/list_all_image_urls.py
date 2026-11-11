import os, re, glob

image_urls = set()

for ext in ['.html', '.css', '.js']:
    for fp in glob.glob(f'*{ext}') + glob.glob(f'css/*{ext}') + glob.glob(f'js/*{ext}'):
        if 'scratch' in fp: continue
        with open(fp, 'r', encoding='utf-8') as f:
            c = f.read()
        
        # Matches all unsplash photo URLs or any other image extensions
        matches = re.findall(r'https://images\.unsplash\.com/photo-[a-zA-Z0-9\-\?=&]+', c)
        for m in matches:
            # clean trailing quotes, parens, semicolons
            clean = m.rstrip('"\');,')
            image_urls.add(clean)

        # Also check any other http/https ending in png/jpg/jpeg/webp
        other_matches = re.findall(r'https?://[^\s"\'\)]+\.(?:png|jpg|jpeg|webp)(?:\?[^\s"\'\)]*)?', c)
        for m in other_matches:
            clean = m.rstrip('"\');,')
            image_urls.add(clean)

print(f"Total unique image URLs found: {len(image_urls)}")
for u in sorted(image_urls):
    # Extract the photo ID if unsplash
    m_id = re.search(r'photo-([a-zA-Z0-9\-]+)', u)
    pid = m_id.group(1) if m_id else 'other'
    print(f"ID: {pid:25} | URL: {u}")
