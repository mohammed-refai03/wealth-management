with open('blog.html', 'r', encoding='utf-8') as f:
    blg = f.read()

start = blg.find('Navigating Higher-for-Longer Rates')
print("=== blog.html article ===")
print(blg[start-400:start+800])
