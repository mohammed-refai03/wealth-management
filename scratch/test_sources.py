import re

# ==============================================================================
# 1. READ BASE SOURCE FILES
# ==============================================================================
with open('scratch/about_original.html', 'r', encoding='utf-8') as f:
    about_orig = f.read()

with open('scratch/insert_about_sections.js', 'r', encoding='utf-8') as f:
    insert_about_js = f.read()

with open('scratch/services_original.html', 'r', encoding='utf-8') as f:
    services_orig = f.read()

with open('scratch/services_insert_1500.js', 'r', encoding='utf-8') as f:
    services_insert_js = f.read()

print("Base sources loaded successfully.")
