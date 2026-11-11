with open('index.html', 'r', encoding='utf-8') as f:
    text = f.read()

sub_main = text[126484:]
end_main = sub_main.find('</main>')
main_body = sub_main[:end_main]

print("<main in slice:", main_body.count('<main'))
print("</main in slice:", main_body.count('</main'))
print("div open/close:", main_body.count('<div'), main_body.count('</div'))
