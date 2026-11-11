import difflib

with open('scratch/services_update_1498.js', 'r', encoding='utf-8') as f:
    l1498 = f.readlines()
with open('scratch/services_insert_1500.js', 'r', encoding='utf-8') as f:
    l1500 = f.readlines()

diff = list(difflib.unified_diff(l1498, l1500, fromfile='1498', tofile='1500'))
for d in diff[:30]:
    print(d, end='')
