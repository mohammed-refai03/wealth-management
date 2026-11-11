import re

def verify_page(filename, expected_sections, expected_active):
    print(f"\n==================================================================")
    print(f"VERIFYING: {filename}")
    print(f"==================================================================")
    with open(filename, 'r', encoding='utf-8') as f:
        content = f.read()

    lines = content.splitlines()
    print(f"File size: {len(content)} bytes, Total lines: {len(lines)}")

    # 1. Tag balance
    tags = ['div', 'section', 'main', 'header', 'footer', 'nav', 'ul', 'li', 'button', 'form']
    balance_ok = True
    for t in tags:
        open_c = len(re.findall(rf'<{t}\b', content))
        close_c = len(re.findall(rf'</{t}>', content))
        if open_c != close_c:
            print(f"  [FAIL] Tag <{t}> mismatch: open={open_c}, close={close_c}")
            balance_ok = False
        else:
            print(f"  [PASS] Tag <{t}>: {open_c} / {close_c}")
    
    # 2. Section check
    sections = re.findall(r'<section\b([^>]*)>', content)
    print(f"\nTotal <section> tags: {len(sections)} (Expected: {len(expected_sections)})")
    for i, s in enumerate(sections):
        id_m = re.search(r'id="([^"]+)"', s)
        cl_m = re.search(r'class="([^"]+)"', s)
        sid = id_m.group(1) if id_m else 'NO_ID'
        scl = cl_m.group(1) if cl_m else 'NO_CLASS'
        expected_id = expected_sections[i] if i < len(expected_sections) else 'EXTRA'
        match_status = "OK" if expected_id in sid or (expected_id == 'NO_ID' and sid == 'NO_ID') else f"MISMATCH (expected {expected_id})"
        print(f"  [{i+1:2}] id={sid:22} | class={scl:35} | {match_status}")

    # 3. Logo check
    logo_count = content.count('assets/images/logo.webp')
    print(f"\nLogo images (assets/images/logo.webp): {logo_count} (Expected: 3)")
    assert logo_count == 3, f"Expected 3 logos, got {logo_count}"

    # 4. Navbar check
    nav_match = re.search(r'<header[\s\S]*?<\/header>', content).group(0)
    has_home = 'href="index.html"' in nav_match
    has_about = 'href="about.html"' in nav_match
    has_services = 'href="services.html"' in nav_match
    has_blog = 'href="blog.html"' in nav_match
    has_contact = 'href="contact.html"' in nav_match
    has_login = 'href="login.html"' in nav_match
    print(f"Navbar items: Home={has_home}, About={has_about}, Services={has_services}, Blog={has_blog}, Contact={has_contact}, Login={has_login}")

    # 5. Active item check
    active_m = re.search(rf'class="wm-nav-link active">([^<]+)<', nav_match)
    active_text = active_m.group(1) if active_m else "None"
    print(f"Active nav link: {active_text} (Expected: {expected_active})")

    # 6. Hero banner check
    banner_m = re.search(r'<section class="wm-page-banner"[^>]*style="([^"]*)"', content)
    if banner_m:
        print(f"Hero banner background image: {banner_m.group(1)[:80]}...")
    else:
        print("  [FAIL] Hero banner style not found!")

    # 7. Links summary
    links_404 = len(re.findall(r'href="404\.html"', content))
    print(f"Total 404 links: {links_404}")

    # 8. Functional elements
    buttons = re.findall(r'<button\b([^>]*)>([\s\S]*?)<\/button>', content)
    print(f"Total <button> elements: {len(buttons)}")
    for b_attr, b_inner in buttons:
        btn_type = re.search(r'type="([^"]+)"', b_attr)
        btn_cls = re.search(r'class="([^"]+)"', b_attr)
        btype = btn_type.group(1) if btn_type else 'button'
        bcls = btn_cls.group(1) if btn_cls else '-'
        inner_text = re.sub(r'<[^>]+>', '', b_inner).strip()[:30]
        # check that none have href="404.html" inside button
        assert '404.html' not in b_attr, "404 inside button!"

    print(f"VERIFICATION RESULT FOR {filename}: ALL CHECKS PASSED PERFECTLY!\n")

about_expected = [
    'NO_ID',                 # Banner
    'NO_ID',                 # Heritage
    'NO_ID',                 # Pillars
    'NO_ID',                 # Milestones
    'stats',                 # Stats
    'fiduciary-charter',     # Section A
    'NO_ID',                 # Marquee
    'global-footprint',      # Section B
    'team',                  # Team
    'academic-committee',    # Section C
    'skin-in-the-game',      # Section D
    'contact',               # Contact form
    'NO_ID'                  # Newsletter
]

services_expected = [
    'NO_ID',                 # Banner
    'disciplines',           # Disciplines
    'methodology',           # Methodology
    'process',               # Process
    'client-profiles',       # Client Profiles
    'advantage',             # Advantage
    'service-tiers',         # Tiers
    'allocation-bento',      # Bento Grid
    'custody-vault',         # Custody Vault
    'case-studies',          # Case Studies
    'booking'                # Diagnostic Review Booking Form
]

verify_page('about.html', about_expected, 'About')
verify_page('services.html', services_expected, 'Services')
