// Gera os stories fixos e as capas dos destaques dos produtos: node produtos/exportar.mjs
import { chromium } from 'playwright';
import { resolve } from 'node:path';
import { existsSync } from 'node:fs';
import { pathToFileURL } from 'node:url';

const chromiumFixo = '/opt/pw-browsers/chromium';
const browser = await chromium.launch(existsSync(chromiumFixo) ? { executablePath: chromiumFixo } : {});
const page = await browser.newPage({ viewport: { width: 1080, height: 1920 } });
await page.goto(pathToFileURL(resolve('produtos/destaques.html')).href);
await page.evaluate(async () => { await document.fonts.ready; });
for (const el of await page.$$('.st')) {
  const nome = await el.getAttribute('data-nome');
  const arquivo = resolve(`produtos/${nome}.jpg`);
  await el.screenshot({ path: arquivo, type: 'jpeg', quality: 92 });
  console.log(arquivo);
}
await browser.close();
