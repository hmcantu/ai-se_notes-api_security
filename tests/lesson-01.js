// Lesson 01: Validating Input on the Server
// Requires the server to be running: npm run dev
// Run with: node security-tests/lesson-01.js

const BASE_URL = 'http://localhost:3000';
const testEmail = `validation_test_${Date.now()}@example.com`;

const title = 'Lesson 01: Validating Input on the Server';
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

await test('POST /auth/register — returns 400 for a password shorter than 8 characters', async () => {
  const res = await fetch(`${BASE_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: testEmail, password: 'short', name: 'Test User' }),
  });
  assert(res.status === 400, `expected 400, got ${res.status}`);
  const body = await res.json();
  assert(body.success === false, 'expected success: false');
  assert(body.error?.message, 'expected error.message to be present');
});

await test('POST /auth/register — error message mentions password length', async () => {
  const res = await fetch(`${BASE_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: `short2_${Date.now()}@example.com`, password: 'abc', name: 'Test User' }),
  });
  const body = await res.json();
  const message = body.error?.message ?? '';
  assert(
    message.toLowerCase().includes('password') && /\d/.test(message),
    `expected error message to mention password and a number, got: "${message}"`
  );
});

await test('POST /auth/register — returns 201 for a password of exactly 8 characters', async () => {
  const res = await fetch(`${BASE_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: testEmail, password: 'exactly8', name: 'Test User' }),
  });
  assert(res.status === 201, `expected 201, got ${res.status}`);
  const body = await res.json();
  assert(body.success === true, 'expected success: true');
});

console.log(`\n${passed} passed, ${failed} failed`);

if (failed === 0) {
  const code = Buffer.from('c3YxLXBsZW4=', 'base64').toString();
  console.log(`\nVerification code: ${code}`);
}

process.exit(failed > 0 ? 1 : 0);
