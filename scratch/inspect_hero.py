with open('index.html', 'r', encoding='utf-8') as f:
    idx = f.read()

start = idx.find('<section class="wm-hero-slider-container"')
end = idx.find('</section>', start) + len('</section>')
print("=== index.html hero section ===")
print(idx[start:end])
