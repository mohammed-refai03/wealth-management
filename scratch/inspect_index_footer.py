with open('index.html', 'r', encoding='utf-8') as f:
    text = f.read()

idx1 = text.find('<footer class="wm-footer"')
idx2 = text.find('</footer>')
print("=== index.html footer ===")
print(text[idx1:idx2+9])
