with open('services.html', 'r', encoding='utf-8') as f:
    text = f.read()

idx1 = text.find('<header class="wm-header"')
idx2 = text.find('</header>')
print("=== services.html header ===")
print(text[idx1:idx2+9])

d1 = text.find('<div class="wm-drawer"')
d2 = text.find('<!-- End of Drawer -->')
if d2 == -1:
    d2 = text.find('</main>')
print("=== services.html drawer ===")
print(text[d1:d1+1500])
