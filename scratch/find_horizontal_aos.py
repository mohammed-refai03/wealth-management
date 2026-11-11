import re, glob

files = glob.glob('*.html')
files = [f for f in files if 'scratch' not in f]

for fp in sorted(files):
    with open(fp, 'r', encoding='utf-8') as f:
        lines = f.readlines()
        
    print(f"\n==================== {fp} ====================")
    for idx, line in enumerate(lines):
        if any(k in line for k in ['fade-left', 'fade-right', 'slide-left', 'slide-right']):
            print(f"  Line {idx+1}: {line.strip()[:90]}")
