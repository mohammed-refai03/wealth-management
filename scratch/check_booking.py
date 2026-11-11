with open('services.html', 'r', encoding='utf-8') as f:
    text = f.read()

import re
print('booking in services:', 'id="booking"' in text)
booking_matches = [m.start() for m in re.finditer(r'id="booking"', text)]
print('booking occurrences:', len(booking_matches))
for b in booking_matches:
    print('Context around booking:')
    print(text[b-100:b+300])
