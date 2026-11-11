from PIL import Image
im = Image.open('assets/images/logo.webp')
bbox = im.getbbox()
print("BBox:", bbox)
# Sample non-transparent pixels
colors = im.getcolors(maxcolors=100000)
# Sort by count descending
sorted_colors = sorted([c for c in colors if c[1][3] > 10], key=lambda x: x[0], reverse=True)
print("Top 10 visible colors:")
for count, col in sorted_colors[:10]:
    print(f"  Count: {count}, RGBA: {col}")
