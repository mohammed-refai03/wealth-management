with open(r'C:\Users\ELCOT\.gemini\antigravity\brain\dc12136a-5ef0-4e93-9831-4a86ea93fecc\.system_generated\tasks\task-2679.log', 'r', encoding='utf-8') as f:
    text = f.read()

parts = text.split('FILE: ')
for p in parts:
    if p.startswith('about.html') or p.startswith('services.html'):
        lines = p.splitlines()
        print(f"\n===== FILE: {lines[0]} =====")
        for l in lines[1:]:
            if l.strip():
                print(l)
