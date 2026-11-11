with open('about.html', 'r', encoding='utf-8') as f:
    lines = f.readlines()

for i in range(2150, 2400):
    if i < len(lines):
        line = lines[i]
        if '<section' in line or '</section>' in line or '<footer' in line or '</main>' in line:
            print(f"Line {i+1}: {line.strip()[:80]}")
