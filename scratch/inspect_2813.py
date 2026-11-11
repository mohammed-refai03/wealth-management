import json

transcript_path = r'C:\Users\ELCOT\.gemini\antigravity\brain\dc12136a-5ef0-4e93-9831-4a86ea93fecc\.system_generated\logs\transcript_full.jsonl'

with open(transcript_path, 'r', encoding='utf-8') as f:
    for idx, line in enumerate(f):
        if idx + 1 in [2806, 2813]:
            data = json.loads(line)
            content = data.get('content', '')
            print(f"=== Line {idx+1} (output len {len(content)}) ===")
            print(content[:1500])
