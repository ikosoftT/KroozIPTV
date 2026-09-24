import sharp from 'sharp';
import fs from 'node:fs/promises';
for (const name of ['mountains', 'stadium', 'cinema', 'nature']) {
  if (!(await fs.stat(`public/images/${name}.jpg`).catch(() => null))) continue;
  await sharp(`public/images/${name}.jpg`)
    .resize({ width: name === 'mountains' ? 1400 : 1000, withoutEnlargement: true })
    .webp({ quality: 82 })
    .toFile(`public/images/${name}.webp`);
  await fs.unlink(`public/images/${name}.jpg`);
}
const cards = {
  streaming: {
    tag: 'STREAMING, SIMPLIFIED',
    title: 'A clearer connection.',
    sub: 'DEVICE  /  NETWORK  /  PLAYBACK',
  },
  devices: {
    tag: 'MAKE YOURSELF AT HOME',
    title: 'Meet your next screen.',
    sub: 'TV  /  TABLET  /  DESKTOP',
  },
  network: {
    tag: 'A LITTLE STREAMING KNOW-HOW',
    title: 'Find your flow.',
    sub: 'BANDWIDTH  /  STABILITY  /  CONNECTIONS',
  },
  guide: {
    tag: 'YOUR EVENING, ORGANIZED',
    title: 'See what’s next.',
    sub: 'CHANNELS  /  SCHEDULES  /  FAVORITES',
  },
};
for (const [name, c] of Object.entries(cards)) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630"><defs><radialGradient id="bg"><stop stop-color="#294336"/><stop offset="1" stop-color="#111c22"/></radialGradient><linearGradient id="screen" x2="1" y2="1"><stop stop-color="#3e6751"/><stop offset="1" stop-color="#172b34"/></linearGradient></defs><rect width="1200" height="630" fill="url(#bg)"/><circle cx="910" cy="245" r="230" fill="none" stroke="#b6f36b" stroke-opacity=".07"/><circle cx="910" cy="245" r="185" fill="none" stroke="#b6f36b" stroke-opacity=".07"/><text x="70" y="75" font-family="Arial,sans-serif" font-size="24" fill="#eef4ec" font-weight="700">Krooz<tspan fill="#b6f36b">IPTV.</tspan></text><g transform="translate(660 130)"><rect width="420" height="260" rx="13" fill="#101820" stroke="#718979" stroke-width="3"/><rect x="12" y="12" width="396" height="235" rx="6" fill="url(#screen)"/><rect x="35" y="37" width="82" height="7" rx="3" fill="#b6f36b"/><rect x="35" y="73" width="235" height="12" rx="5" fill="#d9e9de" opacity=".8"/><rect x="35" y="99" width="170" height="7" rx="3" fill="#84988c"/>${[0, 1, 2].map((i) => `<rect x="${35 + i * 118}" y="142" width="104" height="77" rx="5" fill="${['#588463', '#30494c', '#7c8860'][i]}"/><path d="M${77 + i * 118} 165l18 13-18 13z" fill="#e1efdb" opacity=".7"/>`).join('')}<path d="M180 260h60l10 27h-80z" fill="#51615b"/><rect x="130" y="286" width="160" height="5" rx="2" fill="#738578"/><rect x="330" y="173" width="74" height="141" rx="12" fill="#101820" stroke="#8ba18d" stroke-width="3"/><rect x="339" y="185" width="56" height="112" rx="5" fill="#42664d"/><circle cx="367" cy="237" r="18" fill="#b6f36b"/><path d="M361 228l16 9-16 9z" fill="#17241a"/></g><text x="70" y="325" font-family="Arial,sans-serif" font-size="13" letter-spacing="3" fill="#b6f36b">${c.tag}</text><text x="68" y="397" font-family="Arial,sans-serif" font-size="43" font-weight="700" fill="#f1f5ef">${c.title}</text><text x="70" y="450" font-family="Arial,sans-serif" font-size="12" letter-spacing="2" fill="#a5b7ab">${c.sub}</text><path d="M70 530h1060" stroke="#738578" stroke-opacity=".25"/><text x="70" y="573" font-family="Arial,sans-serif" font-size="13" fill="#93a89b">THE KROOZIPTV JOURNAL</text><text x="1000" y="573" font-family="Arial,sans-serif" font-size="13" fill="#b6f36b">GOOD TO KNOW ↗</text></svg>`;
  await fs.writeFile(`public/images/${name}.svg`, svg);
}
// Keep brand output centralized when rebuilding the complete asset set.
await import('./create-brand-assets.mjs');
