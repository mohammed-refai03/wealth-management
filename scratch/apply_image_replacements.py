import re, glob

print("==================================================================")
print("APPLYING LOCAL WEBP IMAGE REPLACEMENTS ACROSS PROJECT")
print("==================================================================")

IMAGE_MAP = {
    '1450133064473-71024230f91b': 'wealth-planning-consult.webp',
    '1460925895917-afdab827c52f': 'services-hero-banner.webp',
    '1486406146926-c627a92ad1ab': 'about-hero-architecture.webp',
    '1500648767791-00dcc994a43e': 'avatar-david-vance.webp',
    '1507003211169-0a1dd7228f2d': 'avatar-marcus-sterling.webp',
    '1507679799987-c73779587ccf': 'private-equity-deal.webp',
    '1517245386807-bb43f82c33c4': 'fintech-boardroom.webp',
    '1519085360753-af0119f7cbe7': 'team-elena-rostova.webp',
    '1525625293386-3f8f99389edd': 'contact-international-desk.webp',
    '1526304640581-d334cdbbf45e': 'currency-liquidity.webp',
    '1534528741775-53994a69daeb': 'avatar-clara-dupont.webp',
    '1542744173-8e7e53415bb0': 'institutional-analytics.webp',
    '1551836022-d5d88e9218df': 'hero-slide-main.webp',
    '1554224155-8d04cb21cd6c': 'tax-accounting-audit.webp',
    '1556761175-5973dc0f32e7': 'fiduciary-charter.webp',
    '1560250097-0b93528c311a': 'team-alexander-wright.webp',
    '1573496359142-b8d87734a5a2': 'team-sarah-chen.webp',
    '1577495508048-b635879837f1': 'contact-metro-corridor.webp',
    '1579532537598-459ecdaf39cc': 'credit-syndication.webp',
    '1580489944761-15a19d654956': 'team-priya-sharma.webp',
    '1590283603385-17ffb3a7f29f': 'blog-hero-markets.webp',
    '1611974789855-9c2a0a7236a3': 'crypto-alternative-assets.webp',
}

files = glob.glob('*.html') + ['css/styles.css']
files = [f for f in files if 'scratch' not in f]

total_replaced = 0

for fp in sorted(files):
    with open(fp, 'r', encoding='utf-8') as f:
        content = f.read()

    is_css = fp.endswith('.css')
    prefix = '../assets/images/' if is_css else 'assets/images/'
    
    file_replacements = 0
    for pid, filename in IMAGE_MAP.items():
        pattern = r'https://images\.unsplash\.com/photo-' + pid + r'[^"\'\)\s]*'
        replacement = prefix + filename
        matches = re.findall(pattern, content)
        if matches:
            file_replacements += len(matches)
            content = re.sub(pattern, replacement, content)
            
    if file_replacements > 0:
        with open(fp, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"  [UPDATED] {fp:20} | Replaced {file_replacements:2} image links -> {prefix}")
    else:
        print(f"  [NO CHANGE] {fp:20} | No external images")
        
    total_replaced += file_replacements

print(f"\nTotal image links successfully replaced: {total_replaced}")
