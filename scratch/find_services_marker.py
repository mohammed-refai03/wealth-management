with open('scratch/services_original.html', 'r', encoding='utf-8') as f:
    text = f.read()

marker = "SECTION 7 of 7"
idx = text.find(marker)
print(f"Marker found: {idx != -1}")
if idx != -1:
    print(text[idx-100:idx+300])
