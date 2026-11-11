with open('404.html', 'r', encoding='utf-8') as f:
    c = f.read()

c = c.replace('<div class="wm-404-brand">', '<div class="wm-404-brand" data-aos="fade-down">')
c = c.replace('<div class="wm-404-tag">', '<div class="wm-404-tag" data-aos="fade-down" data-aos-delay="100">')
c = c.replace('<h1 class="wm-404-title">', '<h1 class="wm-404-title" data-aos="fade-up" data-aos-delay="200">')
c = c.replace('<p class="wm-404-desc">', '<p class="wm-404-desc" data-aos="fade-up" data-aos-delay="250">')
c = c.replace('<div class="wm-404-actions"', '<div class="wm-404-actions" data-aos="fade-up" data-aos-delay="300"')

with open('404.html', 'w', encoding='utf-8') as f:
    f.write(c)

with open('login.html', 'r', encoding='utf-8') as f:
    c = f.read()

c = c.replace('<div class="wm-auth-form-container">', '<div class="wm-auth-form-container" data-aos="fade-left" data-aos-delay="100">')

with open('login.html', 'w', encoding='utf-8') as f:
    f.write(c)

with open('signup.html', 'r', encoding='utf-8') as f:
    c = f.read()

c = c.replace('<div class="wm-auth-form-container">', '<div class="wm-auth-form-container" data-aos="fade-left" data-aos-delay="100">')

with open('signup.html', 'w', encoding='utf-8') as f:
    f.write(c)

print('Updated 404, login, and signup!')
