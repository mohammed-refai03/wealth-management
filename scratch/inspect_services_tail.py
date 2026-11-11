with open('services.html', 'r', encoding='utf-8') as f:
    text = f.read()

lines = text.splitlines()
print(f"Total lines: {len(lines)}")
print("Last 80 lines of services.html:")
for l in lines[-80:]:
    print(l)
