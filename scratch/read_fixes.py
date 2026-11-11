for script_name in [
    r'C:\Users\ELCOT\.gemini\antigravity\brain\dc12136a-5ef0-4e93-9831-4a86ea93fecc\scratch\apply_footprint_fix.js',
    r'C:\Users\ELCOT\.gemini\antigravity\brain\dc12136a-5ef0-4e93-9831-4a86ea93fecc\scratch\update_about_grid.js'
]:
    print(f"\n================= {script_name} =================")
    try:
        with open(script_name, 'r', encoding='utf-8') as f:
            print(f.read()[:2000])
    except Exception as e:
        print(e)
