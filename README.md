# Nihongo Journey 日本語の旅

Página pessoal de estudo de japonês, 100% estática (HTML, CSS e JS puros, sem build e sem banco).
Funciona no celular e também **offline** depois do primeiro acesso (PWA: dá para "Adicionar à tela inicial").

## Módulo atual: Hiragana e Katakana

Para cada caractere (237 no total, incluindo dakuten, combinações, pequenos e estendidos):

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
css/app.css           estilos (tema claro/escuro)
js/util.js            armazenamento, áudio, ícones
js/stroke.js          animação, passo a passo e prática dos traços
js/kana.js            tabelas e ficha de cada kana
js/app.js             roteador e registro de módulos (NJ.modules)
data/sounds.js        pronúncia por som (compartilhada por hiragana e katakana)
data/hiragana.js      dados do hiragana
data/katakana.js      dados do katakana
data/strokes.js       traços (gerado a partir do KanjiVG)
fonts/                Klee One (subconjunto só com os caracteres usados)
sw.js, manifest       modo offline / instalar no celular
```

**Novo módulo:** adicione um item em `NJ.modules` (`js/app.js`), crie o JS do módulo e trate a rota em `route()`.

## Créditos e licenças

- Ordem dos traços: [KanjiVG](https://kanjivg.tagaini.net) © Ulrich Apel — CC BY-SA 3.0 (`data/strokes.js` é derivado e segue a mesma licença)
- Fonte: [Klee One](https://fonts.google.com/specimen/Klee+One) — SIL Open Font License
- Referência: [jisho.org](https://jisho.org)
