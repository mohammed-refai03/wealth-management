with open('scratch/about_original.html', 'r', encoding='utf-8') as f:
    text = f.read()

idx1 = text.find('1. Top Announcement Pre-Header Bar')
idx2 = text.find('2. Global Navbar')
print(text[idx1-20:idx2])
