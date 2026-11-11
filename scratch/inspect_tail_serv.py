with open('scratch/services_original.html', 'r', encoding='utf-8') as f:
    text = f.read()

f_idx = text.rfind('</footer>')
print("After </footer> in services_original:")
print(text[f_idx+9:])
