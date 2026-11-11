with open('scratch/services_insert_1500.js', 'r', encoding='utf-8') as f:
    text = f.read()

lines = text.splitlines()
print(f"Total lines in services_insert_1500.js: {len(lines)}")
# print first 50 lines and last 50 lines
for l in lines[:30]:
    print(l)
print("...")
for l in lines[-30:]:
    print(l)
