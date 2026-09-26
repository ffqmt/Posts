# Posts @franco_tecnologia

Carrosséis do Instagram (1080x1350) feitos em HTML/CSS com a identidade escura da Franco Tecnologia.

## Estrutura

```
template/
  carrossel.css      visual (cores, fontes, tamanhos, fundo)
  carrossel.js       cabeçalho, numeração 01/09 e rodapé automáticos
  exportar.mjs       gera os JPGs de um post
  fonts/             Inter e Space Grotesk (funcionam sem internet)
  novo-post/         ponto de partida para um post novo
postN-assunto/
  slides.html        texto dos slides (fonte editável)
  legenda.md         legenda + hashtags
  postN-assunto-01.jpg ...  imagens prontas para publicar
```

## Criar um post novo

1. Copie `template/novo-post/` para uma pasta `postN-assunto/` (ex.: `post6-simples-nacional/`).
2. Edite `slides.html`: cada `<section class="slide">` é uma imagem. Apague ou copie slides à vontade.
3. Escreva a legenda e as hashtags em `legenda.md`.
4. Abra `slides.html` no navegador para conferir.
5. Gere as imagens: `npm install` (só na primeira vez) e depois `npm run exportar postN-assunto`.

## Peças disponíveis dentro de um slide

| Peça | Como escrever | Uso |
| --- | --- | --- |
| Rótulo azul em caixa alta | `<div class="rotulo">O que muda</div>` | acima do título |
| Barrinha azul | `<div class="barra"></div>` | no lugar do rótulo |
| Título de capa (grande) | `<h1>...</h1>` | primeiro slide |
| Título | `<h2>...</h2>` | demais slides |
| Palavra em azul | `<em>2027?</em>` | dentro do título |
| Texto de apoio | `<p>...</p>` | abaixo do título |
| Lista numerada | `<ol class="lista"><li>...</li></ol>` | resumo |
| Botão | `<div class="botao">Salve para depois</div>` | último slide |

A numeração (01/09), o "arraste →" e o @ entram sozinhos. O último slide não mostra "arraste".
