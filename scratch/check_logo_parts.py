from PIL import Image
im = Image.open('assets/images/logo.webp')
# Check left vs right colors
left_crop = im.crop((0, 0, 400, 356))
right_crop = im.crop((400, 0, 1200, 356))

def get_dom_colors(img):
    cols = img.getcolors(maxcolors=100000)
    visible = [c for c in cols if c[1][3] > 50]
    return sorted(visible, key=lambda x: x[0], reverse=True)[:5]

print("Left crop visible colors:", get_dom_colors(left_crop))
print("Right crop visible colors:", get_dom_colors(right_crop))
