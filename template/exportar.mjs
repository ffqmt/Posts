// Gera os JPGs de um carrossel.
// Uso: node template/exportar.mjs post5-reforma-2027 [pasta-de-saida]
import { chromium } from 'playwright';
import { resolve, basename } from 'node:path';
import { mkdirSync } from 'node:fs';
import { pathToFileURL } from 'node:url';

const pasta = process.argv[2];
if (!pasta) {
  console.error('Uso: node template/exportar.mjs <pasta-do-post> [pasta-de-saida]');
  process.exit(1);
}
const nome = basename(resolve(pasta));
const saida = resolve(process.argv[3] || pasta);
mkdirSync(saida, { recursive: true });

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1080, height: 1350 } });
await page.goto(pathToFileURL(resolve(pasta, 'slides.html')).href + '?exportar');
await page.evaluate(async () => {
  await Promise.all([
    document.fonts.load('700 72px "Space Grotesk"'),
    document.fonts.load('400 44px "Inter"'),
  ]);
  await document.fonts.ready;
});

const slides = await page.$$('.slide');
for (const [i, slide] of slides.entries()) {
  const arquivo = `${saida}/${nome}-${String(i + 1).padStart(2, '0')}.jpg`;
  await slide.screenshot({ path: arquivo, type: 'jpeg', quality: 95 });
  console.log(arquivo);
}
await browser.close();
