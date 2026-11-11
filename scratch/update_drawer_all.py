import os

# 1. Update css/styles.css
with open('css/styles.css', 'r', encoding='utf-8') as f:
    css_content = f.read()

old_css = """/* Mobile Menu Drawer */
.wm-mobile-drawer {
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

new_css = """/* Mobile Menu Drawer */
.wm-mobile-drawer {
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

# Normalise line endings for comparison and replacement
css_crlf = '\r\n' in css_content
old_css_matched = old_css.replace('\n', '\r\n') if css_crlf else old_css
new_css_matched = new_css.replace('\n', '\r\n') if css_crlf else new_css

if old_css_matched in css_content:
    css_content = css_content.replace(old_css_matched, new_css_matched)
    with open('css/styles.css', 'w', encoding='utf-8', newline='') as f:
        f.write(css_content)
    print("SUCCESS: Updated css/styles.css")
else:
    print("ERROR: old_css not found in css/styles.css")

# 2. Update index.html
with open('index.html', 'r', encoding='utf-8') as f:
    idx_content = f.read()

# in index.html, drawer has:
# <a href="index.html" class="wm-drawer-link">Home</a>
# ...
# <a href="login.html" class="wm-drawer-link" style="color: var(--wm-primary);">
#   <i class="fa-solid fa-user-lock"></i> Login
# </a>

import re

# Update index.html: make Home active, remove Login link
idx_drawer_old = """      <div class="wm-drawer-links">
        <a href="index.html" class="wm-drawer-link">Home</a>
        <a href="about.html" class="wm-drawer-link">About</a>
        <a href="services.html" class="wm-drawer-link">Services</a>
        <a href="blog.html" class="wm-drawer-link">Blog</a>
        <a href="contact.html" class="wm-drawer-link">Contact</a>
        <a href="login.html" class="wm-drawer-link" style="color: var(--wm-primary);">
          <i class="fa-solid fa-user-lock"></i> Login
        </a>
      </div>"""

idx_drawer_new = """      <div class="wm-drawer-links">
        <a href="index.html" class="wm-drawer-link active">Home</a>
        <a href="about.html" class="wm-drawer-link">About</a>
        <a href="services.html" class="wm-drawer-link">Services</a>
        <a href="blog.html" class="wm-drawer-link">Blog</a>
        <a href="contact.html" class="wm-drawer-link">Contact</a>
      </div>"""

if idx_drawer_old.replace('\n', '\r\n') in idx_content:
    idx_content = idx_content.replace(idx_drawer_old.replace('\n', '\r\n'), idx_drawer_new.replace('\n', '\r\n'))
    with open('index.html', 'w', encoding='utf-8', newline='') as f:
        f.write(idx_content)
    print("SUCCESS: Updated index.html")
elif idx_drawer_old in idx_content:
    idx_content = idx_content.replace(idx_drawer_old, idx_drawer_new)
    with open('index.html', 'w', encoding='utf-8', newline='') as f:
        f.write(idx_content)
    print("SUCCESS: Updated index.html")
else:
    print("ERROR: idx_drawer_old not found in index.html")

# 3. Update about.html: remove login link, About is active
with open('about.html', 'r', encoding='utf-8') as f:
    abt_content = f.read()

abt_drawer_old = """      <div class="wm-drawer-links">
        <a href="index.html" class="wm-drawer-link">Home</a>
        <a href="about.html" class="wm-drawer-link active">About</a>
        <a href="services.html" class="wm-drawer-link">Services</a>
        <a href="blog.html" class="wm-drawer-link">Blog</a>
        <a href="contact.html" class="wm-drawer-link">Contact</a>
        <a href="login.html" class="wm-drawer-link" style="color: var(--wm-primary);">
          <i class="fa-solid fa-user-lock"></i> Login
        </a>
      </div>"""

abt_drawer_new = """      <div class="wm-drawer-links">
        <a href="index.html" class="wm-drawer-link">Home</a>
        <a href="about.html" class="wm-drawer-link active">About</a>
        <a href="services.html" class="wm-drawer-link">Services</a>
        <a href="blog.html" class="wm-drawer-link">Blog</a>
        <a href="contact.html" class="wm-drawer-link">Contact</a>
      </div>"""

if abt_drawer_old.replace('\n', '\r\n') in abt_content:
    abt_content = abt_content.replace(abt_drawer_old.replace('\n', '\r\n'), abt_drawer_new.replace('\n', '\r\n'))
    with open('about.html', 'w', encoding='utf-8', newline='') as f:
        f.write(abt_content)
    print("SUCCESS: Updated about.html")
elif abt_drawer_old in abt_content:
    abt_content = abt_content.replace(abt_drawer_old, abt_drawer_new)
    with open('about.html', 'w', encoding='utf-8', newline='') as f:
        f.write(abt_content)
    print("SUCCESS: Updated about.html")
else:
    print("ERROR: abt_drawer_old not found in about.html")

# 4. Update services.html: remove login link, Services is active
with open('services.html', 'r', encoding='utf-8') as f:
    srv_content = f.read()

srv_drawer_old = """      <div class="wm-drawer-links">
        <a href="index.html" class="wm-drawer-link">Home</a>
        <a href="about.html" class="wm-drawer-link">About</a>
        <a href="services.html" class="wm-drawer-link active">Services</a>
        <a href="blog.html" class="wm-drawer-link">Blog</a>
        <a href="contact.html" class="wm-drawer-link">Contact</a>
        <a href="login.html" class="wm-drawer-link" style="color: var(--wm-primary);">
          <i class="fa-solid fa-user-lock"></i> Login
        </a>
      </div>"""

srv_drawer_new = """      <div class="wm-drawer-links">
        <a href="index.html" class="wm-drawer-link">Home</a>
        <a href="about.html" class="wm-drawer-link">About</a>
        <a href="services.html" class="wm-drawer-link active">Services</a>
        <a href="blog.html" class="wm-drawer-link">Blog</a>
        <a href="contact.html" class="wm-drawer-link">Contact</a>
      </div>"""

if srv_drawer_old.replace('\n', '\r\n') in srv_content:
    srv_content = srv_content.replace(srv_drawer_old.replace('\n', '\r\n'), srv_drawer_new.replace('\n', '\r\n'))
    with open('services.html', 'w', encoding='utf-8', newline='') as f:
        f.write(srv_content)
    print("SUCCESS: Updated services.html")
elif srv_drawer_old in srv_content:
    srv_content = srv_content.replace(srv_drawer_old, srv_drawer_new)
    with open('services.html', 'w', encoding='utf-8', newline='') as f:
        f.write(srv_content)
    print("SUCCESS: Updated services.html")
else:
    print("ERROR: srv_drawer_old not found in services.html")

# 5. Update blog.html: keep drawer consistent with others (remove login button block & contact block if needed to match)
with open('blog.html', 'r', encoding='utf-8') as f:
    blg_content = f.read()

# Let's inspect the exact drawer block in blog.html
blg_drawer_match = re.search(r'(<!--\s*Mobile Drawer Menu\s*-->\s*<div class="wm-mobile-drawer">.*?</div>\s*</div>\s*(?:</div>\s*)?)', blg_content, re.DOTALL)
if blg_drawer_match:
    print("Found drawer in blog.html:")
    print(repr(blg_drawer_match.group(1)[:120]))
