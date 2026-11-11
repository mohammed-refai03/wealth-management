import json

transcript_path = r'C:\Users\ELCOT\.gemini\antigravity\brain\dc12136a-5ef0-4e93-9831-4a86ea93fecc\.system_generated\logs\transcript_full.jsonl'

with open(transcript_path, 'r', encoding='utf-8') as f:
    for idx, line in enumerate(f):
        if idx + 1 in [2685, 2686, 2689, 2690]:
            data = json.loads(line)
            tool_calls = data.get('tool_calls', [])
            content = data.get('content', '')
            print(f"Line {idx+1}: type={data.get('type')}, calls={len(tool_calls)}, content_len={len(content)}")
            if tool_calls:
                for tc in tool_calls:
                    print(f"   tc: {tc.get('name')} {tc.get('args')}")
