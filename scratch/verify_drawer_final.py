import re

pages = [
    ('index.html', 'Home'),
    ('about.html', 'About'),
    ('services.html', 'Services'),
    ('blog.html', 'Blog'),
    ('contact.html', 'Contact')
]

all_passed = True

print("=" * 60)
print("VERIFYING MOBILE DRAWER ACROSS ALL PAGES")
print("=" * 60)

for filename, active_expected in pages:
    with open(filename, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Extract drawer
    match = re.search(r'<div class="wm-mobile-drawer">.*?(?=\s*<main)', content, re.DOTALL)
    if not match:
        print(f"[FAIL] {filename}: Drawer not found!")
        all_passed = False
        continue
    
    drawer_html = match.group(0)
    
    # Check for login button in drawer
    if 'login.html' in drawer_html or 'fa-user-lock' in drawer_html or 'Login' in drawer_html:
        print(f"[FAIL] {filename}: Login link found inside drawer!")
        all_passed = False
    else:
        print(f"[PASS] {filename}: No login button in drawer.")
    
    # Check active link
    active_matches = re.findall(r'<a [^>]*class="wm-drawer-link active"[^>]*>(.*?)</a>', drawer_html)
    if not active_matches:
        print(f"[FAIL] {filename}: No active link in drawer!")
        all_passed = False
    elif len(active_matches) > 1:
        print(f"[FAIL] {filename}: Multiple active links: {active_matches}")
        all_passed = False
    elif active_matches[0] == active_expected:
        print(f"[PASS] {filename}: Active link is '{active_matches[0]}' (Expected: '{active_expected}').")
    else:
        print(f"[FAIL] {filename}: Active link is '{active_matches[0]}', expected '{active_expected}'.")
        all_passed = False
    
    # Check link count
    links = re.findall(r'<a [^>]*class="wm-drawer-link[^"]*"[^>]*>(.*?)</a>', drawer_html)
    if links == ['Home', 'About', 'Services', 'Blog', 'Contact']:
        print(f"[PASS] {filename}: All 5 drawer links present in exact order: {links}.")
    else:
        print(f"[FAIL] {filename}: Unexpected drawer links: {links}")
        all_passed = False

print("\n" + "=" * 60)
print("VERIFYING CSS FOR MOBILE DRAWER")
print("=" * 60)

with open('css/styles.css', 'r', encoding='utf-8') as f:
    css = f.read()

# Verify .wm-mobile-drawer has full screen width and 100vh / 100dvh
drawer_css = re.search(r'\.wm-mobile-drawer\s*\{([^}]+)\}', css)
if drawer_css:
    props = drawer_css.group(1)
    has_full_width = 'width: 100%' in props
    has_full_height = 'height: 100vh' in props and 'height: 100dvh' in props
    has_right_closed = 'right: -100%' in props
    has_hidden = 'visibility: hidden' in props
    print(f"[PASS] width: 100% -> {has_full_width}")
    print(f"[PASS] height: 100vh / 100dvh -> {has_full_height}")
    print(f"[PASS] right: -100% -> {has_right_closed}")
    print(f"[PASS] visibility: hidden -> {has_hidden}")
    if not (has_full_width and has_full_height and has_right_closed and has_hidden):
        all_passed = False
else:
    print("[FAIL] .wm-mobile-drawer not found in styles.css!")
    all_passed = False

# Verify .wm-mobile-drawer.open
open_css = re.search(r'\.wm-mobile-drawer\.open\s*\{([^}]+)\}', css)
if open_css:
    props = open_css.group(1)
    has_open_right = 'right: 0' in props
    has_open_visible = 'visibility: visible' in props
    print(f"[PASS] .open right: 0 -> {has_open_right}")
    print(f"[PASS] .open visibility: visible -> {has_open_visible}")
    if not (has_open_right and has_open_visible):
        all_passed = False
else:
    print("[FAIL] .wm-mobile-drawer.open not found in styles.css!")
    all_passed = False

# Verify active class styling
active_css = re.search(r'\.wm-drawer-link\.active\s*\{([^}]+)\}', css)
if active_css:
    props = active_css.group(1)
    has_primary = 'color: var(--wm-primary)' in props
    print(f"[PASS] .wm-drawer-link.active color: var(--wm-primary) -> {has_primary}")
    if not has_primary:
        all_passed = False
else:
    print("[FAIL] .wm-drawer-link.active not found in styles.css!")
    all_passed = False

print("\n" + "=" * 60)
if all_passed:
    print("ALL MOBILE DRAWER VERIFICATIONS PASSED 100%!")
else:
    print("SOME VERIFICATIONS FAILED!")
print("=" * 60)
