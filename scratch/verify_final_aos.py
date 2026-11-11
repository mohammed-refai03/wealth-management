import re

print("==================================================================")
print("FINAL VERIFICATION OF AOS FIXES")
print("==================================================================")

# 1. Check css/styles.css
with open('css/styles.css', 'r', encoding='utf-8') as f:
    css = f.read()

has_fade_up = '[data-aos=fade-up]' in css
has_transition = 'transition-property:opacity,transform' in css
has_perf = 'will-change: transform, opacity;' in css
has_reduced_motion_override = 'transition: none !important;' in css

print(f"styles.css: fade-up defined={has_fade_up}, transition defined={has_transition}, perf defined={has_perf}, reduced_motion_override={has_reduced_motion_override} (should be False)")

# 2. Check HTML files
files = ['index.html', 'about.html', 'services.html', 'blog.html', 'contact.html', 'login.html', 'signup.html', '404.html']
for page in files:
    with open(page, 'r', encoding='utf-8') as f:
        c = f.read()
    has_cdnjs_css = 'https://cdnjs.cloudflare.com/ajax/libs/aos/2.3.4/aos.css' in c
    has_local_css = 'css/aos.css' in c
    has_cdnjs_js = 'https://cdnjs.cloudflare.com/ajax/libs/aos/2.3.4/aos.js' in c
    has_local_js = 'js/aos.js' in c
    has_integrity = 'integrity=' in c and 'aos' in c
    
    # Check script order (aos.js before main.js)
    if 'js/main.js' in c:
        aos_pos = c.find('js/aos.js')
        main_pos = c.find('js/main.js')
        order_ok = aos_pos < main_pos
    else:
        order_ok = True
        
    print(f"{page:15} | cdnjs_css={has_cdnjs_css} | local_css={has_local_css} | cdnjs_js={has_cdnjs_js} | local_js={has_local_js} | script_order_ok={order_ok} | no_bad_sri={not has_integrity}")

print("==================================================================")
