from PIL import Image
im = Image.open('assets/images/logo.webp')
cols = im.getcolors(maxcolors=100000)
visible = [c for c in cols if c[1][3] > 50]
all_unique = set(c[1] for c in visible)
print("Total distinct visible colors:", len(all_unique))
# Group by approximate brightness
bright = [c for c in visible if sum(c[1][:3])/3 > 150]
dark = [c for c in visible if sum(c[1][:3])/3 < 100]
print("Bright colors count:", sum(c[0] for c in bright))
print("Dark colors count:", sum(c[0] for c in dark))
if bright:
    print("Sample bright colors:", sorted(bright, key=lambda x: x[0], reverse=True)[:5])
