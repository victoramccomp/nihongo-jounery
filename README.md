# Nihongo Journey 日本語の旅

Página pessoal de estudo de japonês, 100% estática (HTML, CSS e JS puros, sem build e sem banco).
Funciona no celular e também **offline** depois do primeiro acesso (PWA: dá para "Adicionar à tela inicial").

## Módulos (curso)

**Módulo 1 · Os alfabetos japoneses** — três aulas, nesta ordem:

1. **Hiragana**: origem (man'yōgana, período Heian), usos, a tabela gojūon e os 46 caracteres explicados um a um
   (imagem para memorizar, escrita, som, exemplo), dakuten/handakuten, combinações, っ, vogais longas e partículas は/へ/を.
2. **Katakana**: origem nos templos budistas, usos (incluindo palavras herdadas do português), os 46 caracteres,
   os "vilões" シ/ツ/ソ/ン com traços animados lado a lado, ー, ッ e os sons estrangeiros (ファ, ティ, ヴ…).
3. **Romaji**: os jesuítas portugueses, Hepburn × Kunrei × Nihon-shiki, armadilhas de pronúncia para brasileiros,
   vogais longas e como digitar japonês, com um teclado de treino romaji → kana.

Cada aula tem testes rápidos; passar no teste final com 80% marca a aula como concluída.

## Flashcards

Botão com um raio na lateral esquerda, em qualquer página: escolha hiragana, katakana ou ambos (e, se quiser,
inclua ゛゜ e combinações). A sessão é infinita: toque no card para virar (a resposta mostra a letra com o romaji
embaixo), "Próximo" para seguir e "Finalizar" quando quiser parar. No teclado: Espaço/Enter vira, → avança, Esc finaliza.

## Ferramenta: colinha de kana

Consulta rápida de hiragana e katakana. Para cada caractere (237 no total, incluindo dakuten, combinações, pequenos e estendidos):

- **Ordem dos traços** animada (play/pausa, traço a traço, velocidade, números) e quadro passo a passo
- **Pronúncia**: romaji Hepburn e Kunrei, IPA, dica de som para quem fala português e áudio (voz japonesa do aparelho)
- **Como digitar** no teclado japonês (IME)
- **Origem** (kanji de onde veio) ou **composição** (か + ゛ = が, き + ゃ = きゃ) e o par no outro silabário
- **Não confunda com**: caracteres parecidos
- **Prática**: quadro para escrever com o dedo por cima do modelo
- **Exemplos**: ~5 palavras por caractere (kana, kanji, romaji, significado e áudio)
- Marcação **"Já sei"** com barra de progresso (salvo só no aparelho, via localStorage)

## Rodar localmente

```bash
python -m http.server 5640
```

Abra http://localhost:5640. (Abrir o `index.html` direto com dois cliques também funciona, só sem o modo offline.)

## Publicar

**GitHub Pages:** suba a pasta para um repositório → *Settings → Pages* → *Deploy from a branch* → `main` / `(root)`.
O arquivo `.nojekyll` já está incluído.

**Vercel:** *Add New → Project* → importe o repositório → *Framework Preset: Other* → sem comando de build → Deploy.

As rotas usam `#/` (ex.: `#/kana/hiragana/あ`), então não precisa de nenhuma configuração de servidor.

> Ao alterar arquivos, aumente `VERSION` em `sw.js` (`nj-v1` → `nj-v2`) para o celular buscar a versão nova.

## Estrutura

```
index.html            página única
css/app.css           estilos gerais (tema claro/escuro)
css/lesson.css        estilos das aulas
css/flash.css         estilos dos flashcards
js/util.js            armazenamento, áudio, ícones
js/stroke.js          animação, passo a passo e prática dos traços
js/kana.js            colinha: tabelas e ficha de cada kana
js/lesson.js          curso: módulos, aulas, testes, janela de traços
js/ime.js             conversor romaji → kana (teclado de treino)
js/flash.js           flashcards (botão do raio)
js/app.js             roteador, página inicial e ferramentas
modules/m1/           Módulo 1: m1.js (apresentação), hiragana.js, katakana.js, romaji.js
data/sounds.js        pronúncia por som (compartilhada por hiragana e katakana)
data/hiragana.js      dados do hiragana
data/katakana.js      dados do katakana
data/strokes.js       traços (gerado a partir do KanjiVG)
fonts/                Klee One (subconjunto só com os caracteres usados)
sw.js, manifest       modo offline / instalar no celular
```

**Novo módulo:** crie `modules/mN/mN.js` com `NJ.Course.addModule({...})` e uma aula por arquivo com
`NJ.Course.addLesson('N', {...})`; inclua os scripts no `index.html` e no `sw.js`. Ao usar caracteres japoneses
novos (kanji), regere o subconjunto da fonte em `fonts/`.

## Créditos e licenças

- Ordem dos traços: [KanjiVG](https://kanjivg.tagaini.net) © Ulrich Apel — CC BY-SA 3.0 (`data/strokes.js` é derivado e segue a mesma licença)
- Fonte: [Klee One](https://fonts.google.com/specimen/Klee+One) — SIL Open Font License
- Referência: [jisho.org](https://jisho.org)
