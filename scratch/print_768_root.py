with open('css/styles.css', 'r', encoding='utf-8') as f:
    css = f.read()

start = 44328
end = start + 981
print(css[start:end])
