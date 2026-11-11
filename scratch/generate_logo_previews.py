from PIL import Image
# Let's render logo on white (255,255,255) and on dark navy (5, 27, 44)
im = Image.open('assets/images/logo.webp')
white_bg = Image.new('RGB', im.size, (255, 255, 255))
white_bg.paste(im, mask=im.split()[3])
white_bg.save('scratch/logo_preview_white.png')

dark_bg = Image.new('RGB', im.size, (5, 27, 44))
dark_bg.paste(im, mask=im.split()[3])
dark_bg.save('scratch/logo_preview_dark.png')

print("Saved preview images.")
