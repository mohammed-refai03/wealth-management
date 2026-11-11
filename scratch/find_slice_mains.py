with open('index.html', 'r', encoding='utf-8') as f:
    text = f.read()

sub_main = text[126484:]
end_main = sub_main.find('</main>')
main_body = sub_main[:end_main]

for idx, line in enumerate(main_body.splitlines()):
    if '<main' in line:
        print(f"Line {idx+1}: {line.strip()}")
