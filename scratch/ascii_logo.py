from PIL import Image

im = Image.open('assets/images/logo.webp').convert('RGBA')
# Downscale to 80x20
small = im.resize((100, 25), Image.Resampling.BILINEAR)

for y in range(small.height):
    line = []
    for x in range(small.width):
        r, g, b, a = small.getpixel((x, y))
        if a < 50:
            line.append(' ')
        else:
            line.append('#')
    print(''.join(line))
