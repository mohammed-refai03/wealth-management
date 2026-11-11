with open('about.html', 'r', encoding='utf-8') as f:
    lines = f.readlines()

for i in range(2245, 2265):
    if i < len(lines):
        print(f"{i+1}: {lines[i]}", end='')
