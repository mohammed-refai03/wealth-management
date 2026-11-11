with open('about.html', 'r', encoding='utf-8') as f:
    text = f.read()

pos = 15791
print("Before 15791:")
print(text[pos-400:pos])
print("After 15791:")
print(text[pos:pos+400])
