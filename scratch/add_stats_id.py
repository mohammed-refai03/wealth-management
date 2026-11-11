with open('about.html', 'r', encoding='utf-8') as f:
    text = f.read()

text = text.replace(
    '7. Key Metrics & Stat Counters (Section 5)\n         ========================================================================== -->\n    <section class="wm-section wm-bg-surface">',
    '7. Key Metrics & Stat Counters (Section 5)\n         ========================================================================== -->\n    <section class="wm-section wm-bg-surface" id="stats">'
)

with open('about.html', 'w', encoding='utf-8') as f:
    f.write(text)

print("Updated stats section id in about.html")
