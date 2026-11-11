const fs = require('fs');

let html = fs.readFileSync('user-dashboard.html', 'utf8');

const oldChatScript = `    // --- 8. Interactive Chat Functionality ---
    const chatInput = document.getElementById('chatMessageInput');
    const sendBtn = document.getElementById('sendMessageBtn');
    const chatContainer = document.getElementById('chatMessagesContainer');

    function sendQuickPrompt(promptText) {
      if (!chatInput) return;
      chatInput.value = promptText;
      sendChatMessage();
    }

    function sendChatMessage() {
      if (!chatInput) return;
      const msgText = chatInput.value.trim();
      if (!msgText) return;

      // Append user bubble
      const now = new Date();
      const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

      const userBubble = document.createElement('div');
      userBubble.className = 'wm-chat-bubble wm-chat-user';
      userBubble.innerHTML = '<div style="font-size:0.75rem; color:rgba(255,255,255,0.8); margin-bottom:4px; font-weight:700;">You • ' + timeStr + '</div>' + escapeHtml(msgText);

      chatContainer.appendChild(userBubble);
      chatInput.value = '';
      chatContainer.scrollTop = chatContainer.scrollHeight;

      // Simulate friendly prompt response from Marcus Vance after 1.2 seconds
      setTimeout(() => {
        const advisorBubble = document.createElement('div');
        advisorBubble.className = 'wm-chat-bubble wm-chat-advisor';
        advisorBubble.innerHTML = '<div style="font-size:0.75rem; color:var(--wm-body-muted); margin-bottom:4px; font-weight:700;">Marcus Vance • ' + timeStr + '</div>' +
          'Understood, Anandha. I will review this against your fiduciary IPS guidelines and prepare the documentation for Schwab execution.';
        chatContainer.appendChild(advisorBubble);
        chatContainer.scrollTop = chatContainer.scrollHeight;
      }, 1200);
    }

    function escapeHtml(str) {
      return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
    }

    if (sendBtn) {
      sendBtn.addEventListener('click', sendChatMessage);
    }
    if (chatInput) {
      chatInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          sendChatMessage();
        }
      });
    }`;

const newCleanScript = `    // --- 8. Advisory Desk & Fiduciary Actions ---
    // Advisory consultations and recommendation approvals operate seamlessly via openDetailsModal and triggerToast.`;

if (html.includes(oldChatScript)) {
  html = html.replace(oldChatScript, newCleanScript);
  fs.writeFileSync('user-dashboard.html', html, 'utf8');
  console.log('Successfully removed old chat functionality from script!');
} else {
  console.error('Could not find exact old chat script block!');
}
