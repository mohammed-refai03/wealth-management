const fs = require('fs');

let html = fs.readFileSync('user-dashboard.html', 'utf8');

// 1. Update Sidebar Menu Item
html = html.replace(
  `<button class="wm-sidebar-btn" data-tab="tab-user-messages">\n          <i class="fa-solid fa-comments"></i>\n          <span>Messages</span>\n        </button>`,
  `<button class="wm-sidebar-btn" data-tab="tab-user-advisory">\n          <i class="fa-solid fa-user-tie"></i>\n          <span>Advisory Desk</span>\n        </button>`
);

// 2. Update Overview Tab Button
html = html.replace(
  `onclick="switchTab('tab-user-messages')">\n                <i class="fa-solid fa-comments"></i> Reply to Marcus in Messages`,
  `onclick="switchTab('tab-user-advisory')">\n                <i class="fa-solid fa-user-tie"></i> Consult Marcus at Advisory Desk`
);

// 3. Update Tab 3 Section
const oldTabStart = '<!-- ====================================================================\n           TAB 3: MESSAGES\n           ==================================================================== -->';
const oldTabSectionStart = '<section id="tab-user-messages" class="wm-tab-view">';
const tab4Start = '<!-- ====================================================================\n           TAB 4: FINANCIAL PRODUCTS';

const newTabContent = `<!-- ====================================================================
           TAB 3: ADVISORY DESK
           ==================================================================== -->
      <section id="tab-user-advisory" class="wm-tab-view">
        <div class="wm-dash-title-bar">
          <div>
            <h1 class="wm-dash-page-title">Private Advisory Desk & Fiduciary Team</h1>
            <p class="wm-dash-page-subtitle">Direct 256-bit encrypted line to your dedicated Chief Investment Officer, Estate Legal Counsel, and Custody Concierge.</p>
          </div>
          <div style="display:flex; gap:10px; flex-wrap:wrap;">
            <button class="wm-btn wm-btn-secondary" style="padding:10px 18px; font-size:0.85rem;" onclick="triggerToast('Advisory video session booked. Marcus Vance will dispatch the secure calendar link.')">
              <i class="fa-solid fa-video"></i> Book Video Session
            </button>
            <button class="wm-btn wm-btn-primary" style="padding:10px 18px; font-size:0.85rem;" onclick="triggerToast('Fiduciary Portfolio & Tax Review requested. Your advisory summary will be compiled within 24 hours.')">
              <i class="fa-solid fa-file-signature"></i> Request Fiduciary Review
            </button>
          </div>
        </div>

        <!-- 3 Advisory Summary / SLA Cards -->
        <div class="wm-kpi-grid" style="grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); margin-bottom:24px;">
          <!-- Primary Advisor Card -->
          <div class="wm-kpi-card" style="border-left: 4px solid var(--wm-primary);">
            <div style="display:flex; align-items:center; gap:12px; margin-bottom:12px;">
              <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80" alt="Marcus Vance" style="width:48px; height:48px; border-radius:50%; object-fit:cover; border:2px solid var(--wm-primary);">
              <div>
                <div style="font-weight:700; color:var(--wm-dark); font-size:0.95rem;">Marcus Vance, CFA</div>
                <div style="font-size:0.75rem; color:var(--wm-body-muted);">Chief Investment Officer & Lead Fiduciary</div>
              </div>
            </div>
            <div style="font-size:0.8rem; color:var(--wm-body); display:flex; flex-direction:column; gap:4px; margin-bottom:12px;">
              <div><i class="fa-solid fa-envelope" style="width:16px; color:var(--wm-primary);"></i> marcus.v@stackly.com</div>
              <div><i class="fa-solid fa-phone" style="width:16px; color:var(--wm-primary);"></i> +1 (800) 555-0199 ext. 402</div>
            </div>
            <span class="wm-status-pill wm-pill-completed"><i class="fa-solid fa-circle" style="font-size:0.45rem; vertical-align:middle;"></i> Active Now • &lt; 15 Min SLA</span>
          </div>

          <!-- Advisory Team Roster Card -->
          <div class="wm-kpi-card">
            <div style="font-weight:700; color:var(--wm-dark); font-size:0.95rem; margin-bottom:10px;">
              <i class="fa-solid fa-users-gear" style="color:var(--wm-primary); margin-right:6px;"></i> Dedicated Advisory Specialists
            </div>
            <div style="display:flex; flex-direction:column; gap:8px; font-size:0.8rem;">
              <div style="display:flex; justify-content:space-between; align-items:center; padding-bottom:6px; border-bottom:1px solid var(--wm-border-light);">
                <div><strong>Sarah Jenkins, JD</strong><div style="font-size:0.7rem; color:var(--wm-body-muted);">Senior Estate Counsel</div></div>
                <span class="wm-status-pill wm-pill-active">Trust Verified</span>
              </div>
              <div style="display:flex; justify-content:space-between; align-items:center; padding-bottom:6px; border-bottom:1px solid var(--wm-border-light);">
                <div><strong>David Sterling, CPA</strong><div style="font-size:0.7rem; color:var(--wm-body-muted);">Tax Optimization Desk</div></div>
                <span class="wm-status-pill wm-pill-active">Harvesting Ready</span>
              </div>
              <div style="display:flex; justify-content:space-between; align-items:center;">
                <div><strong>Custody Desk (Schwab)</strong><div style="font-size:0.7rem; color:var(--wm-body-muted);">Institutional Clearing</div></div>
                <span class="wm-status-pill wm-pill-completed">100% Synced</span>
              </div>
            </div>
          </div>

          <!-- Advisory Mandate & Security Card -->
          <div class="wm-kpi-card">
            <div style="font-weight:700; color:var(--wm-dark); font-size:0.95rem; margin-bottom:10px;">
              <i class="fa-solid fa-shield-halved" style="color:var(--wm-primary); margin-right:6px;"></i> Fiduciary Service Standards
            </div>
            <div style="display:flex; flex-direction:column; gap:8px; font-size:0.8rem; color:var(--wm-body);">
              <div><i class="fa-solid fa-lock" style="color:var(--wm-primary); width:16px;"></i> 256-Bit SSL Encrypted Communication</div>
              <div><i class="fa-solid fa-scale-balanced" style="color:var(--wm-primary); width:16px;"></i> 100% Fee-Only Fiduciary Standard (No Commissions)</div>
              <div><i class="fa-solid fa-building-columns" style="color:var(--wm-primary); width:16px;"></i> Independent Custody at Charles Schwab</div>
              <div><i class="fa-solid fa-calendar-check" style="color:var(--wm-primary); width:16px;"></i> Next Scheduled Review: <strong>Nov 18, 2026</strong></div>
            </div>
          </div>
        </div>

        <!-- 2-Column Communications & Advisory Terminal -->
        <div class="wm-messages-layout">
          <!-- Left: Advisory Channels Roster -->
          <div class="wm-convos-pane">
            <div class="wm-convos-head" style="display:flex; justify-content:space-between; align-items:center;">
              <span><i class="fa-solid fa-comments" style="color:var(--wm-primary); margin-right:8px;"></i> Advisory Channels</span>
              <span class="wm-status-pill wm-pill-active" style="font-size:0.65rem;">4 Active</span>
            </div>

            <!-- Channel 1 (Active) -->
            <div class="wm-convo-item active" style="border-left:3px solid var(--wm-primary);">
              <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:4px;">
                <strong style="color:var(--wm-dark); font-size:0.9rem;">Marcus Vance, CFA</strong>
                <span style="font-size:0.72rem; color:var(--wm-primary); font-weight:700;">10:14 AM</span>
              </div>
              <div style="font-size:0.78rem; color:var(--wm-body); white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">
                Re: Q4 Portfolio Rebalancing & 7.4% Treasury Yield Plus
              </div>
              <div style="font-size:0.7rem; color:var(--wm-body-muted); margin-top:2px;">Chief Investment Officer</div>
            </div>

            <!-- Channel 2 -->
            <div class="wm-convo-item" onclick="triggerToast('Loading Sarah Jenkins estate advisory channel...')">
              <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:4px;">
                <strong style="color:var(--wm-dark); font-size:0.9rem;">Sarah Jenkins, JD</strong>
                <span style="font-size:0.72rem; color:var(--wm-body-muted);">Yesterday</span>
              </div>
              <div style="font-size:0.78rem; color:var(--wm-body-muted); white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">
                Your Living Trust and Will schedules have been verified.
              </div>
              <div style="font-size:0.7rem; color:var(--wm-body-muted); margin-top:2px;">Senior Estate Counsel</div>
            </div>

            <!-- Channel 3 -->
            <div class="wm-convo-item" onclick="triggerToast('Loading David Sterling tax optimization channel...')">
              <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:4px;">
                <strong style="color:var(--wm-dark); font-size:0.9rem;">David Sterling, CPA</strong>
                <span style="font-size:0.72rem; color:var(--wm-body-muted);">Oct 28</span>
              </div>
              <div style="font-size:0.78rem; color:var(--wm-body-muted); white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">
                Tax loss harvesting analysis completed ($18.4K shielded).
              </div>
              <div style="font-size:0.7rem; color:var(--wm-body-muted); margin-top:2px;">Tax Strategy Desk</div>
            </div>

            <!-- Channel 4 -->
            <div class="wm-convo-item" onclick="triggerToast('Loading Charles Schwab institutional custody channel...')">
              <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:4px;">
                <strong style="color:var(--wm-dark); font-size:0.9rem;">Custody Concierge (Schwab)</strong>
                <span style="font-size:0.72rem; color:var(--wm-body-muted);">Oct 22</span>
              </div>
              <div style="font-size:0.78rem; color:var(--wm-body-muted); white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">
                October custody statement and wire reconciliations ready.
              </div>
              <div style="font-size:0.7rem; color:var(--wm-body-muted); margin-top:2px;">Institutional Support</div>
            </div>
          </div>

          <!-- Right: Active Consultation Terminal -->
          <div class="wm-chat-pane">
            <!-- Terminal Header -->
            <div class="wm-chat-header">
              <div style="display:flex; align-items:center; gap:12px;">
                <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80" alt="Marcus Vance" style="width:44px; height:44px; border-radius:50%; object-fit:cover; border:2px solid var(--wm-primary);">
                <div>
                  <div style="font-weight:700; color:var(--wm-dark); font-size:1rem;">Marcus Vance, CFA</div>
                  <div style="font-size:0.75rem; color:#27ae60; font-weight:600;"><i class="fa-solid fa-circle" style="font-size:0.5rem; vertical-align:middle;"></i> Active Now • 256-bit Encrypted Consultation</div>
                </div>
              </div>
              <div style="display:flex; gap:8px;">
                <button class="wm-btn wm-btn-outline" style="padding:6px 14px; font-size:0.8rem;" onclick="triggerToast('Direct phone bridge connected to Marcus Vance: +1 (800) 555-0199')">
                  <i class="fa-solid fa-phone"></i> Call
                </button>
                <button class="wm-btn wm-btn-primary" style="padding:6px 14px; font-size:0.8rem;" onclick="triggerToast('Launching encrypted video room with Marcus Vance...')">
                  <i class="fa-solid fa-video"></i> Video
                </button>
              </div>
            </div>

            <!-- Shared Advisory Documents Bar -->
            <div style="background:var(--wm-surface); padding:10px 20px; border-bottom:1px solid var(--wm-border-light); display:flex; align-items:center; gap:16px; font-size:0.78rem; overflow-x:auto;">
              <span style="color:var(--wm-body-muted); font-weight:700;"><i class="fa-solid fa-paperclip"></i> Shared Files:</span>
              <a href="#" style="color:var(--wm-primary); text-decoration:none; display:inline-flex; align-items:center; gap:4px; font-weight:600;" onclick="event.preventDefault(); triggerToast('Downloading Q4_Rebalance_Memo_Krishnan.pdf...')">
                <i class="fa-solid fa-file-pdf" style="color:#c0392b;"></i> Q4_Rebalance_Memo.pdf (1.4 MB)
              </a>
              <a href="#" style="color:var(--wm-primary); text-decoration:none; display:inline-flex; align-items:center; gap:4px; font-weight:600;" onclick="event.preventDefault(); triggerToast('Downloading Sovereign_Treasury_Plus_Factsheet.pdf...')">
                <i class="fa-solid fa-file-pdf" style="color:#c0392b;"></i> Sovereign_Treasury_Factsheet.pdf (840 KB)
              </a>
            </div>

            <!-- Consultation Chat Body -->
            <div class="wm-chat-body" id="chatMessagesContainer">
              <!-- Advisor message -->
              <div class="wm-chat-bubble wm-chat-advisor">
                <div style="font-size:0.75rem; color:var(--wm-body-muted); margin-bottom:4px; font-weight:700;">Marcus Vance • 10:02 AM</div>
                Hello Anandha, congratulations on the portfolio performance this month. Your net asset value reached <strong>$1,482,900.00</strong>, up +12.6% year-to-date.
              </div>

              <!-- Advisor message -->
              <div class="wm-chat-bubble wm-chat-advisor">
                <div style="font-size:0.75rem; color:var(--wm-body-muted); margin-bottom:4px; font-weight:700;">Marcus Vance • 10:04 AM</div>
                Looking at your liquidity reserves, you currently have $94.5K in the cash sweep. We have identified an attractive entry point into the <strong>Sovereign Treasury Yield Plus</strong> fund yielding 7.4% fixed. Would you like me to prepare an allocation schedule?
              </div>

              <!-- User reply -->
              <div class="wm-chat-bubble wm-chat-user">
                <div style="font-size:0.75rem; color:rgba(255,255,255,0.8); margin-bottom:4px; font-weight:700;">You • 10:10 AM</div>
                Thank you Marcus. That sounds prudent. What would the minimum lockup period be for the Sovereign Treasury Plus fund?
              </div>

              <!-- Advisor message -->
              <div class="wm-chat-bubble wm-chat-advisor">
                <div style="font-size:0.75rem; color:var(--wm-body-muted); margin-bottom:4px; font-weight:700;">Marcus Vance • 10:14 AM</div>
                It offers standard T+1 daily liquidity with no lockup penalties, so your capital stays flexible while compounding at 7.4% p.a. Let me know if you would like me to draft the authorization voucher!
              </div>
            </div>

            <!-- Quick Inquiry Prompt Pills -->
            <div style="padding:10px 20px; background:var(--wm-white); border-top:1px solid var(--wm-border-light); display:flex; gap:8px; overflow-x:auto;">
              <button type="button" class="wm-filter-btn" style="font-size:0.75rem; padding:6px 12px; white-space:nowrap;" onclick="sendQuickPrompt('Please prepare the authorization voucher for $50K allocation into Sovereign Treasury Yield Plus.')">
                <i class="fa-solid fa-arrow-right" style="margin-right:4px;"></i> Allocate $50K to Sovereign Treasury
              </button>
              <button type="button" class="wm-filter-btn" style="font-size:0.75rem; padding:6px 12px; white-space:nowrap;" onclick="sendQuickPrompt('Can you generate the annual tax-loss harvesting statement for my Schwab custody account?')">
                <i class="fa-solid fa-file-invoice-dollar" style="margin-right:4px;"></i> Tax Loss Harvesting Statement
              </button>
              <button type="button" class="wm-filter-btn" style="font-size:0.75rem; padding:6px 12px; white-space:nowrap;" onclick="sendQuickPrompt('I would like to schedule a 15-minute portfolio consultation for tomorrow afternoon.')">
                <i class="fa-solid fa-calendar-check" style="margin-right:4px;"></i> Schedule 15-min Call
              </button>
            </div>

            <!-- Consultation Input Area (No Form, Uses JS Event) -->
            <div class="wm-chat-input-area">
              <button type="button" class="wm-btn wm-btn-outline" style="border-radius:50%; width:44px; height:44px; padding:0; display:flex; align-items:center; justify-content:center; flex-shrink:0;" title="Attach Document" onclick="triggerToast('Document attachment dialogue opened. Supported: PDF, CSV, DOCX.')">
                <i class="fa-solid fa-paperclip"></i>
              </button>
              <input type="text" id="chatMessageInput" class="wm-form-input" style="margin:0; border-radius:var(--wm-radius-full); padding:12px 20px;" placeholder="Ask your advisor a question or submit portfolio instruction...">
              <button class="wm-btn wm-btn-primary" id="sendMessageBtn" style="border-radius:var(--wm-radius-full); width:48px; height:48px; padding:0; display:flex; align-items:center; justify-content:center; flex-shrink:0;" aria-label="Send Message">
                <i class="fa-solid fa-paper-plane"></i>
              </button>
            </div>
          </div>
        </div>
      </section>\n\n      `;

// Replace from oldTabStart to tab4Start
const idxStart = html.indexOf(oldTabStart);
const idxEnd = html.indexOf(tab4Start);

if (idxStart !== -1 && idxEnd !== -1) {
  html = html.substring(0, idxStart) + newTabContent + html.substring(idxEnd);
  console.log('Successfully replaced Tab 3 content.');
} else {
  console.error('Could not find Tab 3 boundary markers!');
  process.exit(1);
}

// Also add sendQuickPrompt function to script if not present
if (!html.includes('function sendQuickPrompt')) {
  const scriptMarker = 'function sendChatMessage() {';
  const quickPromptFn = `function sendQuickPrompt(promptText) {
      if (!chatInput) return;
      chatInput.value = promptText;
      sendChatMessage();
    }\n\n    `;
  html = html.replace(scriptMarker, quickPromptFn + scriptMarker);
  console.log('Added sendQuickPrompt helper function to script.');
}

fs.writeFileSync('user-dashboard.html', html, 'utf8');
console.log('user-dashboard.html updated successfully!');
