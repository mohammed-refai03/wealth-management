with open('css/styles.css', 'rb') as f:
    content = f.read()

target = b'''/* Mobile Menu Drawer */
.wm-mobile-drawer {
  position: fixed;
  top: 0;
  right: -320px;
  width: 300px;
  height: 100vh;
  background-color: var(--wm-white);
  box-shadow: var(--wm-shadow-lg);
  z-index: 2500;
  padding: 30px 24px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: right var(--wm-trans-base);
}

.wm-mobile-drawer.open {
  right: 0;
}

.wm-drawer-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 30px;
}

.wm-drawer-links {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.wm-drawer-link {
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--wm-dark);
}

.wm-drawer-link:hover {
  color: var(--wm-primary);
}'''

# Check if target with CRLF or LF is present
target_crlf = target.replace(b'\r\n', b'\n').replace(b'\n', b'\r\n')
target_lf = target.replace(b'\r\n', b'\n')

print("CRLF present:", target_crlf in content)
print("LF present:", target_lf in content)
