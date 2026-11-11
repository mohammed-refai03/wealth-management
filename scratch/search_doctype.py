import json

transcript_path = r'C:\Users\ELCOT\.gemini\antigravity\brain\dc12136a-5ef0-4e93-9831-4a86ea93fecc\.system_generated\logs\transcript_full.jsonl'

with open(transcript_path, 'r', encoding='utf-8') as f:
    for idx, line in enumerate(f):
        if 'about.html' in line and 'DOCTYPE' in line:
            print(f"Line {idx+1} mentions DOCTYPE and about.html")
        if 'services.html' in line and 'DOCTYPE' in line:
            print(f"Line {idx+1} mentions DOCTYPE and services.html")
