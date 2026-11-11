import json

transcript_path = r'C:\Users\ELCOT\.gemini\antigravity\brain\dc12136a-5ef0-4e93-9831-4a86ea93fecc\.system_generated\logs\transcript_full.jsonl'

with open(transcript_path, 'r', encoding='utf-8') as f:
    for idx, line in enumerate(f):
        if idx + 1 >= 1565 and idx + 1 <= 1580:
            data = json.loads(line)
            tool_calls = data.get('tool_calls', [])
            c = data.get('content', '')
            if 'PASS' in c or 'Verifying' in c or 'section' in c.lower():
                print(f"Line {idx+1}: {c[:500]}")
