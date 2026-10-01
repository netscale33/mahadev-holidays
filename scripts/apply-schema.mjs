// One-time: applies supabase/schema.sql to the linked Supabase project.
// Reads connection from .env.local (NEXT_PUBLIC_SUPABASE_URL) + DB password.
// Usage: node scripts/apply-schema.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');

function loadEnv() {
  const env = {};
  const raw = fs.readFileSync(path.join(root, '.env.local'), 'utf-8');
  for (const line of raw.split('\n')) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
    if (m) env[m[1]] = m[2];
  }
  return env;
}

const env = loadEnv();
const dbPassword = process.argv[2] || env.SUPABASE_DB_PASSWORD;
if (!dbPassword) {
  console.error('Missing DB password. Pass it as argv[1] or set SUPABASE_DB_PASSWORD in .env.local');
  process.exit(1);
}

const ref = new URL(env.NEXT_PUBLIC_SUPABASE_URL).hostname.split('.')[0];
const { Client } = await import('pg');
const client = new Client({
  host: `db.${ref}.supabase.co`,
  port: 5432,
  database: 'postgres',
  user: 'postgres',
  password: dbPassword,
  ssl: { rejectUnauthorized: false },
});

const sql = fs.readFileSync(path.join(root, 'supabase', 'schema.sql'), 'utf-8');
await client.connect();
await client.query(sql);
console.log('OK: schema applied');
await client.end();
