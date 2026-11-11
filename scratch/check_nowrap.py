with open('css/styles.css', 'r', encoding='utf-8') as f:
    lines = f.readlines()

print("=== ALL white-space: nowrap IN styles.css ===")
for i, l in enumerate(lines):
    if 'nowrap' in l:
        print(f"Line {i+1}: {''.join(lines[max(0,i-3):min(len(lines),i+3)]).strip()}")
        print("-" * 30)
