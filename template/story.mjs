// Gera o story (1080x1920) que avisa sobre o post do dia, usando a capa do carrossel.
// Uso: node template/story.mjs post12-fechamento-automatico
import { chromium } from 'playwright';
import { resolve, basename } from 'node:path';
import { existsSync, readFileSync, writeFileSync, unlinkSync } from 'node:fs';
import { pathToFileURL } from 'node:url';

const pasta = process.argv[2];
if (!pasta) {
  console.error('Uso: node template/story.mjs <pasta-do-post>');
  process.exit(1);
}
const nome = basename(resolve(pasta));
const capa = resolve(pasta, `${nome}-01.jpg`);
if (!existsSync(capa)) {
  console.error(`Exporte o carrossel antes: falta ${capa}`);
  process.exit(1);
}
const fontes = 'fonts';
const capaUrl = 'data:image/jpeg;base64,' + readFileSync(capa).toString('base64');

const html = `<!doctype html><html><head><meta charset="utf-8"><style>
@font-face { font-family: 'Inter'; font-weight: 400 500; src: url('${fontes}/inter.woff2') format('woff2'); }
@font-face { font-family: 'Space Grotesk'; font-weight: 500 700; src: url('${fontes}/space-grotesk.woff2') format('woff2'); }
* { margin: 0; padding: 0; box-sizing: border-box; }
body { width: 1080px; height: 1920px; background:
  radial-gradient(ellipse 800px 520px at 100% 0%, rgba(24, 74, 100, 0.6), transparent 70%),
  radial-gradient(ellipse 640px 460px at 0% 100%, rgba(22, 50, 96, 0.4), transparent 70%), #060a13;
  color: #eef2fb; font-family: 'Inter', sans-serif; display: flex; flex-direction: column; align-items: center; }
.topo { margin-top: 170px; font-family: 'Space Grotesk'; font-weight: 700; font-size: 34px; letter-spacing: 0.22em; color: #3cc8f5; }
h1 { margin-top: 28px; font-family: 'Space Grotesk'; font-weight: 700; font-size: 84px; line-height: 1.08; text-align: center; letter-spacing: -0.015em; }
.capa { margin-top: 70px; width: 760px; border-radius: 28px; border: 3px solid rgba(60, 200, 245, 0.55);
  box-shadow: 0 0 60px rgba(60, 200, 245, 0.28); }
.chamada { margin-top: 70px; font-size: 44px; color: #c9d3e4; text-align: center; line-height: 1.4; }
.arroba { position: absolute; bottom: 150px; font-family: 'Space Grotesk'; font-weight: 500; font-size: 36px; color: #3cc8f5; }
</style></head><body>
<div class="topo">POST NOVO NO FEED</div>
<h1>Já viu o de hoje?</h1>
<img class="capa" src="${capaUrl}">
<div class="chamada">Toca no @ lá em cima e arrasta o post<br>até o fim. Tem pergunta pra você. 👆</div>
<div class="arroba">@franco_tecnologia</div>
</body></html>`;

const chromiumFixo = '/opt/pw-browsers/chromium';
const browser = await chromium.launch(existsSync(chromiumFixo) ? { executablePath: chromiumFixo } : {});
const page = await browser.newPage({ viewport: { width: 1080, height: 1920 } });
// A página fica dentro de template/ para as fontes locais carregarem.
const temp = resolve('template', `.story-${nome}.html`);
writeFileSync(temp, html);
await page.goto(pathToFileURL(temp).href);
await page.evaluate(async () => {
  await Promise.all([document.fonts.load('700 84px "Space Grotesk"'), document.fonts.load('400 44px "Inter"')]);
  await document.fonts.ready;
});
const arquivo = resolve(pasta, `${nome}-story.jpg`);
await page.screenshot({ path: arquivo, type: 'jpeg', quality: 92 });
await browser.close();
unlinkSync(temp);
console.log(arquivo);
