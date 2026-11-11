const fs = require('fs');
const cssPath = 'css/styles.css';
let css = fs.readFileSync(cssPath, 'utf8');

const newStyles = `
/* ==========================================================================
   Section 32: Modern Dashboard Architecture (Sidebar-First Shell Layout)
   Exact match to reference screenshot structure:
   - Full-height Left Sidebar with Logo at top, Pill Nav in middle, User Card + Logout at bottom
   - Top Header Bar with dynamic Tab Title on left & User Identity Profile on right
   - Clean Light Surface Main Area (#f0f4f4) with 16px rounded cards & icon badges
   ========================================================================== */

.wm-app-shell {
  display: flex;
  min-height: 100vh;
  width: 100%;
  background-color: #f0f4f4;
  position: relative;
}

/* Left Full-Height Sidebar */
.wm-app-sidebar {
  width: 250px;
  background: #ffffff;
  border-right: 1px solid #e5e9ea;
  height: 100vh;
  position: sticky;
  top: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  z-index: 150;
  padding: 24px 16px;
  flex-shrink: 0;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.wm-sidebar-logo-box {
  padding-bottom: 20px;
  margin-bottom: 16px;
  border-bottom: 1px solid #f0f4f4;
}

.wm-sidebar-nav {
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1;
}

.wm-sidebar-nav-item {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 12px 16px;
  border-radius: 12px;
  border: none;
  background: transparent;
  color: #556972;
  font-size: 0.925rem;
  font-weight: 600;
  font-family: var(--wm-font-body);
  cursor: pointer;
  text-align: left;
  transition: all 0.2s ease;
  position: relative;
}

.wm-sidebar-nav-item i {
  font-size: 1.15rem;
  width: 22px;
  text-align: center;
  color: #7b9098;
  transition: color 0.2s ease;
}

.wm-sidebar-nav-item:hover {
  background: rgba(25, 83, 83, 0.05);
  color: var(--wm-primary);
}

.wm-sidebar-nav-item:hover i {
  color: var(--wm-primary);
}

.wm-sidebar-nav-item.active {
  background: rgba(25, 83, 83, 0.09);
  color: var(--wm-primary);
  font-weight: 700;
}

.wm-sidebar-nav-item.active i {
  color: var(--wm-primary);
}

/* Sidebar Bottom Area */
.wm-sidebar-bottom {
  margin-top: auto;
  padding-top: 16px;
  border-top: 1px solid #f0f4f4;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.wm-sidebar-user-card {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 12px;
  border-radius: 12px;
  background: #f8fafb;
  border: 1px solid #eef2f2;
}

.wm-sidebar-user-avatar {
  width: 38px;
  height: 38px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid var(--wm-primary);
  flex-shrink: 0;
}

.wm-sidebar-user-info {
  flex: 1;
  min-width: 0;
}

.wm-sidebar-user-name {
  font-size: 0.85rem;
  font-weight: 700;
  color: var(--wm-dark);
  line-height: 1.2;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.wm-sidebar-user-email {
  font-size: 0.72rem;
  color: var(--wm-body-muted);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.wm-sidebar-logout-link {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: #c0392b;
  font-size: 0.85rem;
  font-weight: 600;
  text-decoration: none;
  padding: 8px 12px;
  border-radius: 8px;
  transition: all 0.2s ease;
}

.wm-sidebar-logout-link:hover {
  background: #fdf2f2;
  color: #a93226;
}

/* Right Main Pane (Header + Content) */
.wm-app-main-pane {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
  min-height: 100vh;
}

/* Top Header Bar */
.wm-app-topbar {
  height: 68px;
  background: #ffffff;
  border-bottom: 1px solid #e5e9ea;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 36px;
  position: sticky;
  top: 0;
  z-index: 90;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.02);
}

.wm-topbar-left {
  display: flex;
  align-items: center;
  gap: 16px;
}

.wm-topbar-title {
  font-size: 1.35rem;
  font-weight: 700;
  color: var(--wm-dark);
  font-family: var(--wm-font-heading);
}

.wm-topbar-right {
  display: flex;
  align-items: center;
  gap: 20px;
}

.wm-topbar-profile {
  display: flex;
  align-items: center;
  gap: 12px;
  text-align: right;
}

.wm-topbar-name {
  font-size: 0.875rem;
  font-weight: 700;
  color: var(--wm-dark);
  line-height: 1.2;
}

.wm-topbar-role {
  font-size: 0.72rem;
  color: var(--wm-body-muted);
}

.wm-topbar-avatar {
  width: 38px;
  height: 38px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid var(--wm-primary);
  flex-shrink: 0;
}

/* Content Body */
.wm-app-content-body {
  flex: 1;
  padding: 32px 36px;
  background-color: #f0f4f4;
  overflow-y: auto;
}

/* KPI Card with right-side badge icon box (Matches Screenshot) */
.wm-kpi-card-modern {
  background: #ffffff;
  border: 1px solid #e5e9ea;
  border-radius: 16px;
  padding: 22px 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.02);
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: all 0.25s ease;
}

.wm-kpi-card-modern:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.05);
  border-color: var(--wm-primary);
}

.wm-kpi-modern-left {
  display: flex;
  flex-direction: column;
}

.wm-kpi-modern-icon {
  width: 50px;
  height: 50px;
  border-radius: 12px;
  background: rgba(25, 83, 83, 0.08);
  color: var(--wm-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.35rem;
  flex-shrink: 0;
}

/* Highlight Cards with bottom/left accents (Matches Screenshot) */
.wm-highlight-card {
  background: #ffffff;
  border: 1px solid #e5e9ea;
  border-radius: 16px;
  padding: 22px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.02);
  position: relative;
  overflow: hidden;
}

.wm-hl-teal { border-left: 4px solid var(--wm-primary); }
.wm-hl-green { border-left: 4px solid #27ae60; }
.wm-hl-orange { border-left: 4px solid #e67e22; }
.wm-hl-blue { border-left: 4px solid #2980b9; }

/* Responsive Media Queries for New Shell */
@media (max-width: 1024px) {
  .wm-app-sidebar {
    position: fixed;
    left: -270px;
    top: 0;
    bottom: 0;
    z-index: 1000;
    box-shadow: 4px 0 24px rgba(0, 0, 0, 0.15);
  }
  .wm-app-sidebar.open {
    left: 0;
  }
  .wm-sidebar-toggle-btn {
    display: inline-flex;
  }
  .wm-app-topbar {
    padding: 0 20px;
  }
  .wm-app-content-body {
    padding: 24px 16px;
  }
}

@media (max-width: 768px) {
  .wm-app-topbar {
    height: 60px;
  }
  .wm-topbar-profile {
    display: none;
  }
}
`;

fs.writeFileSync(cssPath, css + newStyles, 'utf8');
console.log('Appended Section 32 to styles.css successfully! Total length:', (css + newStyles).length);
