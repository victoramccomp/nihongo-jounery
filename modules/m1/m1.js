/* Módulo 1 — Os alfabetos japoneses. As aulas ficam em hiragana.js, katakana.js e romaji.js. */
NJ.Course.addModule({
  id: '1',
  jp: '文字',
  title: 'Os alfabetos japoneses',
  desc: 'Hiragana, katakana e romaji: de onde vieram, para que servem e cada caractere explicado.',
  intro: () => `
    <p>Bem-vindo à primeira etapa da jornada! Antes de qualquer palavra ou frase, você precisa conhecer as
    <b>letras</b> do japonês — e aqui vem a primeira surpresa: o japonês não tem um alfabeto, tem
    <b>três sistemas de escrita</b> que convivem na mesma frase, além de um quarto, o romaji, que serve de ponte
    para nós, estrangeiros.</p>
    <p class="sentence jp" lang="ja"><span class="sk">私</span><span class="sh">は</span><span class="sa">ブラジル</span><span class="sk">人</span><span class="sh">です</span>。</p>
    <p class="legend"><span class="sk">kanji</span> <span class="sh">hiragana</span> <span class="sa">katakana</span> —
    <i>watashi wa burajiru-jin desu</i> ("eu sou brasileiro")</p>
    <p>Neste módulo vamos estudar, nesta ordem:</p>
    <ul>
      <li><b>Hiragana</b> — a escrita que dá "cola" à língua: partículas, terminações de verbos, palavras do dia a dia.</li>
      <li><b>Katakana</b> — a escrita das palavras estrangeiras, dos nomes de fora e dos sons.</li>
      <li><b>Romaji</b> — o japonês escrito com as nossas letras: útil para começar, para digitar e para não se perder em placas.</li>
    </ul>
    <p>Os <b>kanji</b> (ideogramas de origem chinesa) ganham um módulo só para eles mais adiante.
    Cada aula termina com um teste rápido; passando com 80% ou mais, a aula é marcada como concluída.
    E sempre que quiser revisar um caractere, use a <a href="#/kana/hiragana">colinha de kana</a>.</p>`
});
