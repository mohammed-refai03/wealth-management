import json

transcript_path = r'C:\Users\ELCOT\.gemini\antigravity\brain\dc12136a-5ef0-4e93-9831-4a86ea93fecc\.system_generated\logs\transcript_full.jsonl'

with open(transcript_path, 'r', encoding='utf-8') as f:
    for idx, line in enumerate(f):
        if idx + 1 >= 2650 and idx + 1 <= 2820:
            data = json.loads(line)
            tool_calls = data.get('tool_calls', [])
            for tc in tool_calls:
                name = tc.get('name')
                args = tc.get('args', {})
                if name in ['run_command', 'write_file', 'edit_file']:
                    cmd = args.get('CommandLine') or args.get('Path')
                    print(f"Line {idx+1}: {name} -> {str(cmd)[:100]}")
