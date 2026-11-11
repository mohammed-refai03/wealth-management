import os

img_dir = os.path.join('assets', 'images')
files = os.listdir(img_dir)
print(f"Total files in {img_dir}: {len(files)}")
print("=" * 70)

all_under_90k = True
for f in sorted(files):
    p = os.path.join(img_dir, f)
    sz = os.path.getsize(p)
    kb = sz / 1024
    ok = sz <= 90 * 1024
    if not ok: all_under_90k = False
    status = "PASS" if ok else "FAIL (>90KB)"
    print(f"{f:35} | {sz:7} bytes | {kb:5.1f} KB | {status}")

print("=" * 70)
print(f"All images strictly within 90KB: {all_under_90k}")
