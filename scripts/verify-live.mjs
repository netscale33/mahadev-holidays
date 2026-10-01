// Live verify: boots the production build in-process, hits key APIs, exits.
// Usage: node scripts/verify-live.mjs
import http from 'node:http';
import fs from 'node:fs';
import next from 'next';

const dir = process.cwd();

function loadEnv() {
  const env = {};
  try {
    const raw = fs.readFileSync('.env.local', 'utf-8');
    for (const line of raw.split('\n')) {
      const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
      if (m) env[m[1]] = m[2];
    }
  } catch { /* ignore */ }
  return env;
}
const env = loadEnv();
const ADMIN_USER = env.ADMIN_USERNAME || 'admin';
const ADMIN_PASS = env.ADMIN_PASSWORD || 'admin123';
const app = next({ dev: false, dir });
await app.prepare();
const handler = app.getRequestHandler();

const server = http.createServer((req, res) => handler(req, res));
await new Promise((resolve) => server.listen(3100, '127.0.0.1', resolve));

const base = 'http://127.0.0.1:3100';
const out = [];
try {
  let r = await fetch(`${base}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username: ADMIN_USER, password: ADMIN_PASS }),
  });
  const login = await r.json();
  out.push(`login ${r.status} role=${login.user?.role}`);
  const tok = login.token;
  const h = { Authorization: `Bearer ${tok}` };

  r = await fetch(`${base}/api/auth/verify`, { headers: h });
  out.push(`verify ${r.status}`);

  r = await fetch(`${base}/api/stats`, { headers: h });
  const stats = await r.json();
  out.push(`stats ${r.status} dest=${stats.stats?.totalDestinations} bookings=${stats.stats?.totalBookings} recent=${stats.recentBookings?.length}`);

  r = await fetch(`${base}/api/destinations?limit=3`);
  const d = await r.json();
  out.push(`destinations ${r.status} total=${d.pagination?.total} first=${d.destinations?.[0]?.slug}`);

  r = await fetch(`${base}/api/contact`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: 'Test User', email: 'test@example.com', subject: 'Inquiry: Goa', message: 'hello' }),
  });
  const c = await r.json();
  out.push(`contact-create ${r.status} id=${c.message?.id}`);
  r = await fetch(`${base}/api/contact/${c.message?.id}`, { method: 'DELETE', headers: h });
  out.push(`contact-delete ${r.status}`);

  r = await fetch(`${base}/api/users`, { headers: h });
  const u = await r.json();
  out.push(`users ${r.status} count=${Array.isArray(u) ? u.length : '?'}`);

  const png = Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==', 'base64');
  const fd = new FormData();
  fd.append('file', new Blob([png], { type: 'image/png' }), 't.png');
  r = await fetch(`${base}/api/upload`, { method: 'POST', headers: h, body: fd });
  const up = await r.json();
  out.push(`upload ${r.status} url=${up.url}`);
  if (up.url) {
    const del = await fetch(up.url);
    out.push(`upload-public ${del.status}`);
  }

  r = await fetch(`${base}/api/stats`);
  out.push(`stats-noauth ${r.status}`);
} catch (e) {
  out.push(`ERROR ${e.message}`);
} finally {
  server.close();
}
console.log(out.join('\n'));
process.exit(0);
