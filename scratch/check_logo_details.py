from PIL import Image
# Check if logo has text and icon
im = Image.open('assets/images/logo.webp')
print("Image size:", im.size)
# Let's see non-zero alpha bounding box
print("Alpha bbox:", im.getchannel('A').getbbox())
