import json

with open(r'C:\Users\ELCOT\.gemini\antigravity\brain\dc12136a-5ef0-4e93-9831-4a86ea93fecc\.system_generated\logs\transcript_full.jsonl', 'r', encoding='utf-8') as f:
    for idx, line in enumerate(f):
        if 2680 <= idx+1 <= 2725:
            data = json.loads(line)
            calls = data.get('tool_calls', [])
            for c in calls:
                print(f"Line {idx+1}: {c.get('name')} -> {c.get('args', {}).get('CommandLine') or c.get('args', {}).get('Path')}")
