# Contrast calculation between (52, 97, 72) and #041c24 (4, 28, 36)
def lum(r, g, b):
    def channel(c):
        c = c / 255.0
        return c / 12.92 if c <= 0.03928 else ((c + 0.055) / 1.055) ** 2.4
    return 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b)

l1 = lum(52, 97, 72)
l2 = lum(4, 28, 36)
ratio = (max(l1, l2) + 0.05) / (min(l1, l2) + 0.05)
print(f"Contrast ratio on dark footer: {ratio:.2f}:1 (L1={l1:.3f}, L2={l2:.3f})")

l_white = lum(255, 255, 255)
ratio_white = (max(l1, l_white) + 0.05) / (min(l1, l_white) + 0.05)
print(f"Contrast ratio on white navbar: {ratio_white:.2f}:1")
