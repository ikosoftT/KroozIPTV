import sharp from 'sharp';
import fs from 'node:fs/promises';

// Original, code-native brand artwork. Re-run after changing brand colors or copy.
await fs.mkdir('public/brand', { recursive: true });
const icon = await fs.readFile('app/icon.svg');
for (const size of [16, 32, 192, 512]) {
  await sharp(icon).resize(size, size).png().toFile(`public/brand/icon-${size}.png`);
}
await sharp(icon)
  .resize(180, 180)
  .flatten({ background: '#b6f36b' })
  .png()
  .toFile('public/apple-icon.png');
await sharp(icon).resize(512, 512).png().toFile('public/brand/logo.png');

// A real multi-resolution ICO, with PNG-compressed image entries.
const sizes = [16, 32, 48, 256];
const frames = await Promise.all(
  sizes.map((size) => sharp(icon).resize(size, size).png().toBuffer()),
);
const header = Buffer.alloc(6 + 16 * frames.length);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(frames.length, 4);
let offset = header.length;
frames.forEach((frame, index) => {
  const entry = 6 + index * 16;
  header.writeUInt8(sizes[index] === 256 ? 0 : sizes[index], entry);
  header.writeUInt8(sizes[index] === 256 ? 0 : sizes[index], entry + 1);
  header.writeUInt16LE(1, entry + 4);
  header.writeUInt16LE(32, entry + 6);
  header.writeUInt32LE(frame.length, entry + 8);
  header.writeUInt32LE(offset, entry + 12);
  offset += frame.length;
});
await fs.writeFile('app/favicon.ico', Buffer.concat([header, ...frames]));

const art = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
<defs>
  <radialGradient id="ambient" cx="85%" cy="45%" r="70%"><stop stop-color="#233c28"/><stop offset="1" stop-color="#090d13"/></radialGradient>
  <linearGradient id="screen" x2="1" y2="1"><stop stop-color="#36564a"/><stop offset="1" stop-color="#12222c"/></linearGradient>
  <linearGradient id="fade" x2="0" y2="1"><stop stop-color="#0b141b" stop-opacity="0"/><stop offset="1" stop-color="#0b141b"/></linearGradient>
</defs>
<rect width="1200" height="630" fill="#090d13"/>
<rect width="1200" height="630" fill="url(#ambient)"/>
<path d="M0 0h1200" stroke="#b6f36b" stroke-width="10"/>
<circle cx="981" cy="291" r="208" fill="none" stroke="#b6f36b" stroke-opacity=".06"/>
<circle cx="981" cy="291" r="264" fill="none" stroke="#b6f36b" stroke-opacity=".04"/>
<g transform="translate(66 59)"><rect width="48" height="48" rx="13" fill="#b6f36b"/><path d="M19 13l19 11-19 11z" fill="#0b1117"/>
<text x="64" y="36" font-family="DejaVu Sans,Arial,sans-serif" font-size="39" font-weight="700" letter-spacing="-2" fill="#f4f5f7">Krooz<tspan font-weight="400">IPTV</tspan><tspan fill="#b6f36b">.</tspan></text></g>
<rect x="67" y="158" width="236" height="29" rx="14.5" fill="#b6f36b" fill-opacity=".06" stroke="#b6f36b" stroke-opacity=".24"/>
<circle cx="83" cy="172.5" r="3" fill="#b6f36b"/>
<text x="96" y="177" font-family="DejaVu Sans,Arial,sans-serif" font-size="10" font-weight="700" letter-spacing="1.4" fill="#cde4b5">ENTERTAINMENT, YOUR WAY</text>
<text x="63" y="277" font-family="DejaVu Sans,Arial,sans-serif" font-size="78" font-weight="700" letter-spacing="-4" fill="#f4f5f7">Live TV.</text>
<text x="63" y="370" font-family="DejaVu Sans,Arial,sans-serif" font-size="78" font-weight="700" letter-spacing="-4" fill="#b6f36b">Your way.</text>
<text x="67" y="417" font-family="DejaVu Sans,Arial,sans-serif" font-size="19" fill="#b4bec9">Sports. Movies. Entertainment.</text>
<text x="67" y="447" font-family="DejaVu Sans,Arial,sans-serif" font-size="16" fill="#a2aab7">Flexible IPTV plans. Familiar devices.</text>
<g transform="translate(618 159)">
  <rect x="0" y="0" width="510" height="312" rx="17" fill="#090d13" stroke="#3c4945" stroke-width="7"/>
  <rect x="9" y="9" width="492" height="287" rx="8" fill="url(#screen)"/>
  <circle cx="385" cy="77" r="38" fill="#d9e8b5" fill-opacity=".76"/>
  <path d="M9 204L86 115l54 49 91-106 77 98 46-37 147 111v65H9z" fill="#537762"/>
  <path d="M9 230l124-53 65 38 115-106 71 71 45-22 72 62v75H9z" fill="#253f3d"/>
  <path d="M190 104l41-46 34 44-29-10-15 15-15-12z" fill="#adc6ac"/>
  <rect x="9" y="9" width="492" height="287" rx="8" fill="url(#fade)"/>
  <text x="32" y="41" font-family="DejaVu Sans,Arial,sans-serif" font-size="12" font-weight="700" fill="#f4f5f7">Krooz<tspan fill="#b6f36b">IPTV.</tspan></text>
  <rect x="32" y="162" width="49" height="49" rx="24.5" fill="#b6f36b"/><path d="M51 175l16 11-16 11z" fill="#15200c"/>
  <text x="94" y="181" font-family="DejaVu Sans,Arial,sans-serif" font-size="12" letter-spacing="1.5" fill="#cbe8b7">A WORLD TO DISCOVER</text>
  <text x="94" y="204" font-family="DejaVu Sans,Arial,sans-serif" font-size="17" font-weight="700" fill="#f4f5f7">Find your next great watch.</text>
  <g font-family="DejaVu Sans,Arial,sans-serif" font-size="11" fill="#d4ddd9"><rect x="32" y="236" width="135" height="38" rx="6" fill="#263a32"/><text x="74" y="260">LIVE TV</text><rect x="178" y="236" width="135" height="38" rx="6" fill="#29333c"/><text x="219" y="260">MOVIES</text><rect x="324" y="236" width="145" height="38" rx="6" fill="#333d2c"/><text x="372" y="260">SPORTS</text></g>
  <path d="M225 316h60l14 27h-88z" fill="#35413b"/><rect x="183" y="342" width="144" height="5" rx="2.5" fill="#647461"/>
</g>
<path d="M67 526h1066" stroke="#2a3438"/>
<text x="67" y="572" font-family="DejaVu Sans,Arial,sans-serif" font-size="17" fill="#e4ecdf">krooztvus.us</text>
<text x="854" y="572" font-family="DejaVu Sans,Arial,sans-serif" font-size="12" letter-spacing="1.3" fill="#b6f36b">CHOOSE A PLAN. SETTLE IN.</text>
</svg>`;
await fs.writeFile('public/brand/social-preview.svg', art);
const social = await sharp(Buffer.from(art)).jpeg({ quality: 90, mozjpeg: true }).toBuffer();
await fs.writeFile('public/images/krooziptv-og.jpg', social);
// Preserve the earlier URL for existing links and external caches.
await fs.writeFile('public/images/social.jpg', social);
console.log(
  'Generated 1200×630 OG image, multi-resolution favicon, Apple icon, and 192/512px app icons.',
);
