import glob, re

files = ['index.html', 'about.html', 'services.html', 'blog.html', 'contact.html', 'login.html', 'signup.html', '404.html']
print('='*75)
print('AOS & CDNJS COVERAGE AUDIT')
print('='*75)

for f in files:
    with open(f, 'r', encoding='utf-8') as fp:
        c = fp.read()
    has_aos_css = 'cdnjs.cloudflare.com/ajax/libs/aos/' in c and 'aos.css' in c
    has_aos_js = 'cdnjs.cloudflare.com/ajax/libs/aos/' in c and 'aos.js' in c
    data_aos_count = len(re.findall(r'data-aos=', c))
    anim_types = set(re.findall(r'data-aos="([^"]+)"', c))
    print(f'{f:15} | CSS: {str(has_aos_css):5} | JS: {str(has_aos_js):5} | Elements: {data_aos_count:3} | Types: {sorted(list(anim_types))}')
