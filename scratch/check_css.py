import re

with open('css/styles.css', 'r', encoding='utf-8') as f:
    css = f.read()

# Check curly brace matching
open_b = css.count('{')
close_b = css.count('}')
print(f"css/styles.css: open braces = {open_b}, close braces = {close_b}")

# Find any unclosed comments
open_c = css.count('/*')
close_c = css.count('*/')
print(f"css/styles.css: open comments = {open_c}, close comments = {close_c}")

# Let's check if there are any broken syntax lines or duplicate class definitions that conflict
# Check sections in css
sections = re.findall(r'/\* ==+ (.*?) ==+ \*/', css)
print("CSS Sections found:")
for s in sections:
    print(f"  - {s}")
