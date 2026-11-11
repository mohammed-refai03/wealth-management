from PIL import Image, ImageEnhance

im = Image.open('assets/images/logo.webp')
dark_bg_color = (4, 28, 36) # typical wm-dark

# 1. As is
im_as_is = Image.new('RGB', im.size, dark_bg_color)
im_as_is.paste(im, mask=im.split()[3])
im_as_is.resize((300, 89)).save('scratch/footer_logo_asis.png')

# 2. Inverted to white (filter: brightness(0) invert(1))
white_logo = Image.new('RGBA', im.size, (255, 255, 255, 255))
im_white = Image.new('RGB', im.size, dark_bg_color)
im_white.paste(white_logo, mask=im.split()[3])
im_white.resize((300, 89)).save('scratch/footer_logo_white.png')

# 3. Brightened/Lighter green (e.g. filter: brightness(1.8) saturate(1.2))
# Or brightness(2.2)
enhancer = ImageEnhance.Brightness(im)
im_bright = enhancer.enhance(2.2)
im_bright_bg = Image.new('RGB', im.size, dark_bg_color)
im_bright_bg.paste(im_bright, mask=im.split()[3])
im_bright_bg.resize((300, 89)).save('scratch/footer_logo_bright.png')

print("Generated comparison images.")
