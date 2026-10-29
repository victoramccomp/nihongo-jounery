/* Módulo 1 · Aula 3 — Romaji */
NJ.Course.addLesson('1', {
  id: 'romaji',
  title: 'Romaji',
  jp: 'ローマ字',
  mins: 25,
  desc: 'O japonês com as nossas letras: história, sistemas, pronúncia e como digitar',
  lead: 'O romaji é a ponte entre o nosso alfabeto e o japonês. Ele ajuda muito no começo e é indispensável para digitar — mas tem armadilhas, principalmente para quem fala português.',
  quizzes: {
    kata: { title: 'Do romaji ao katakana', ask: 'roma', count: 8, pool: () => NJ.Kana.db.katakana.filter((e) => e.sec === 'base' && e.c !== 'ヲ') },
    final: { title: 'Teste final: do romaji ao hiragana', ask: 'roma', count: 12, final: true, pool: () => NJ.Kana.db.hiragana.filter((e) => (e.sec === 'base' || e.sec === 'dakuten' || e.sec === 'yoon') && !'ぢづを'.includes(e.c) && e.ex.length) }
  },
  sections: (h) => [
    {
      title: 'O que é o romaji',
      html: `
        <p><b>Romaji</b> (<span class="jp">ローマ字</span>, "letras romanas") é o japonês escrito com o alfabeto
        latino — o mesmo que usamos no português. ${h.k('す')}${h.k('し')} vira <i>sushi</i>,
        <span class="jp">にほん</span> vira <i>Nihon</i>.</p>
        <p>Ele <b>não é</b> uma escrita do dia a dia dos japoneses: ninguém escreve um bilhete ou um livro em romaji.
        Mas ele está por toda parte:</p>
        <ul>
          <li>em <b>placas</b> de estações, ruas e rodovias, para estrangeiros;</li>
          <li>nos <b>passaportes</b> e documentos internacionais;</li>
          <li>em <b>nomes de empresas e marcas</b>: Toyota, Nintendo, Yamaha;</li>
          <li>e, principalmente, no <b>teclado</b>: a maioria dos japoneses digita no computador escrevendo em romaji, que o sistema converte em kana e kanji.</li>
        </ul>
        <p>As crianças japonesas aprendem romaji no ensino fundamental, justamente por causa dos computadores.</p>`
    },
    {
      title: 'Uma história que começa com os portugueses',
      html: `
        <p>Os primeiros a escrever japonês com letras latinas fomos… nós! Os <b>jesuítas portugueses</b>, que chegaram
        ao Japão a partir de 1549 com Francisco Xavier, precisavam aprender a língua para pregar. Eles montaram uma
        tipografia e imprimiram livros em japonês romanizado — gramáticas, catecismos e até clássicos da literatura.</p>
        <p>A obra mais famosa é o <b>Vocabulario da Lingoa de Iapam</b> (Nagasaki, 1603), um dicionário
        japonês-português com mais de 30 mil verbetes. Como era escrito para portugueses, usava a ortografia do
        português da época: a cidade de Nagasaki aparece como <i>Nangasaqui</i>, e o som し era escrito <i>xi</i> —
        exatamente como nós pronunciamos.</p>
        ${h.box('curiosidade', 'Japão, Iapam, Japan', 'O próprio nome "Japão" chegou à Europa pelos portugueses: eles ouviram de chineses e malaios, no sudeste asiático, uma pronúncia de 日本 parecida com "Jepang" e escreveram <i>Iapam</i>. Daí vieram Japão, Japan, Japon…')}
        <p>Com a expulsão dos missionários no século XVII e o fechamento do país, esse sistema caiu em desuso. Quando
        o Japão reabriu, no século XIX, quem passou a dar o tom foi o inglês.</p>`
    },
    {
      title: 'Hepburn, Kunrei e Nihon-shiki',
      html: `
        <p>Hoje existem três sistemas principais de romanização:</p>
        <ul>
          <li><b>Hepburn</b> — popularizado pelo dicionário do médico e missionário americano James Curtis Hepburn
            (1867; a versão que leva seu nome é a da 3ª edição, de 1886). Escreve os sons <b>como um falante de inglês
            os ouviria</b>: shi, chi, tsu, fu, ji. É o mais usado no mundo, em placas, passaportes e dicionários.</li>
          <li><b>Nihon-shiki</b> (1885) — criado pelo físico japonês Tanakadate Aikitsu, segue <b>a lógica da tabela</b>
            de kana à risca: si, ti, tu, hu, zi, e até di e du para ぢ e づ.</li>
          <li><b>Kunrei-shiki</b> (1937, revisado em 1954) — versão oficial do governo, baseada no Nihon-shiki. É o
            ensinado nas escolas japonesas e virou norma internacional (ISO 3602).</li>
        </ul>
        <div class="table-wrap"><table class="systems">
          <thead><tr><th>Kana</th><th>Hepburn</th><th>Kunrei</th><th>Nihon-shiki</th></tr></thead>
          <tbody>
            ${[['し', 'shi', 'si', 'si'], ['ち', 'chi', 'ti', 'ti'], ['つ', 'tsu', 'tu', 'tu'], ['ふ', 'fu', 'hu', 'hu'], ['じ', 'ji', 'zi', 'zi'], ['ぢ', 'ji', 'zi', 'di'], ['づ', 'zu', 'zu', 'du'], ['を', 'o', 'o', 'wo'], ['しゃ', 'sha', 'sya', 'sya'], ['ちゃ', 'cha', 'tya', 'tya'], ['じゃ', 'ja', 'zya', 'zya']]
              .map((r) => `<tr><td>${h.k(r[0])}</td><td><b>${r[1]}</b></td><td>${r[2]}</td><td>${r[3]}</td></tr>`).join('')}
          </tbody>
        </table></div>
        <p>Em todo o resto (ka, sa, na, ma…) os três concordam. Repare que o Kunrei é mais "lógico" (a linha T é
        ta-ti-tu-te-to), mas o Hepburn é mais <b>fiel à pronúncia</b> — por isso é o preferido para estrangeiros, e
        nos últimos anos o próprio governo japonês passou a revisar a norma oficial na direção dele.</p>
        ${h.box('dica', 'E neste app?', 'Usamos o <b>Hepburn modificado</b>, o mesmo dos dicionários modernos e do jisho.org. Na colinha, cada caractere mostra também a versão Kunrei quando ela é diferente.')}`
    },
    {
      title: 'As regras do Hepburn que usamos',
      html: `
        <ul>
          <li><b>Vogais longas com traço em cima</b> (mácron): ${h.w('とうきょう', '東京', 'Tōkyō', 'Tóquio')}, ${h.w('くうき', '空気', 'kūki', 'ar')}, ${h.w('ラーメン', '', 'rāmen', 'lámen')}. O traço significa "dura o dobro".
            A exceção é o "e" longo escrito com い: mantemos <i>ei</i>, como em ${h.w('せんせい', '先生', 'sensei', 'professor')}, que soa "sensê".</li>
          <li><b>っ dobra a consoante</b>: ${h.w('きって', '切手', 'kitte', 'selo')}, ${h.w('ざっし', '雑誌', 'zasshi', 'revista')}. Antes de "ch", vira "tch": ${h.w('まっちゃ', '抹茶', 'matcha', 'chá verde em pó')}.</li>
          <li><b>ん antes de vogal ou y leva apóstrofo</b>: ${h.w('きんえん', '禁煙', "kin'en", 'proibido fumar')} (kin-en) × ${h.w('きねん', '記念', 'kinen', 'comemoração')} (ki-nen).</li>
          <li><b>ん antes de b, m, p</b>: escrevemos <i>n</i> (${h.w('しんぶん', '新聞', 'shinbun', 'jornal')}), mas muitos textos usam <i>m</i>, imitando a pronúncia: <i>shimbun</i>, <i>tempura</i>, <i>Namba</i>.</li>
          <li><b>Partículas pelo som</b>: は, へ e を viram <i>wa</i>, <i>e</i> e <i>o</i> — <span class="jp">わたしはがくせいです</span> = <i>watashi wa gakusei desu</i>.</li>
          <li><b>Espaços entre palavras</b>: o japonês não usa espaços, mas o romaji sim, para facilitar a leitura.</li>
        </ul>`
    },
    {
      title: 'Lendo romaji sem sotaque brasileiro',
      html: `
        <p>Aqui está a maior armadilha: o romaji usa letras que <b>conhecemos</b>, então tendemos a lê-las <b>como em
        português</b>. Algumas combinações enganam muito:</p>
        <div class="table-wrap"><table class="traps">
          <thead><tr><th>No romaji</th><th>Soa como</th><th>Cuidado</th></tr></thead>
          <tbody>
            <tr><td><b>ch</b>a, <b>ch</b>i</td><td>"<b>tch</b>á", "<b>tch</b>i"</td><td>Em português "ch" é "x". Em romaji é "tch": <i>chikatetsu</i> = "tchikatetsu".</td></tr>
            <tr><td><b>sh</b>i, <b>sh</b>o</td><td>"<b>x</b>i", "<b>x</b>ô"</td><td>Esse é o nosso "x" (ou "ch").</td></tr>
            <tr><td><b>j</b>a, <b>j</b>i</td><td>"<b>dj</b>á", "<b>dj</b>i"</td><td>Não é o "j" de "janela": tem um "d" na frente.</td></tr>
            <tr><td><b>r</b>a, <b>r</b>o</td><td>"ca<b>r</b>o"</td><td>Sempre o "r" fraco, mesmo no início: <i>rāmen</i> não é "rrámen".</td></tr>
            <tr><td><b>h</b>a, <b>h</b>i</td><td>"<b>rr</b>a" suave</td><td>O "h" é aspirado, nunca mudo: <i>hon</i> não é "on".</td></tr>
            <tr><td>a<b>s</b>a</td><td>"a<b>ss</b>a"</td><td>"S" nunca vira "z" entre vogais.</td></tr>
            <tr><td><b>g</b>i, <b>g</b>e</td><td>"<b>gu</b>i", "<b>gu</b>ê"</td><td>"G" sempre duro: <i>geta</i> é "guêta".</td></tr>
            <tr><td>sak<b>e</b>, Toky<b>o</b></td><td>"sak<b>ê</b>", "Tôqui<b>ô</b>"</td><td>"E" e "o" finais não viram "i" e "u".</td></tr>
            <tr><td>des<b>u</b>, s<b>u</b>ki</td><td>"dess", "ski"</td><td>O "u" (e às vezes o "i") entre consoantes surdas quase some.</td></tr>
            <tr><td><b>ts</b>u</td><td>"<b>ts</b>u"</td><td>Som que não existe no português; não é "tu" nem "su".</td></tr>
            <tr><td><b>y</b>a, <b>w</b>a</td><td>"<b>i</b>á", "<b>u</b>á"</td><td>Semivogais, numa batida só.</td></tr>
            <tr><td>Ky<b>ō</b>to</td><td>"Kyô-o-to"</td><td>A vogal com traço dura o dobro: são 3 batidas, não 2.</td></tr>
          </tbody>
        </table></div>
        ${h.box('atencao', 'O caso "Kyoto"', 'Brasileiros costumam dizer "Qui-ô-to", em três sílabas. Em japonês é <b>kyō-to</b>: o "kyo" é uma sílaba só (きょ), seguida de um "o" esticado. Experimente: ' + h.w('きょうと', '京都', 'Kyōto', 'Quioto') + '.')}`
    },
    {
      title: 'O problema das vogais longas',
      html: `
        <p>Como o alfabeto latino não tem uma forma "oficial" de indicar vogal longa, a mesma cidade aparece escrita de
        vários jeitos. Todos estes são <span class="jp">とうきょう</span>:</p>
        <div class="pairs"><span><b>Tōkyō</b> Hepburn com mácron</span><span><b>Tôkyô</b> Kunrei, com circunflexo</span>
        <span><b>Toukyou</b> letra por letra, como se digita</span><span><b>Tohkyoh</b> estilo passaporte</span>
        <span><b>Tokyo</b> sem marca, como no Ocidente</span></div>
        <p>O último é o mais comum fora do Japão, mas <b>perde informação</b>: em "Tokyo" você não sabe que os dois "o"
        são longos. Por isso, nos estudos, prefira sempre a forma com mácron — ou, melhor ainda, leia o kana.</p>
        ${h.box('curiosidade', 'Passaportes', 'Nos passaportes japoneses, os nomes vão em Hepburn <b>sem</b> marca de vogal longa: o sobrenome おおの (Ōno) vira ONO — mas a pessoa pode pedir a grafia OHNO.')}`
    },
    {
      title: 'Digitando em japonês',
      html: `
        <p>Para digitar japonês no celular ou no computador, você escreve em romaji e o teclado (o <b>IME</b>) converte
        para kana enquanto você digita. Depois, com espaço, ele sugere os kanji: <i>nihongo</i> → にほんご → 日本語.
        Experimente aqui:</p>
        ${h.ime()}
        <p>Alguns atalhos que todo teclado japonês entende:</p>
        <div class="table-wrap"><table class="systems">
          <thead><tr><th>Para escrever</th><th>Digite</th><th>Exemplo</th></tr></thead>
          <tbody>
            <tr><td>${h.k('ん')}</td><td><code>nn</code> (ou n antes de consoante)</td><td><code>honn</code> → ほん</td></tr>
            <tr><td>${h.k('っ')}</td><td>dobre a consoante</td><td><code>kitte</code> → きって</td></tr>
            <tr><td>${h.k('を')}</td><td><code>wo</code></td><td><code>wo</code> → を</td></tr>
            <tr><td>${h.k('ぢ')} / ${h.k('づ')}</td><td><code>di</code> / <code>du</code></td><td><code>tuduku</code> → つづく</td></tr>
            <tr><td>${h.k('ー')}</td><td>tecla de hífen <code>-</code></td><td><code>ra-men</code> → らーめん</td></tr>
            <tr><td>pequenos</td><td><code>x</code> ou <code>l</code> + letra</td><td><code>xya</code> → ゃ, <code>xtu</code> → っ</td></tr>
            <tr><td>${h.k('ティ')}</td><td><code>thi</code></td><td><code>pa-thi-</code> → ぱーてぃー</td></tr>
          </tbody>
        </table></div>
        ${h.box('dica', 'Como ativar o teclado japonês', '<b>Android (Gboard)</b>: Configurações do Gboard → Idiomas → Adicionar teclado → Japonês → escolha "QWERTY". <br><b>iPhone</b>: Ajustes → Geral → Teclado → Teclados → Adicionar Novo Teclado → Japonês → Romaji. <br><b>Windows</b>: Configurações → Hora e idioma → Idioma → Adicionar idioma → Japonês; alterne entre letras e kana clicando no "A / あ" da barra de tarefas.')}
        <p>Mais para frente, vale conhecer também o teclado de <b>12 teclas</b> (<i>flick</i>), em que você desliza o dedo
        sobre あ, か, さ… — é o preferido dos japoneses no celular, mas exige saber a tabela de cor. Você já está no caminho!</p>
        ${h.quiz('kata')}`
    },
    {
      title: 'Quando largar o romaji',
      html: `
        <p>Pense no romaji como as <b>rodinhas da bicicleta</b>: ótimas para começar, péssimas se ficarem para sempre.
        Alguns motivos para trocá-lo pelo kana o quanto antes:</p>
        <ul>
          <li><b>Ele esconde informação</b>: "oo", "ō", "ou", "o"… o kana mostra exatamente o que é escrito.</li>
          <li><b>Ele puxa o seu sotaque</b>: lendo letras latinas, o cérebro aplica as regras do português (o "r" forte, o "e" que vira "i").</li>
          <li><b>Nenhum material japonês usa romaji</b>: mangás, placas de loja, cardápios, redes sociais — tudo em kana e kanji.</li>
          <li><b>Os kanji vão precisar do kana</b>: as leituras dos kanji (e o furigana) estão em hiragana.</li>
        </ul>
        ${h.box('dica', 'Conselho do professor', 'A partir de agora, sempre que vir uma palavra aqui no app, <b>leia o kana primeiro</b> e só confira o romaji depois. Na colinha, desligue o botão "Romaji" e teste-se. Em duas ou três semanas, você vai perceber que nem olha mais para ele.')}`
    },
    {
      title: 'Teste final',
      html: `
        <p>Agora o caminho inverso: você vê o romaji e escolhe o hiragana certo, incluindo combinações como
        <i>kya</i> e <i>sho</i>. 12 perguntas; com 80% ou mais, a aula — e o módulo — fica concluída.</p>
        ${h.quiz('final')}
        <p>Fim do Módulo 1! Você conhece agora os três "alfabetos" que vai usar para sempre no japonês.
        お疲れさまでした！ <i>(otsukaresama deshita — "bom trabalho!")</i></p>`
    }
  ]
});
