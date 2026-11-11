import re

files = ['index.html', 'about.html', 'services.html', 'blog.html', 'contact.html', 'login.html', 'signup.html', '404.html']

for f in files:
    with open(f, 'r', encoding='utf-8') as fp:
        c = fp.read()
    print('='*70)
    print(f'FILE: {f}')
    print('='*70)
    
    # Find links related to aos
    for m in re.finditer(r'<link[^>]*aos[^>]*>', c, re.IGNORECASE):
        print('  LINK:', m.group(0))
        
    # Find scripts related to aos
    for m in re.finditer(r'<script[^>]*aos[^>]*>.*?</script>|<script[^>]*aos[^>]*>', c, re.IGNORECASE | re.DOTALL):
        print('  SCRIPT:', m.group(0)[:120])
        
    # Check preloader
    has_preloader = 'id="wm-preloader"' in c
    has_refresh_hard = 'AOS.refreshHard()' in c
    has_main_js = 'js/main.js' in c
    print(f'  Preloader: {has_preloader} | refreshHard in file: {has_refresh_hard} | main.js: {has_main_js}')
