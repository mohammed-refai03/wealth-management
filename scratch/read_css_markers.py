with open('css/styles.css', 'r', encoding='utf-8') as f:
    lines = f.readlines()

for idx, line in enumerate(lines):
    if idx + 1 >= 6350 and idx + 1 <= 6450:
        if line.strip().startswith('/*'):
            print(f"Line {idx+1}: {line.strip()[:80]}")
    if idx + 1 >= 7300 and idx + 1 <= 7400:
        if line.strip().startswith('/*'):
            print(f"Line {idx+1}: {line.strip()[:80]}")
