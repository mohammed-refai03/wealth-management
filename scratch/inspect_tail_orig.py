with open('scratch/about_original.html', 'r', encoding='utf-8') as f:
    text = f.read()

f_idx = text.rfind('</footer>')
print("After </footer> in about_original:")
print(text[f_idx+9:])
