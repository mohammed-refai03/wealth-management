import json

transcript_path = r'C:\Users\ELCOT\.gemini\antigravity\brain\dc12136a-5ef0-4e93-9831-4a86ea93fecc\.system_generated\logs\transcript_full.jsonl'
with open(transcript_path, 'r', encoding='utf-8') as f:
    for idx, line in enumerate(f):
        if ('services.html' in line or 'about.html' in line) and ('write_file' in line or 'edit_file' in line):
            try:
                data = json.loads(line)
                calls = data.get('tool_calls', [])
                for c in calls:
                    args = c.get('args', {})
                    p = args.get('Path', '')
                    if 'services.html' in p or 'about.html' in p:
                        print(f"Line {idx+1}: {c.get('name')} {p} Content={len(args.get('Content', ''))} Repl={len(args.get('Replacement', ''))}")
            except Exception as e:
                pass
