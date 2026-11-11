import re, glob

image_ids = [
    '1450133064473-71024230f91b',
    '1460925895917-afdab827c52f',
    '1486406146926-c627a92ad1ab',
    '1500648767791-00dcc994a43e',
    '1507003211169-0a1dd7228f2d',
    '1507679799987-c73779587ccf',
    '1517245386807-bb43f82c33c4',
    '1519085360753-af0119f7cbe7',
    '1525625293386-3f8f99389edd',
    '1526304640581-d334cdbbf45e',
    '1534528741775-53994a69daeb',
    '1542744173-8e7e53415bb0',
    '1551836022-d5d88e9218df',
    '1554224155-8d04cb21cd6c',
    '1556761175-5973dc0f32e7',
    '1560250097-0b93528c311a',
    '1573496359142-b8d87734a5a2',
    '1577495508048-b635879837f1',
    '1579532537598-459ecdaf39cc',
    '1580489944761-15a19d654956',
    '1590283603385-17ffb3a7f29f',
    '1611974789855-9c2a0a7236a3'
]

files = glob.glob('*.html') + glob.glob('css/*.css') + glob.glob('js/*.js')
files = [f for f in files if 'scratch' not in f]

for pid in image_ids:
    print(f"\n==================== Photo ID: {pid} ====================")
    found_in = []
    for fp in files:
        with open(fp, 'r', encoding='utf-8') as f:
            lines = f.readlines()
        for idx, line in enumerate(lines):
            if pid in line:
                print(f"  {fp}:{idx+1} | {line.strip()[:100]}")
