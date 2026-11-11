with open('about.html', 'r', encoding='utf-8') as f:
    abt = f.read()

start = abt.find('We hold zero proprietary inventory')
print("=== about.html fiduciary section ===")
print(abt[start-400:start+800])
