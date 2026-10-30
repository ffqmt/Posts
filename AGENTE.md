# Agente diário de posts

Instruções que a tarefa agendada segue todo dia. Também servem para qualquer pessoa repetir o processo à mão.

## Regras

- Um carrossel por dia no Instagram @franco_tecnologia, às **10h de Brasília** (pico de alcance segundo o Metricool em todos os dias da semana).
- Agendar com **2 dias de antecedência**, para dar tempo de a Fernanda ver a prévia e cancelar no Metricool se quiser.
- Publicação pelo Metricool, marca `franco_tecnologia` (brandId 6611644, fuso America/Sao_Paulo), com publicação automática.
- As imagens precisam de URL pública: use `https://raw.githubusercontent.com/ffqmt/Posts/main/<pasta>/<arquivo>.jpg`. Por isso o post precisa estar na `main` **antes** de agendar.
- Antes de agendar, consulte os posts já agendados no Metricool e nunca crie dois no mesmo dia.
- Este repositório é público: nada de dados de clientes ou leads aqui.

## Conteúdo

- Público: escritórios contábeis. Tom direto, frases curtas, sem jargão desnecessário.
- Só afirme fatos sobre tributos que estejam na EC 132/2023 ou na LC 214/2025, ou em norma oficial publicada. Na dúvida, deixe o número de fora e fale do conceito.
- 9 slides: capa (h1) → contexto → 5 pontos → resumo (lista) → chamada final com botão.
- Legenda em `legenda.md` no mesmo formato dos posts anteriores, 6 a 10 hashtags.

## Passo a passo

1. `git pull origin main` e `npm install`.
2. Em `pauta.md`, pegue o primeiro tema `a fazer`.
3. Copie `template/novo-post/` para `postN-assunto/`, escreva `slides.html` e `legenda.md`.
4. `npm run exportar postN-assunto` e confira as imagens (texto cabendo, nada cortado).
5. Mude o status na pauta para `agendado AAAA-MM-DD`, faça commit e push na `main`.
6. Confirme que a primeira imagem abre pela URL do raw.githubusercontent.com.
7. Agende no Metricool: data D+2 às 10:00, rede instagram, `instagramData.type` POST, `media` com as URLs na ordem, texto = legenda + linha em branco + hashtags.
8. Avise na conversa do projeto com a prévia: tema, data e o link do Metricool.
