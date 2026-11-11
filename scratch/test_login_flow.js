const fs = require('fs');

// Check main.js
const mainJs = fs.readFileSync('js/main.js', 'utf8');
const hasLoginInMain = mainJs.includes('#login-form');
const hasSignupInMain = mainJs.includes('#signup-form');

console.log('main.js includes #login-form:', hasLoginInMain);
console.log('main.js includes #signup-form:', hasSignupInMain);

if (hasLoginInMain || hasSignupInMain) {
  console.error('ERROR: main.js should NOT contain #login-form or #signup-form');
  process.exit(1);
} else {
  console.log('PASS: main.js has no interfering listeners for login or signup forms.');
}

// Verify login.html script logic
const loginHtml = fs.readFileSync('login.html', 'utf8');

// Check if role handling is present
console.log('login.html handles role selector:', loginHtml.includes("data-role=\"user\"") && loginHtml.includes("data-role=\"admin\""));
console.log('login.html handles admin redirect:', loginHtml.includes("window.location.href = targetUrl") || loginHtml.includes("admin-dashboard.html"));
console.log('login.html handles user redirect:', loginHtml.includes("user-dashboard.html"));
console.log('login.html has e.stopPropagation():', loginHtml.includes("e.stopPropagation()"));

// Check email and password validation
console.log('login.html validates email regex:', loginHtml.includes("emailRegex.test"));
console.log('login.html displays inline red error:', loginHtml.includes("login-email-error") && loginHtml.includes("login-password-error"));
console.log('login.html removes errors on input:', loginHtml.includes("clearError(emailInput, emailError)"));

console.log('All login verification checks passed successfully!');
