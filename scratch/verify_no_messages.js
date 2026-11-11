const fs = require('fs');
const html = fs.readFileSync('user-dashboard.html', 'utf8');

const searchTerms = [
  'wm-chat',
  'wm-messages-layout',
  'wm-convos',
  'chatMessagesContainer',
  'chatMessageInput',
  'sendMessageBtn',
  'Type your advisory question',
  'Ask your advisor'
];

searchTerms.forEach(term => {
  const count = (html.match(new RegExp(term, 'g')) || []).length;
  console.log(`Term "${term}": ${count} occurrences`);
});

// Check if any obsolete chat event listener remains in script
console.log('Script includes sendChatMessage:', html.includes('function sendChatMessage'));
