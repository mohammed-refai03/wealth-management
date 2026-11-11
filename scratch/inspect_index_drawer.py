with open('index.html', 'r', encoding='utf-8') as f:
    text = f.read()

idx1 = text.find('class="wm-mobile-drawer"')
idx2 = text.find('</main>')
if idx1 != -1:
    print(text[idx1-10:idx1+1200])
