import json

with open(r'C:\Users\ELCOT\.gemini\antigravity\brain\dc12136a-5ef0-4e93-9831-4a86ea93fecc\.system_generated\logs\transcript_full.jsonl', 'r', encoding='utf-8') as f:
    for idx, line in enumerate(f):
        if idx+1 == 493:
            data = json.loads(line)
            calls = data.get('tool_calls', [])
            for c in calls:
                content = c.get('args', {}).get('Content', '')
                print(f"Line 493 Content length: {len(content)}")
                # save to scratch/services_original.html
                with open('scratch/services_original.html', 'w', encoding='utf-8') as out:
                    out.write(content)
                print("Saved scratch/services_original.html!")
