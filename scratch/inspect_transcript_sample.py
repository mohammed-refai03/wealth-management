import json

with open(r'C:\Users\ELCOT\.gemini\antigravity\brain\dc12136a-5ef0-4e93-9831-4a86ea93fecc\.system_generated\logs\transcript_full.jsonl', 'r', encoding='utf-8') as f:
    for idx in range(10):
        line = f.readline()
        data = json.loads(line)
        print(f"Line {idx+1} keys:", list(data.keys()))
        if 'tool_calls' in data:
            print("  tool_calls sample:", str(data['tool_calls'])[:100])
