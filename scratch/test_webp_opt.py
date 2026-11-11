import io
from PIL import Image

def optimize_to_webp(image_bytes, max_kb=90):
    max_bytes = max_kb * 1024
    img = Image.open(io.BytesIO(image_bytes))
    
    # Convert RGBA/P to RGB if needed (or keep RGBA for transparency)
    if img.mode in ('RGBA', 'LA') or (img.mode == 'P' and 'transparency' in img.info):
        pass
    else:
        img = img.convert('RGB')
        
    w, h = img.size
    max_dim = 1600
    if max(w, h) > max_dim:
        scale = max_dim / max(w, h)
        img = img.resize((int(w * scale), int(h * scale)), Image.Resampling.LANCZOS)
        
    for q in [82, 75, 68, 60, 50, 40, 30]:
        out = io.BytesIO()
        img.save(out, format='WEBP', quality=q, method=6)
        size = out.tell()
        if size <= max_bytes:
            print(f"Success at quality={q}, size={size} bytes ({size/1024:.2f} KB)")
            return out.getvalue()
            
    # If still > max_bytes, scale down
    cur_img = img
    for scale in [0.8, 0.6, 0.5]:
        cur_img = cur_img.resize((int(cur_img.width * scale), int(cur_img.height * scale)), Image.Resampling.LANCZOS)
        for q in [75, 60, 45]:
            out = io.BytesIO()
            cur_img.save(out, format='WEBP', quality=q, method=6)
            size = out.tell()
            if size <= max_bytes:
                print(f"Success at scale={scale}, quality={q}, size={size} bytes ({size/1024:.2f} KB)")
                return out.getvalue()

    return out.getvalue()

# Test with a dummy image
test_img = Image.new('RGB', (1920, 1080), color=(25, 83, 83))
buf = io.BytesIO()
test_img.save(buf, format='JPEG', quality=95)
webp_bytes = optimize_to_webp(buf.getvalue(), 90)
print(f"Result size: {len(webp_bytes)} bytes <= 90KB: {len(webp_bytes) <= 90*1024}")
