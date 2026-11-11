with open('css/styles.css', 'r', encoding='utf-8') as f:
    lines = f.readlines()

for i, l in enumerate(lines):
    if '.wm-article-meta' in l:
        print(''.join(lines[max(0, i-5):min(len(lines), i+30)]))
        break
