import os, re

# 1. Update css/styles.css
with open('css/styles.css', 'r', encoding='utf-8') as f:
    css_content = f.read()

# Replace .wm-mobile-drawer and add .active rule
css_target = """.wm-mobile-drawer {
  position: fixed;
  top: 0;
  right: -320px;
  width: 300px;
  height: 100vh;
  background-color: var(--wm-white);
  box-shadow: var(--wm-shadow-lg);
  z-index: 2500;
  padding: 30px 24px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: right var(--wm-trans-base);
}

.wm-mobile-drawer.open {
  right: 0;
}

.wm-drawer-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 30px;
}

.wm-drawer-links {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.wm-drawer-link {
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--wm-dark);
}

.wm-drawer-link:hover {
  color: var(--wm-primary);
}"""

css_replacement = """.wm-mobile-drawer {
  position: fixed;
  top: 0;
  right: -100%;
  width: 100%;
  height: 100vh;
  height: 100dvh;
  background-color: var(--wm-white);
  box-shadow: var(--wm-shadow-lg);
  z-index: 2500;
  padding: 30px 24px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  visibility: hidden;
  pointer-events: none;
  transition: right var(--wm-trans-base), visibility var(--wm-trans-base);
  overflow-y: auto;
}

.wm-mobile-drawer.open {
  right: 0;
  visibility: visible;
  pointer-events: auto;
}

.wm-drawer-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 30px;
}

.wm-drawer-links {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.wm-drawer-link {
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--wm-dark);
  transition: color var(--wm-trans-fast);
}

.wm-drawer-link:hover,
.wm-drawer-link.active {
  color: var(--wm-primary);
  font-weight: 700;
}"""

crlf = '\r\n' in css_content
t_matched = css_target.replace('\n', '\r\n') if crlf else css_target
r_matched = css_replacement.replace('\n', '\r\n') if crlf else css_replacement

if t_matched in css_content:
    css_content = css_content.replace(t_matched, r_matched)
    with open('css/styles.css', 'w', encoding='utf-8', newline='') as f:
        f.write(css_content)
    print("SUCCESS: css/styles.css updated.")
else:
    print("ERROR: css_target not found in styles.css")

# Function to generate uniform drawer HTML
def make_drawer(active_page):
    links = [
        ('index.html', 'Home'),
        ('about.html', 'About'),
        ('services.html', 'Services'),
        ('blog.html', 'Blog'),
        ('contact.html', 'Contact')
    ]
    links_html = []
    for url, label in links:
        if label.lower() == active_page.lower():
            links_html.append(f'        <a href="{url}" class="wm-drawer-link active">{label}</a>')
        else:
            links_html.append(f'        <a href="{url}" class="wm-drawer-link">{label}</a>')
    
    links_block = '\n'.join(links_html)
    drawer = f"""  <div class="wm-mobile-drawer">
    <div>
      <div class="wm-drawer-header">
        <a href="index.html" class="wm-logo">
          <img src="assets/images/logo.webp" alt="Stackly Wealth Management" class="wm-logo-img">
        </a>
        <button class="wm-drawer-close" aria-label="Close menu" style="background:none; border:none; font-size:1.6rem; cursor:pointer; color:var(--wm-dark);">
          <i class="fa-solid fa-xmark"></i>
        </button>
      </div>
      <div class="wm-drawer-links">
{links_block}
      </div>
    </div>
  </div>"""
    return drawer

pages = [
    ('index.html', 'Home'),
    ('about.html', 'About'),
    ('services.html', 'Services'),
    ('blog.html', 'Blog'),
    ('contact.html', 'Contact')
]

for filename, page_name in pages:
    with open(filename, 'r', encoding='utf-8') as f:
        content = f.read()
    
    file_crlf = '\r\n' in content
    # Find the drawer block: from <div class="wm-mobile-drawer"> to the next </main> or <main
    pattern = r'<div class="wm-mobile-drawer">.*?(?=\s*<main)'
    match = re.search(pattern, content, re.DOTALL)
    if not match:
        print(f"ERROR: Drawer not found in {filename}")
        continue
    
    new_drawer_html = make_drawer(page_name)
    if file_crlf:
        new_drawer_html = new_drawer_html.replace('\n', '\r\n')
    
    # Replace the old drawer with the new drawer
    content = content[:match.start()] + new_drawer_html + content[match.end():]
    with open(filename, 'w', encoding='utf-8', newline='') as f:
        f.write(content)
    print(f"SUCCESS: {filename} updated for {page_name}.")
