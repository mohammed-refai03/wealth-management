import re

with open('index.html', 'r', encoding='utf-8') as f:
    lines = f.readlines()

print('=' * 75)
print('INDEX.HTML DATA-AOS ELEMENTS')
print('=' * 75)

count = 0
for i, line in enumerate(lines):
    if 'data-aos=' in line:
        count += 1
        m_aos = re.search(r'data-aos="([^"]+)"', line)
        m_delay = re.search(r'data-aos-delay="([^"]+)"', line)
        aos_type = m_aos.group(1) if m_aos else '?'
        delay = m_delay.group(1) if m_delay else 'none'
        print(f'{count:2}. Line {i+1:4} | aos={aos_type:10} | delay={delay:5} | {line.strip()[:65]}')

print(f'\nTotal data-aos in index.html: {count}')
