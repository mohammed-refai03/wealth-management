import os, urllib.request, io, time
from PIL import Image

print("==================================================================")
print("DOWNLOADING AND CONVERTING ALL IMAGES TO WEBP (< 90KB)")
print("==================================================================")

os.makedirs('assets/images', exist_ok=True)

# Map of photo ID to clean filename
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

def download_image(photo_id):
    url = f"https://images.unsplash.com/photo-{photo_id}?auto=format&fit=crop&w=1200&q=80"
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'})
    for attempt in range(3):
        try:
            with urllib.request.urlopen(req, timeout=15) as resp:
                return resp.read()
        except Exception as e:
            print(f"    Attempt {attempt+1} failed for {photo_id}: {e}")
            time.sleep(1)
    raise Exception(f"Failed to download photo {photo_id}")

def convert_to_webp(raw_bytes, target_max_kb=88):
    max_bytes = target_max_kb * 1024 # 88 KB strictly <= 90KB
    img = Image.open(io.BytesIO(raw_bytes))
    
    if img.mode not in ('RGB', 'RGBA'):
        img = img.convert('RGB')
        
    w, h = img.size
    # If dimensions exceed 1400px, scale down smoothly
    if max(w, h) > 1400:
        scale = 1400 / max(w, h)
        img = img.resize((int(w * scale), int(h * scale)), Image.Resampling.LANCZOS)

    # Try qualities from 80 down to 25
    for q in [82, 78, 74, 68, 62, 55, 48, 40, 32]:
        buf = io.BytesIO()
        img.save(buf, format='WEBP', quality=q, method=6)
        if buf.tell() <= max_bytes:
            return buf.getvalue()

    # If still > max_bytes, scale down image dimensions
    cur_img = img
    for scale in [0.85, 0.70, 0.55]:
        cur_img = cur_img.resize((int(cur_img.width * scale), int(cur_img.height * scale)), Image.Resampling.LANCZOS)
        for q in [75, 65, 50, 35]:
            buf = io.BytesIO()
            cur_img.save(buf, format='WEBP', quality=q, method=6)
            if buf.tell() <= max_bytes:
                return buf.getvalue()

    return buf.getvalue()

results = []

for idx, (photo_id, filename) in enumerate(IMAGE_MAP.items()):
    out_path = os.path.join('assets', 'images', filename)
    print(f"\n[{idx+1}/{len(IMAGE_MAP)}] Processing {photo_id} -> {filename}...")
    
    try:
        raw_data = download_image(photo_id)
        webp_data = convert_to_webp(raw_data)
        
        with open(out_path, 'wb') as f:
            f.write(webp_data)
            
        file_size = os.path.getsize(out_path)
        file_kb = file_size / 1024
        is_under_90k = file_size <= 90 * 1024
        print(f"  [SAVED] {out_path} - {file_size} bytes ({file_kb:.1f} KB) - Under 90KB: {is_under_90k}")
        results.append((filename, file_size, file_kb, is_under_90k))
    except Exception as err:
        print(f"  [ERROR] Failed {photo_id}: {err}")
        results.append((filename, 0, 0, False))

print("\n==================================================================")
print("DOWNLOAD & CONVERSION SUMMARY")
print("==================================================================")
all_success = True
for fn, sz, kb, ok in results:
    status = "OK" if ok else "FAILED"
    if not ok: all_success = False
    print(f"{fn:35} | {sz:7} bytes | {kb:5.1f} KB | {status}")

print(f"\nAll 22 images downloaded and converted under 90KB: {all_success}")
