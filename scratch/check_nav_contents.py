with open('about.html', 'r', encoding='utf-8') as f:
    text = f.read()

idx1 = text.find('<nav class="wm-nav">')
idx2 = text.find('</nav>', idx1)
print("=== about.html nav ===")
print(text[idx1:idx2+6])

with open('services.html', 'r', encoding='utf-8') as f:
    stext = f.read()

sidx1 = stext.find('<nav class="wm-nav">')
sidx2 = stext.find('</nav>', sidx1)
print("=== services.html nav ===")
print(stext[sidx1:sidx2+6])
