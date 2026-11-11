import re

with open('css/styles.css', 'r', encoding='utf-8') as f:
    css = f.read()

print("==================================================================")
print("INSPECTING MOBILE OVERFLOW HAZARDS IN CSS/STYLES.CSS")
print("==================================================================")

# 1. Check html and body overflow
for m in re.finditer(r'(?:html|body)[^{]*\{[^}]*\}', css):
    sel = m.group(0).split('{')[0].strip()
    if any(k in sel.lower() for k in ['html', 'body']) and not any(k in sel.lower() for k in ['.', '#', ':', 'modal', 'drawer', 'card', 'faq', 'chat', 'toast']):
        print(f"SELECTOR: {sel}\n{m.group(0)}\n")

# 2. Check marquee
for m in re.finditer(r'\.wm-marquee[^{]*\{[^}]*\}', css):
    print("MARQUEE:", m.group(0)[:120])

# 3. Check fixed large min-width or width > 320px
large_widths = re.findall(r'([^{}]*\{[^}]*(?:min-width|width)\s*:\s*(?:[4-9]\d{2}|\d{4})px[^}]*\})', css)
print(f"\nRules with fixed width/min-width >= 400px: {len(large_widths)}")
for r in large_widths[:10]:
    sel = r.split('{')[0].strip()
    print("  Large width:", sel)
