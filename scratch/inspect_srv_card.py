with open('services.html', 'r', encoding='utf-8') as f:
    srv = f.read()

start = srv.find('Discretionary Portfolio Management')
print("=== services.html card ===")
print(srv[start-300:start+700])
