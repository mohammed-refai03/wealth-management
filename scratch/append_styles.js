const fs = require('fs');
const cssPath = 'css/styles.css';
let css = fs.readFileSync(cssPath, 'utf8');

const additionalStyles = `
/* --- 31. Additional Modern Wealth Dashboard Components --- */
.wm-sidebar-toggle-btn {
  display: none;
  background: transparent;
  border: 1px solid var(--wm-border);
  color: var(--wm-dark);
  font-size: 1.15rem;
  padding: 8px 12px;
  border-radius: var(--wm-radius-sm);
  cursor: pointer;
  transition: all var(--wm-trans-fast);
}
.wm-sidebar-toggle-btn:hover {
  background: var(--wm-surface);
  color: var(--wm-primary);
}

@media (max-width: 1024px) {
  .wm-sidebar-toggle-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }
}

.wm-action-btn-group {
  display: inline-flex;
  gap: 6px;
  align-items: center;
}
.wm-action-btn {
  width: 32px;
  height: 32px;
  border-radius: var(--wm-radius-sm);
  border: 1px solid var(--wm-border-light);
  background: var(--wm-white);
  color: var(--wm-body);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 0.85rem;
  cursor: pointer;
  transition: all var(--wm-trans-fast);
}
.wm-action-btn:hover {
  background: var(--wm-primary);
  color: var(--wm-white);
  border-color: var(--wm-primary);
}
.wm-action-btn-danger:hover {
  background: #e74c3c;
  color: var(--wm-white);
  border-color: #e74c3c;
}

.wm-filter-bar {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
  margin-bottom: 24px;
}
.wm-filter-btn {
  padding: 8px 16px;
  border-radius: var(--wm-radius-full);
  border: 1px solid var(--wm-border);
  background: var(--wm-white);
  color: var(--wm-body);
  font-size: 0.825rem;
  font-weight: 600;
  cursor: pointer;
  transition: all var(--wm-trans-fast);
}
.wm-filter-btn:hover, .wm-filter-btn.active {
  background: var(--wm-primary);
  color: var(--wm-white);
  border-color: var(--wm-primary);
}

.wm-notif-btn {
  position: relative;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1px solid var(--wm-border-light);
  background: var(--wm-surface);
  color: var(--wm-dark);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 1.05rem;
  cursor: pointer;
  transition: all var(--wm-trans-fast);
}
.wm-notif-btn:hover {
  background: var(--wm-primary);
  color: var(--wm-white);
}
.wm-notif-dot {
  position: absolute;
  top: 8px;
  right: 8px;
  width: 8px;
  height: 8px;
  background-color: #e74c3c;
  border-radius: 50%;
  border: 2px solid var(--wm-white);
}

.wm-goal-card {
  background: var(--wm-white);
  border: 1px solid var(--wm-border-light);
  border-radius: var(--wm-radius-md);
  padding: 20px;
  margin-bottom: 16px;
  box-shadow: var(--wm-shadow-sm);
}
.wm-goal-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}
.wm-goal-title {
  font-weight: 700;
  color: var(--wm-dark);
  font-size: 0.95rem;
}
.wm-goal-amounts {
  font-size: 0.85rem;
  color: var(--wm-body-muted);
}
.wm-progress-bar-bg {
  width: 100%;
  height: 10px;
  background-color: var(--wm-surface);
  border-radius: var(--wm-radius-full);
  overflow: hidden;
  margin-top: 8px;
}
.wm-progress-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--wm-primary) 0%, #236f6f 100%);
  border-radius: var(--wm-radius-full);
  transition: width 0.6s ease;
}

.wm-activity-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.wm-activity-item {
  display: flex;
  align-items: flex-start;
  gap: 14px;
  padding-bottom: 16px;
  border-bottom: 1px solid var(--wm-border-light);
}
.wm-activity-item:last-child {
  border-bottom: none;
  padding-bottom: 0;
}
.wm-activity-icon {
  width: 36px;
  height: 36px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.95rem;
  flex-shrink: 0;
}
.wm-act-blue { background: #ebf5fb; color: #2980b9; }
.wm-act-green { background: #eafaf1; color: #27ae60; }
.wm-act-yellow { background: #fef9e7; color: #f39c12; }
.wm-act-teal { background: var(--wm-sage); color: var(--wm-primary); }

.wm-activity-info {
  flex: 1;
}
.wm-activity-text {
  font-size: 0.875rem;
  color: var(--wm-dark);
  margin-bottom: 2px;
  font-weight: 500;
}
.wm-activity-time {
  font-size: 0.75rem;
  color: var(--wm-body-muted);
}
`;

fs.writeFileSync(cssPath, css + additionalStyles, 'utf8');
console.log('Appended additional dashboard styles successfully. Total length:', (css + additionalStyles).length);
