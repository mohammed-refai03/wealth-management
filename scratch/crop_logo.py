from PIL import Image
im = Image.open('assets/images/logo.webp')
# Crop the left part (icon?)
icon_crop = im.crop((60, 0, 420, 350))
icon_crop.save('scratch/logo_icon.png')
# Crop the right part (letters?)
text_crop = im.crop((420, 0, 1151, 350))
text_crop.save('scratch/logo_text.png')
print("Saved icon and text crops.")
