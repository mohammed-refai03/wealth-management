with open('login.html', 'r', encoding='utf-8') as f:
    c = f.read()

pos = c.find('wm-preloader')
print('login.html wm-preloader pos:', pos)
script_pos = c.find('wmPreloaderPercent')
print('login.html preloader script pos:', script_pos)
