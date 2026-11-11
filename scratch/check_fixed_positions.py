import re

with open('css/styles.css', 'r', encoding='utf-8') as f:
    lines = f.readlines()

print("=== ALL position: fixed IN styles.css ===")
for i, l in enumerate(lines):
    if 'position: fixed' in l or 'position:fixed' in l:
        start = max(0, i-4)
        end = min(len(lines), i+10)
        print(f"--- Line {i+1} ---")
        print(''.join(lines[start:end]))
