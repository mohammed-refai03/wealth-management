with open('scratch/services_original.html', 'r', encoding='utf-8') as f:
    text = f.read()

print('topbar in services_original:', 'wm-announcement-bar' in text or 'wm-top-bar' in text or 'wm-topbar' in text)
print('preloader in services_original:', 'wm-preloader' in text)
