const fs = require('fs');

const adminHtml = fs.readFileSync('admin-dashboard.html', 'utf8');
const adminForms = [...adminHtml.matchAll(/<form/gi)];
console.log('Forms in admin-dashboard.html (must be 0):', adminForms.length);

const userHtml = fs.readFileSync('user-dashboard.html', 'utf8');
const userForms = [...userHtml.matchAll(/<form/gi)];
console.log('Forms in user-dashboard.html (must be 0):', userForms.length);

const loginHtml = fs.readFileSync('login.html', 'utf8');
const signupHtml = fs.readFileSync('signup.html', 'utf8');

console.log('login.html exists, length:', loginHtml.length);
console.log('signup.html exists, length:', signupHtml.length);

// Check if login.html has proper routing
console.log('login.html has admin-dashboard.html redirect:', loginHtml.includes('admin-dashboard.html'));
console.log('login.html has user-dashboard.html redirect:', loginHtml.includes('user-dashboard.html'));
console.log('login.html has custom red inline error class:', loginHtml.includes('wm-error-message'));
console.log('signup.html has login.html redirect:', signupHtml.includes('login.html'));
