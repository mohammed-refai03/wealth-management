with open('scratch/services_update_1498.js', 'r', encoding='utf-8') as f:
    t1498 = f.read()
with open('scratch/services_insert_1500.js', 'r', encoding='utf-8') as f:
    t1500 = f.read()

print("1498 length:", len(t1498))
print("1500 length:", len(t1500))
print("Are they identical?", t1498 == t1500)
