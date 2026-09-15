// Run after the public deployment finishes. This notifies Naver of changed URLs.
const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const { spawnSync } = require('node:child_process');
const origin = 'https://trust-corporation.github.io';
const key = fs.readFileSync(path.join(__dirname, '../indexnow-key.txt'), 'utf8').trim();
assert(/^[a-f0-9]{32}$/.test(key), 'Invalid IndexNow verification key');
const urlList = process.argv.slice(2);
if (!urlList.length) urlList.push(origin + '/', origin + '/products/hex-wrench.html');
for (const value of urlList) {
  const url = new URL(value);
  assert(url.origin === origin && !url.hash && !url.username && !url.password, 'Use public site URLs without fragments');
}
const keyLocation = origin + '/indexnow-key.txt';
const published = spawnSync('curl', ['--fail', '--silent', '--show-error', '--max-time', '30', keyLocation], { encoding: 'utf8' });
assert(published.status === 0 && published.stdout.trim() === key, 'Deploy the verification file before submitting');
const response = spawnSync('curl', [
  '--silent', '--show-error', '--max-time', '45',
  '--header', 'Content-Type: application/json; charset=utf-8',
  '--data-binary', '@-', '--write-out', '\n%{http_code}',
  'https://searchadvisor.naver.com/indexnow'
], { input: JSON.stringify({ host: new URL(origin).host, key, keyLocation, urlList }), encoding: 'utf8' });
assert(response.status === 0, response.stderr || 'IndexNow connection failed');
const status = response.stdout.trim().split('\n').pop();
console.log(`Naver IndexNow HTTP ${status}`);
console.log(urlList.join('\n'));
assert(['200', '202'].includes(status), 'Naver did not accept the notification');
console.log(status === '200' ? 'Submission succeeded; indexing is not guaranteed.' : 'Received; Naver is checking the verification key.');
