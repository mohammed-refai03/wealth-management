from PIL import Image, ImageEnhance

im = Image.open('assets/images/logo.webp')
dark_bg = (6, 35, 53) # #062335

for factor in [1.0, 1.5, 2.0, 2.5]:
    enh = ImageEnhance.Brightness(im).enhance(factor)
    bg = Image.new('RGB', im.size, dark_bg)
    bg.paste(enh, mask=im.split()[3])
    # check pixel value of the logo text
    pix = enh.getpixel((600, 180)) # approximate middle of text
    print(f"Factor {factor}: middle pixel = {pix}")
