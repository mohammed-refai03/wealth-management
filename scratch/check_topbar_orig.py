with open('scratch/about_original.html', 'r', encoding='utf-8') as f:
    text = f.read()

print('topbar in about_original:', 'wm-announcement-bar' in text or 'wm-top-bar' in text or 'wm-pre-header' in text)
