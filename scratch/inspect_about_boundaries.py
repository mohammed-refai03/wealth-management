with open('about.html', 'r', encoding='utf-8') as f:
    lines = f.readlines()

print(f"Total lines: {len(lines)}")
# Find </main>
for idx, line in enumerate(lines):
    if '</main>' in line or '<footer' in line:
        print(f"Line {idx+1}: {line.strip()[:80]}")
