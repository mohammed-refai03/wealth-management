with open('scratch/section34_about_styles.css', 'r', encoding='utf-8') as f:
    text = f.read()

start = text.find('Layout 2: Institutional Footprint')
print(text[start:start+1800])
