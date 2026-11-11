with open('about.html', 'r', encoding='utf-8') as f:
    text = f.read()

# Let's see how many <main> tags, <header> tags, <footer tags, <section tags exist
print("main tags:", text.count('<main'), text.count('</main>'))
print("header tags:", text.count('<header'), text.count('</header>'))
print("footer tags:", text.count('<footer'), text.count('</footer>'))
print("section tags:", text.count('<section'), text.count('</section>'))

import re
# Find all occurrences of "wm-page-banner"
banners = [m.start() for m in re.finditer(r'<section[^>]*class="[^"]*wm-page-banner[^"]*"', text)]
print(f"wm-page-banner positions: {banners}")

# Find occurrences of "#team"
teams = [m.start() for m in re.finditer(r'id="team"', text)]
print(f"team positions: {teams}")
