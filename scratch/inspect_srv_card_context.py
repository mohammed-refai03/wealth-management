with open('services.html', 'r', encoding='utf-8') as f:
    lines = f.readlines()

for i, l in enumerate(lines):
    if 'Discretionary Portfolio Management' in l:
        print(''.join(lines[max(0, i-25):min(len(lines), i+30)]))
        break
