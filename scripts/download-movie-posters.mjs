import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';
const root = process.cwd();
const movies = JSON.parse(await fs.readFile(path.join(root, 'data/movies.json'), 'utf8'));
const headers = {
  'User-Agent':
    'KroozIPTV-AssetImporter/1.0 (https://krooztvus.us; movie artwork credits in /about)',
};
async function get(url) {
  const response = await fetch(url, { headers, signal: AbortSignal.timeout(30000) });
  if (!response.ok) throw new Error(`Asset request failed (${response.status})`);
  return response;
}
const api = new URL('https://commons.wikimedia.org/w/api.php');
api.search = new URLSearchParams({
  action: 'query',
  format: 'json',
  prop: 'imageinfo',
  iiprop: 'url|extmetadata',
  titles: movies.map((m) => `File:${m.sourceFile}`).join('|'),
}).toString();
const metadata = await (await get(api)).json();
const pages = Object.values(metadata.query.pages);
const credits = [];
await fs.mkdir(path.join(root, 'public/images/movies'), { recursive: true });
for (const movie of movies) {
  if (!/^[a-z0-9-]+$/.test(movie.id)) throw new Error('Invalid local movie ID.');
  const page = pages.find((p) => p.title === `File:${movie.sourceFile}`);
  const info = page?.imageinfo?.[0];
  const license = info?.extmetadata?.LicenseShortName?.value;
  // Only the reviewed public-domain artwork collection is imported by this script.
  if (!info?.url || license !== 'Public domain')
    throw new Error(`Review the artwork source/license for ${movie.title} before importing.`);
  const imageUrl = new URL(info.url);
  if (imageUrl.hostname !== 'upload.wikimedia.org' || imageUrl.protocol !== 'https:')
    throw new Error('Unexpected artwork host.');
  imageUrl.search = '';
  const response = await get(imageUrl);
  if (!response.headers.get('content-type')?.startsWith('image/'))
    throw new Error(`Unexpected content for ${movie.title}.`);
  const input = Buffer.from(await response.arrayBuffer());
  if (input.byteLength > 20000000) throw new Error('Image exceeds the import budget.');
  const output = await sharp(input, { limitInputPixels: 40000000 })
    .rotate()
    .resize(480, 720, { fit: 'contain', background: '#101720' })
    .webp({ quality: 82, effort: 5 })
    .toBuffer();
  await fs.writeFile(path.join(root, `public/images/movies/${movie.id}.webp`), output);
  const sourcePage = `https://commons.wikimedia.org/wiki/File:${encodeURIComponent(movie.sourceFile.replaceAll(' ', '_'))}`;
  credits.push({
    id: movie.id,
    title: movie.title,
    sourcePage,
    sourceImage: imageUrl.href,
    license:
      'Public domain in the United States; see source page for rationale and territorial details',
    artist: (info.extmetadata?.Artist?.value || 'Unknown').replace(/<[^>]*>/g, ''),
    downloadedOn: new Date().toISOString().slice(0, 10),
    image: movie.image,
    bytes: output.byteLength,
  });
  console.log(`${movie.title}: ${Math.round(output.byteLength / 1024)} KB WebP`);
}
await fs.writeFile(
  path.join(root, 'data/movie-credits.json'),
  JSON.stringify(credits, null, 2) + '\n',
);
console.log(
  'Downloaded local movie artwork and saved source/license records. No API key required.',
);
