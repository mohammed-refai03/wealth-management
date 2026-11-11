import json

transcript_path = r'C:\Users\ELCOT\.gemini\antigravity\brain\dc12136a-5ef0-4e93-9831-4a86ea93fecc\.system_generated\logs\transcript_full.jsonl'

lines_to_check = [1541, 1561, 1863, 1985, 2032, 2069, 2254, 2258, 2325, 2333, 2622, 2687]

with open(transcript_path, 'r', encoding='utf-8') as f:
    for idx, line in enumerate(f):
        if idx + 1 in lines_to_check:
            data = json.loads(line)
            tool_calls = data.get('tool_calls', [])
            for tc in tool_calls:
                name = tc.get('name')
                args = tc.get('args', {})
                p = args.get('Path') or args.get('CommandLine') or ''
                print(f"Line {idx+1}: {name} -> {p[:120]}")
