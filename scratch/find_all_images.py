import os, re, glob

print("==================================================================")
print("SCANNING FOR ALL LINK-TYPE IMAGES ACROSS THE PROJECT")
print("==================================================================")

extensions = ['.html', '.css', '.js']
image_patterns = [
    r'https?://[^\s"\'\)]+\.(?:jpg|jpeg|png|webp|avif|gif)(?:\?[^\s"\'\)]*)?',
    r'https?://images\.unsplash\.com/[^\s"\'\)]+',
    r'https?://[^\s"\'\)]*(?:photo|image|avatar|img)[^\s"\'\)]*'
]

all_found = {}

for ext in extensions:
    for filepath in glob.glob(f'*{ext}') + glob.glob(f'css/*{ext}') + glob.glob(f'js/*{ext}'):
        # Skip scratch and git
        if 'scratch' in filepath:
            continue
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Look for url(...) or src="..."
        # 1. src="https?://..."
        src_matches = re.findall(r'src=["\'](https?://[^"\']+)["\']', content)
        # 2. url('https?://...') or url("https?://...") or url(https?://...)
        url_matches = re.findall(r'url\([\'"]?(https?://[^\'"\)]+)[\'"]?\)', content)
        # 3. JS array image strings e.g. 'https://images.unsplash...'
        js_matches = re.findall(r'["\'](https?://images\.unsplash\.com/[^"\']+)["\']', content)
        
        combined = list(set(src_matches + url_matches + js_matches))
        if combined:
            all_found[filepath] = combined

print(f"\nFound external images in {len(all_found)} files:")
total_urls = set()
for fp, urls in all_found.items():
    print(f"\nFile: {fp} ({len(urls)} external images):")
    for u in sorted(urls):
        total_urls.add(u)
        print(f"  - {u}")

print(f"\nTotal unique external image URLs: {len(total_urls)}")
