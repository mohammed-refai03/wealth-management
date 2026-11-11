with open('services.html', 'rb') as f:
    c = f.read()
print("services.html CRLF:", b'\r\n' in c)
