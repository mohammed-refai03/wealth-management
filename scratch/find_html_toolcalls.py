import json

with open(r'C:\Users\ELCOT\.gemini\antigravity\brain\dc12136a-5ef0-4e93-9831-4a86ea93fecc\.system_generated\logs\transcript_full.jsonl', 'r', encoding='utf-8') as f:
    for idx, line in enumerate(f):
        data = json.loads(line)
        calls = data.get('tool_calls', [])
        for c in calls:
            name = c.get('name', '')
            args = c.get('args', {})
            path = args.get('Path', '')
            if 'about.html' in path or 'services.html' in path:
                print(f"Line {idx+1}: {name} -> {path} (StartLine={args.get('StartLine')}, EndLine={args.get('EndLine')})")
