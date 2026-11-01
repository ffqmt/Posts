// Gera as capas dos destaques: node perfil/exportar-capas.mjs
import { chromium } from 'playwright';
import { resolve } from 'node:path';
import { existsSync } from 'node:fs';
import { pathToFileURL } from 'node:url';

const chromiumFixo = '/opt/pw-browsers/chromium';
const browser = await chromium.launch(existsSync(chromiumFixo) ? { executablePath: chromiumFixo } : {});
const page = await browser.newPage({ viewport: { width: 1080, height: 1920 } });
await page.goto(pathToFileURL(resolve('perfil/capas-destaques.html')).href);
await page.evaluate(async () => { await document.fonts.load('700 210px "Space Grotesk"'); await document.fonts.ready; });
for (const capa of await page.$$('.capa')) {
  const nome = await capa.getAttribute('data-nome');
  const arquivo = resolve(`perfil/destaque-${nome}.jpg`);
  await capa.screenshot({ path: arquivo, type: 'jpeg', quality: 92 });
  console.log(arquivo);
}
await browser.close();
