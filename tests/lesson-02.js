// Lesson 02: Sanitizing Data to Prevent Injection Attacks
// Requires the server to be running: npm run dev
// Run with: node security-tests/lesson-02.js

const BASE_URL = 'http://localhost:3000';

const title = 'Lesson 02: Sanitizing Data to Prevent Injection Attacks';
console.log(`\n${title}\n`);

let passed = 0;
let failed = 0;

async function test(name, fn) {
  try {
    await fn();
    console.log(`✅ ${name}`);
    passed++;
  } catch (err) {
    console.log(`❌ ${name} — ${err.message}`);
    failed++;
  }
}

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

await test('POST /notes — HTML in title is escaped before storage', async () => {
  const res = await fetch(`${BASE_URL}/notes`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      title: '<script>alert(1)</script>',
      body: 'Sanitization test',
    }),
  });
  assert(res.status === 201, `expected 201, got ${res.status}`);
  const body = await res.json();
  const storedTitle = body.data?.title ?? '';
  assert(!storedTitle.includes('<script>'), 'raw <script> tag found in stored title — input is not being sanitized');
  assert(storedTitle.includes('&lt;'), `expected HTML-escaped title, got: "${storedTitle}"`);
});

await test('POST /notes — HTML special characters in body are escaped', async () => {
  const res = await fetch(`${BASE_URL}/notes`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      title: 'Sanitization check',
      body: '<b>bold</b> & "quoted"',
    }),
  });
  assert(res.status === 201, `expected 201, got ${res.status}`);
  const responseBody = await res.json();
  const storedBody = responseBody.data?.body ?? '';
  assert(!storedBody.includes('<b>'), 'raw HTML tag found in stored body — input is not being sanitized');
  assert(storedBody.includes('&lt;'), `expected escaped HTML in body, got: "${storedBody}"`);
  assert(storedBody.includes('&amp;'), `expected & to be escaped as &amp;, got: "${storedBody}"`);
});

console.log(`\n${passed} passed, ${failed} failed`);

if (failed === 0) {
  const code = Buffer.from('c3YyLXNhbmk=', 'base64').toString();
  console.log(`\nVerification code: ${code}`);
}

process.exit(failed > 0 ? 1 : 0);
