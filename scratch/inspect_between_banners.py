with open('services.html', 'r', encoding='utf-8') as f:
    text = f.read()

print("Between 5881 and 8400:")
print(text[5880:8500])
