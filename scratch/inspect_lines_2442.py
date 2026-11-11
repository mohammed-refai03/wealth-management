import json

transcript_path = r'C:\Users\ELCOT\.gemini\antigravity\brain\dc12136a-5ef0-4e93-9831-4a86ea93fecc\.system_generated\logs\transcript_full.jsonl'

lines = [2442, 2546, 2582, 2594, 2603, 2607]
with open(transcript_path, 'r', encoding='utf-8') as f:
    for idx, line in enumerate(f):
        if idx + 1 in lines:
            data = json.loads(line)
            tool_calls = data.get('tool_calls', [])
            for tc in tool_calls:
                print(f"Line {idx+1}: {tc.get('name')} {tc.get('args', {}).get('CommandLine', '')[:80]} {tc.get('args', {}).get('Path', '')}")
