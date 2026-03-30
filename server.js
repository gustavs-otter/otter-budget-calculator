const http = require('http');
const fs = require('fs');

const HTML = fs.readFileSync('index.html');

const HEADERS = {
  'Content-Type': 'text/html; charset=utf-8',
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'X-XSS-Protection': '1; mode=block',
  'Referrer-Policy': 'no-referrer',
  'Content-Security-Policy': [
    "default-src 'self'",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "font-src https://fonts.gstatic.com",
    "script-src 'self' 'unsafe-inline'",
    "img-src 'self' data:",
    "connect-src 'none'",
    "frame-ancestors 'none'"
  ].join('; ')
};

http.createServer((req, res) => {
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    res.writeHead(405, { 'Allow': 'GET, HEAD', 'Content-Type': 'text/plain' });
    res.end('Method Not Allowed');
    return;
  }

  res.writeHead(200, HEADERS);
  if (req.method === 'HEAD') {
    res.end();
    return;
  }
  res.end(HTML);
}).listen(process.env.PORT || 3000, () => {
  console.log('Server running on port', process.env.PORT || 3000);
});
