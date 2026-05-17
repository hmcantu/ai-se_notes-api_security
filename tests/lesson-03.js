// Lesson 03: Preventing Request Abuse with Rate Limiting
// Requires the server to be running: npm run dev
// Run with: node security-tests/lesson-03.js
//
// NOTE: express-rate-limit tracks state in memory and resets on server restart.
// If this test fails because the rate limiter was already triggered from a previous
// run, restart the server with `npm run dev` and try again.

const BASE_URL = 'http://localhost:3000';

const title = 'Lesson 03: Preventing Request Abuse with Rate Limiting';
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

await test('POST /auth/login — returns 429 after too many requests', async () => {
  const statuses = [];

  for (let i = 0; i < 15; i++) {
    const res = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'probe@example.com', password: 'wrongpassword' }),
    });
    statuses.push(res.status);
    if (res.status === 429) break;
  }

  const hit429 = statuses.includes(429);
  assert(
    hit429,
    `sent ${statuses.length} requests, none returned 429 — is rate limiting applied to POST /auth/login?`
  );
});

console.log(`\n${passed} passed, ${failed} failed`);

if (failed === 0) {
  const code = Buffer.from('c3YzLXJsbXQ=', 'base64').toString();
  console.log(`\nVerification code: ${code}`);
}

process.exit(failed > 0 ? 1 : 0);
