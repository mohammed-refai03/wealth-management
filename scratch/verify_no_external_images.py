import re, glob

print("==================================================================")
print("CHECKING FOR ANY REMAINING EXTERNAL IMAGE LINKS")
print("==================================================================")

files = glob.glob('*.html') + ['css/styles.css', 'js/main.js']
files = [f for f in files if 'scratch' not in f]

remaining = []

for fp in sorted(files):
    with open(fp, 'r', encoding='utf-8') as f:
        c = f.read()

    # Search for unsplash or other external image extensions
    matches = re.findall(r'https?://[^\s"\'\)]*unsplash[^\s"\'\)]*', c)
    if matches:
        print(f"  [FOUND] {fp}: {len(matches)} unsplash links")
        for m in matches:
            print(f"    - {m}")
        remaining.extend(matches)

    # Search for other external image URLs ending in jpg/png/webp
    ext_images = re.findall(r'https?://[^\s"\'\)]+\.(?:jpg|jpeg|png|webp|avif|gif)(?:\?[^\s"\'\)]*)?', c)
    if ext_images:
        print(f"  [FOUND] {fp}: {len(ext_images)} other external image links")
        for m in ext_images:
            print(f"    - {m}")
        remaining.extend(ext_images)

print(f"\nTotal remaining external image links: {len(remaining)}")
if len(remaining) == 0:
    print("PERFECT: ZERO external image links remain in the project!")
