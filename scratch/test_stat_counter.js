const fs = require('fs');

class MockElement {
  constructor(attrs = {}) {
    this.attributes = attrs;
    this.classList = { add: () => {}, remove: () => {} };
    this.listeners = {};
    this.textContent = attrs.text || '';
  }
  getAttribute(name) { return this.attributes[name] || null; }
  querySelector(sel) { return this.counter || null; }
  matches(sel) { return !!this.attributes['data-target']; }
  addEventListener(event, cb) {
    this.listeners[event] = this.listeners[event] || [];
    this.listeners[event].push(cb);
  }
  trigger(event) {
    if (this.listeners[event]) this.listeners[event].forEach(cb => cb());
  }
  getBoundingClientRect() { return { top: 200, bottom: 500 }; }
}

const c1 = new MockElement({ 'data-target': '450', 'data-prefix': '$', 'data-suffix': 'M+', text: '$0' });
const card1 = new MockElement(); card1.counter = c1;

const c2 = new MockElement({ 'data-target': '99.2', 'data-suffix': '%', text: '0%' });
const card2 = new MockElement(); card2.counter = c2;

const c3 = new MockElement({ 'data-target': '25', 'data-suffix': '+', text: '0' });
const card3 = new MockElement(); card3.counter = c3;

const c4 = new MockElement({ 'data-target': '12400', 'data-suffix': '+', text: '0' });
const card4 = new MockElement(); card4.counter = c4;

const cards = [card1, card2, card3, card4];
const counters = [c1, c2, c3, c4];

let observerCb = null;
global.window = { innerHeight: 800, addEventListener: () => {} };
global.document = {
  addEventListener: () => {},
  querySelector: () => null,
  querySelectorAll: (sel) => {
    if (sel === '.wm-stat-card') return cards;
    if (sel.includes('.wm-stat-number')) return counters;
    return [];
  },
  getElementById: () => null,
  documentElement: { clientHeight: 800 }
};

let nowTime = 0;
global.performance = { now: () => nowTime };
let rafQueue = [];
global.requestAnimationFrame = (cb) => { rafQueue.push(cb); };
global.IntersectionObserver = class {
  constructor(cb) { observerCb = cb; }
  observe() {}
};

const js = fs.readFileSync('js/main.js', 'utf8');
eval(js);

initStatCounters();

observerCb([
  { isIntersecting: true, target: card1 },
  { isIntersecting: true, target: card2 },
  { isIntersecting: true, target: card3 },
  { isIntersecting: true, target: card4 }
]);

for (let t = 0; t <= 1700; t += 200) {
  nowTime = t;
  const currentBatch = [...rafQueue];
  rafQueue = [];
  currentBatch.forEach(cb => cb(nowTime));
}

console.log('Result Card 1:', c1.textContent);
console.log('Result Card 2:', c2.textContent);
console.log('Result Card 3:', c3.textContent);
console.log('Result Card 4:', c4.textContent);

// Hover test
card3.trigger('mouseenter');
for (let t = 1800; t <= 3600; t += 200) {
  nowTime = t;
  const currentBatch = [...rafQueue];
  rafQueue = [];
  currentBatch.forEach(cb => cb(nowTime));
}
console.log('Hover result Card 3:', c3.textContent);
