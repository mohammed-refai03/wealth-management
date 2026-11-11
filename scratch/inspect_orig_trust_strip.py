with open('scratch/services_original.html', 'r', encoding='utf-8') as f:
    text = f.read()

idx = text.find('wm-banner-trust-strip')
print(text[idx:idx+1000])
