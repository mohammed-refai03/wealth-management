with open('scratch/services_insert_1500.js', 'r', encoding='utf-8') as f:
    text = f.read()

print('booking in services_insert_1500:', 'booking' in text)
idx = text.find('case-studies')
print(text[idx+500:idx+2500])
