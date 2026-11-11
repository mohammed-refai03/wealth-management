with open('services.html', 'r', encoding='utf-8') as f:
    srv = f.read()

start = srv.find('Advisory Capability & Governance')
print("=== services.html comparison table ===")
print(srv[start-300:start+1200])
