with open('css/styles.css', 'r', encoding='utf-8') as f:
    css = f.read()

import re
media_queries = re.findall(r'@media\s*\([^)]*max-width[^)]*\)', css)
from collections import Counter
print("Media query counts:")
for mq, count in Counter(media_queries).most_common():
    print(f"  {mq:35} : {count}")
