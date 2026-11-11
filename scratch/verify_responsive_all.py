import os, re, shutil, importlib.util

# 1. CSS Brace Balance & Syntax Check
with open('css/styles.css', 'r', encoding='utf-8') as f:
    css = f.read()

open_b = css.count('{')
close_b = css.count('}')
print(f"CSS Brace Balance: {{ = {open_b}, }} = {close_b}, Diff = {open_b - close_b}")
assert open_b == close_b, "UNBALANCED BRACES IN styles.css!"

# 2. Check HTML cache-buster & services.html inline style removal
for fn in ['index.html', 'about.html', 'services.html', 'blog.html', 'contact.html']:
    with open(fn, 'r', encoding='utf-8') as f:
        c = f.read()
    m = re.search(r'css/styles\.css[^"\']*', c)
    print(f"{fn:15s} | CSS link: {m.group(0) if m else 'MISSING'}")

with open('services.html', 'r', encoding='utf-8') as f:
    srv = f.read()
assert 'minmax(320px, 1fr)' not in srv, "services.html still has inline minmax(320px, 1fr)!"
print("services.html inline minmax(320px, 1fr) removed cleanly: PASS")

# 3. Check available headless browsers / playwright
print("playwright installed:", importlib.util.find_spec('playwright') is not None)
print("selenium installed:", importlib.util.find_spec('selenium') is not None)
for exe in ['chrome', 'msedge', 'chromium', 'firefox']:
    print(f"  which({exe}):", shutil.which(exe))

for p in [
    r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe",
    r"C:\Program Files\Microsoft\Edge\Application\msedge.exe",
    r"C:\Program Files\Google\Chrome\Application\chrome.exe",
    r"C:\Program Files (x86)\Google\Chrome\Application\chrome.exe",
]:
    if os.path.exists(p):
        print(f"  Found browser binary: {p}")
