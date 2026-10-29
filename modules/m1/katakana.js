/* Módulo 1 · Aula 2 — Katakana */
(function () {
  const notes = {
    'ア': 'Um traço que dobra e uma perninha caindo: um <b>a</b>rco com a flecha pendurada. Veio do lado esquerdo de 阿.',
    'イ': 'É o "radical de pessoa" (亻) dos kanji: uma pessoa em pé dizendo "<b>I</b>" — "eu", em inglês.',
    'ウ': 'É う com um telhado: um tracinho, uma tampa e o corpo curvo. Veio da parte de cima de 宇.',
    'エ': 'Chão, poço e teto: um <b>e</b>levador visto de lado. Igual ao kanji 工 (obra).',
    'オ': 'Uma cruz com a perna chutando para a esquerda e um tracinho: o goleiro gritando "<b>ó</b>!".',
    'カ': 'É か sem o tracinho voando, e igual ao kanji 力 (força): o <b>ka</b>rateca, agora sério e reto.',
    'キ': 'き sem a curva de baixo: a mesma chave (<i>key</i>), só que reta.',
    'ク': 'Um bico de <b>cu</b>co anguloso, com dois traços. Cuidado com ケ e タ, que são primos.',
    'ケ': 'Parece uma letra <b>K</b> torta — "ke". Três traços: o último desce reto.',
    'コ': 'Uma caixa aberta do lado esquerdo: um <b>co</b>rredor visto de cima. Compare com ユ (aberto em cima) e ロ (fechado).',
    'サ': 'Dois postes com uma faixa atravessada e um deles curvando: a placa de <b>sa</b>ída.',
    'シ': 'Dois pontos <b>um embaixo do outro</b>, quase deitados, e um traço longo que <b>sobe</b>: um rosto sorrindo de lado — "<b>xi</b>!".',
    'ス': 'Um traço deitado e uma perna aberta: alguém de esqui de<b>s</b>cendo a montanha — "<b>su</b>".',
    'セ': 'É せ sem a segunda perna: um pedaço de <b>ce</b>rca com uma tábua dobrada.',
    'ソ': 'Um pontinho e um traço longo que <b>desce</b> de cima para baixo: uma gota de <b>so</b>ro escorrendo.',
    'タ': 'É ク com um traço no meio: um <b>ta</b>co cruzado na cesta. Veio da parte de cima de 多.',
    'チ': 'Igual ao kanji 千 (mil): mil <b>chi</b>clets numa caixa. Som "tchi".',
    'ツ': 'Dois pontos <b>lado a lado</b>, mais em pé, e um traço longo que <b>desce</b>: três gotas de um <b>tsu</b>nami. Veio de 川 (rio).',
    'テ': 'Dois traços deitados e uma perna: um poste de <b>te</b>lefone com os fios.',
    'ト': 'Um poste com uma plaquinha: um <b>to</b>tem. Igual ao kanji 卜 (adivinhação).',
    'ナ': 'Uma cruz com a perna puxada para a esquerda: uma faca — ナイフ (<b>na</b>ifu)!',
    'ニ': 'Dois traços: igual ao kanji 二 (dois). Só lembrar que "<b>ni</b>" também é o número dois em japonês.',
    'ヌ': 'É ス com um tracinho cortando a perna: uma tesoura cortando um <b>nó</b>.',
    'ネ': 'Um pontinho, um traço com dobra e pernas: um altar (礻) onde se reza para o gato, ne<b>ko</b>.',
    'ノ': 'Um traço só, inclinado: um dedo balançando — "<b>no</b>, não".',
    'ハ': 'Dois traços se afastando: duas covinhas de quem ri "<b>ha</b> ha". Igual ao kanji 八 (oito).',
    'ヒ': 'Um traço deitado e uma colher: a parte direita de 比. Som de "h" soprado, "<b>hi</b>".',
    'フ': 'Um gancho só — o monte <b>Fu</b>ji visto de lado, sem as nuvens de ふ.',
    'ヘ': 'Praticamente igual ao hiragana へ: o pico da montanha, "<b>he</b>!".',
    'ホ': 'Uma árvore (木) com dois galhos de enfeite: árvore de Natal — "<b>ho</b> ho ho".',
    'マ': 'Um traço que dobra e um pontinho dentro: um <b>ma</b>rtelo visto de cima.',
    'ミ': 'Três traços inclinados, como o kanji 三 (três): "<b>mi</b>-mi-mi", três vezes.',
    'ム': 'Um braço dobrado fazendo <b>mú</b>sculo, com o punho (o tracinho) fechado.',
    'メ': 'Um X marcando o lugar no mapa: "é aqui <b>mes</b>mo".',
    'モ': 'É も "endireitado": dois traços deitados atravessados por um anzol.',
    'ヤ': 'É や sem o pontinho: o <b>ia</b>que perdeu um chifre.',
    'ユ': 'Um "U" quadrado deitado, aberto em cima: "<b>you</b>". Veio de um pedaço de 由.',
    'ヨ': 'Um "E" espelhado: "<b>yo</b>" é o "E" visto pelo outro lado.',
    'ラ': 'Um tracinho em cima e um gancho: uma <b>ra</b>quete. É う sem o pingo.',
    'リ': 'Igual ao hiragana り, só que mais reto: o <b>ri</b>acho em linhas retas.',
    'ル': 'Duas pernas, a da direita com uma bota levantada: andando pela <b>ru</b>a.',
    'レ': 'Um traço que desce e sobe: um <b>L</b> inclinado — "<b>re</b>". É uma perna só de ル.',
    'ロ': 'Um quadrado: uma <b>ro</b>da quadrada. Igual ao kanji 口 (boca), só que um pouco menor.',
    'ワ': 'Uma taça vista de lado: taça de vinho, ワイン (<b>wa</b>in). Parece ウ sem o tracinho de cima.',
    'ヲ': 'Quase não se usa hoje: aparece em textos escritos só em katakana, no lugar da partícula を.',
    'ン': 'Um pontinho <b>deitado</b> e um traço que <b>sobe</b>: o "n" de quem dá uma piscadinha. Compare sempre com ソ.'
  };

  NJ.Course.addLesson('1', {
    id: 'katakana',
    title: 'Katakana',
    jp: 'カタカナ',
    mins: 35,
    desc: 'A escrita das palavras estrangeiras, os 46 caracteres e os sons novos',
    lead: 'Mesmos sons, outra cara: o katakana é o "itálico" do japonês, usado para tudo o que vem de fora ou precisa chamar atenção. Com ele você vai ler cardápios, placas e o próprio nome.',
    quizzes: {
      inicio: { title: 'Até aqui: linhas A, K, S e T', ask: 'kana', count: 10, pool: () => NJ.Kana.db.katakana.filter((e) => e.sec === 'base' && 'アイウエオカキクケコサシスセソタチツテト'.includes(e.c)) },
      viloes: { title: 'Os vilões: シ ツ ソ ン e companhia', ask: 'roma', count: 8, pool: () => NJ.Kana.db.katakana.filter((e) => 'シツソンクケタウワフアマスヌコユロ'.includes(e.c)) },
      final: { title: 'Teste final da aula', ask: 'mix', count: 15, final: true, pool: () => NJ.Kana.db.katakana.filter((e) => (e.sec === 'base' || e.sec === 'dakuten') && !'ヂヅヲ'.includes(e.c)) }
    },
    sections: (h) => [
      {
        title: 'O que é o katakana',
        html: `
          <p>O katakana é o <b>segundo silabário</b> do japonês. Ele tem exatamente os <b>mesmos sons</b> do hiragana
          — ${h.k('あ')} e ${h.k('ア')} são ambos "a", ${h.k('か')} e ${h.k('カ')} são ambos "ka" —, mas com formas
          <b>retas e angulosas</b>, feitas de traços curtos.</p>
          <p>Se o hiragana é a letra "cursiva" do japonês, o katakana é a letra de forma, quase de bastão. E ele tem uma
          função bem marcada: sinalizar ao leitor que aquela palavra é <b>diferente</b> — estrangeira, sonora, técnica
          ou enfatizada.</p>
          ${h.box('dica', 'O nome', '<span class="jp">カタカナ</span> vem de <i>kata</i> (parcial, incompleto) + <i>kana</i>. É "a escrita de pedaços" — você já vai entender por quê.')}`
      },
      {
        title: 'De onde ele veio',
        html: `
          <p>O katakana nasceu no mesmo período do hiragana (século IX), mas em outro ambiente: os <b>templos
          budistas</b>. Os monges estudavam sutras escritos em chinês clássico e precisavam anotar, nas entrelinhas,
          como ler aquilo em japonês — terminações, partículas, a ordem das palavras.</p>
          <p>O espaço era mínimo e a escrita tinha de ser rápida. A solução: em vez de escrever o kanji inteiro (como
          no man'yōgana), escrever <b>só um pedaço dele</b>. Daí o nome "kata", parcial.</p>
          <div class="evo">${[['阿', 'ア', 'lado esquerdo'], ['伊', 'イ', 'lado esquerdo'], ['加', 'カ', 'lado esquerdo'], ['多', 'タ', 'parte de cima'], ['江', 'エ', 'lado direito'], ['千', 'チ', 'inteiro'], ['八', 'ハ', 'inteiro'], ['三', 'ミ', 'inteiro']].map((p) => `<span><b class="jp">${p[0]}</b><i>→</i>${h.k(p[1])}<small>${p[2]}</small></span>`).join('')}</div>
          <p>Enquanto o hiragana ficou associado à literatura e às mulheres da corte, o katakana ficou associado ao
          estudo, aos documentos e aos homens. Na era Meiji (1868–1912), leis e documentos oficiais — inclusive a
          Constituição de 1889 — eram escritos em kanji com <b>katakana</b>. Só depois da Segunda Guerra o hiragana
          assumiu esse papel. E até o século XX os <b>telegramas</b> eram transmitidos todos em katakana.</p>`
      },
      {
        title: 'Para que ele é usado hoje',
        html: `
          <ul>
            <li><b>Palavras estrangeiras</b> (<i>gairaigo</i>) — a maior parte vinda do inglês:
              ${h.w('テレビ', '', 'terebi', 'televisão')}, ${h.w('コンピューター', '', 'konpyūtā', 'computador')}.</li>
            <li><b>Nomes de pessoas e lugares estrangeiros</b>: ${h.w('ブラジル', '', 'burajiru', 'Brasil')}, ${h.w('サンパウロ', '', 'sanpauro', 'São Paulo')}.</li>
            <li><b>Onomatopeias</b>: ${h.w('ドキドキ', '', 'dokidoki', 'coração batendo')}, ${h.w('ワンワン', '', 'wanwan', 'au-au')}. Nos mangás, os efeitos sonoros são quase todos em katakana.</li>
            <li><b>Ênfase</b>, como o nosso itálico ou negrito: uma palavra japonesa comum pode aparecer em katakana para chamar atenção, em placas, propagandas e títulos.</li>
            <li><b>Nomes científicos</b> de animais e plantas: em textos de biologia, gato é ネコ e ser humano é ヒト.</li>
            <li><b>Marcas e empresas</b>: ${h.w('トヨタ', '', 'toyota', 'Toyota')}, ${h.w('ソニー', '', 'sonī', 'Sony')}.</li>
          </ul>
          ${h.box('curiosidade', 'Palavras que o japonês herdou do português', `Os portugueses chegaram ao Japão em 1543 e deixaram palavras usadas até hoje: ${h.w('パン', '', 'pan', 'pão')}, ${h.w('タバコ', '', 'tabako', 'tabaco, cigarro')}, ${h.w('ボタン', '', 'botan', 'botão')}, ${h.w('カッパ', '', 'kappa', 'capa de chuva')}, ${h.w('カルタ', '', 'karuta', 'carta, jogo de cartas')}, ${h.w('カステラ', '', 'kasutera', 'pão de ló, de "pão de Castela"')} e ${h.w('コンペイトウ', '', 'konpeitō', 'confeito')}.`)}
          ${h.box('atencao', 'Mito: arigatō não vem de "obrigado"', 'A semelhança é coincidência. <i>Arigatō</i> vem do japonês antigo <i>arigatashi</i> (有り難し, "difícil de existir", ou seja, "raro, precioso") e já era usado antes de os portugueses chegarem.')}`
      },
      {
        title: 'Lado a lado com o hiragana',
        html: `
          <p>Como os dois silabários têm os mesmos sons, a tabela do katakana segue <b>exatamente a mesma grade</b>:
          a, ka, sa, ta, na, ha, ma, ya, ra, wa. Tudo o que você aprendeu sobre pronúncia na aula de hiragana vale aqui.</p>
          <p>Alguns pares nasceram do mesmo kanji e por isso <b>se parecem</b> — use isso a seu favor:</p>
          <div class="pairs">
            <span>${h.k('か')} ${h.k('カ')} ka</span><span>${h.k('き')} ${h.k('キ')} ki</span><span>${h.k('せ')} ${h.k('セ')} se</span>
            <span>${h.k('へ')} ${h.k('ヘ')} he</span><span>${h.k('も')} ${h.k('モ')} mo</span><span>${h.k('や')} ${h.k('ヤ')} ya</span>
            <span>${h.k('り')} ${h.k('リ')} ri</span><span>${h.k('う')} ${h.k('ウ')} u</span>
          </div>
          <p>Outros saíram do mesmo kanji por caminhos diferentes e ficaram irreconhecíveis: ${h.k('ね')} e ${h.k('ネ')}
          vêm ambos de 祢 — o hiragana do kanji inteiro em cursivo, o katakana só do lado esquerdo. E há os que vieram de
          kanji diferentes: ${h.k('ア')} veio de 阿, enquanto ${h.k('あ')} veio de 安.</p>`
      },
      {
        title: 'As vogais: ア イ ウ エ オ',
        html: `${h.row('アイウエオ', notes)}`
      },
      {
        title: 'Linha K: カ キ ク ケ コ',
        html: `${h.row('カキクケコ', notes)}
          ${h.box('atencao', 'ク, ケ e タ', 'ク tem 2 traços. タ é ク com um tracinho no meio. ケ tem o segundo traço deitado e um terceiro descendo reto, como um K.')}`
      },
      {
        title: 'Linha S: サ シ ス セ ソ',
        html: `${h.row('サシスセソ', notes)}
          <p>Aqui moram dois dos quatro "vilões" do katakana: ${h.k('シ')} e ${h.k('ソ')}. Daqui a pouco teremos uma
          seção só para eles.</p>`
      },
      {
        title: 'Linha T: タ チ ツ テ ト',
        html: `${h.row('タチツテト', notes)}
          ${h.quiz('inicio')}`
      },
      {
        title: 'Linha N: ナ ニ ヌ ネ ノ',
        html: `${h.row('ナニヌネノ', notes)}
          <p>${h.k('ヌ')} é raro em palavras estrangeiras; ${h.k('ノ')} é tão simples que às vezes passa despercebido no meio da palavra, como em ${h.w('ピアノ', '', 'piano', 'piano')}.</p>`
      },
      {
        title: 'Linha H: ハ ヒ フ ヘ ホ',
        html: `${h.row('ハヒフヘホ', notes)}
          <p>Como no hiragana, ${h.k('フ')} é o "f" soprado — e é ele que o japonês usa para imitar o nosso "f":
          ${h.w('フランス', '', 'furansu', 'França')}.</p>`
      },
      {
        title: 'Linha M: マ ミ ム メ モ',
        html: `${h.row('マミムメモ', notes)}`
      },
      {
        title: 'Linha Y: ヤ ユ ヨ',
        html: `${h.row('ヤユヨ', notes)}`
      },
      {
        title: 'Linha R: ラ リ ル レ ロ',
        html: `${h.row('ラリルレロ', notes)}
          <p>Como o japonês não distingue "r" e "l", os dois viram a linha R: <i>lemon</i> → ${h.w('レモン', '', 'remon', 'limão')}, <i>hotel</i> → ${h.w('ホテル', '', 'hoteru', 'hotel')}.</p>`
      },
      {
        title: 'Linha W e o ン',
        html: `${h.row('ワヲン', notes)}`
      },
      {
        title: 'Os vilões: シ ツ ソ ン',
        html: `
          <p>Estes quatro confundem até japonês com letra apressada. O segredo não é a forma final, e sim
          <b>a direção dos traços</b> — por isso vale assistir às animações:</p>
          ${h.compare('シツソン')}
          <ul>
            <li><b>シ</b> e <b>ン</b>: o traço longo <b>sobe</b>, de baixo-esquerda para cima-direita. Os pontos ficam mais <b>deitados</b>.</li>
            <li><b>ツ</b> e <b>ソ</b>: o traço longo <b>desce</b>, de cima para baixo. Os pontos ficam mais <b>em pé</b>.</li>
            <li>シ e ツ têm dois pontos; ソ e ン têm um só.</li>
          </ul>
          ${h.box('dica', 'Frase para lembrar', '<b>S</b>hi e <b>N</b> "<b>sobem</b>" a montanha olhando para o céu (pontinhos deitados, rosto para cima). <b>Ts</b>u e <b>So</b> "<b>descem</b>" como chuva (pontinhos caindo).')}
          <p>Outros grupos para ficar de olho:</p>
          ${h.compare('クケタ')}
          ${h.compare('ウワフ')}
          <ul>
            <li>${h.k('ア')} × ${h.k('マ')} — ア tem a perninha para fora; マ tem um ponto dentro.</li>
            <li>${h.k('ス')} × ${h.k('ヌ')} — ヌ tem um tracinho a mais cortando a perna.</li>
            <li>${h.k('コ')} × ${h.k('ユ')} × ${h.k('ロ')} — aberto à esquerda, aberto em cima, fechado.</li>
            <li>${h.k('チ')} × ${h.k('テ')} — チ tem o traço de cima inclinado e a perna atravessando; テ tem dois traços retos e a perna pendurada.</li>
            <li>${h.k('ナ')} × ${h.k('メ')} — ナ é uma cruz; メ é um X.</li>
          </ul>
          ${h.quiz('viloes')}`
      },
      {
        title: 'Sons derivados e combinações',
        html: `
          <p>Aqui não há novidade: ゛ e ゜ funcionam igual ao hiragana. ${h.k('カ')} → ${h.k('ガ')}, ${h.k('サ')} → ${h.k('ザ')},
          ${h.k('タ')} → ${h.k('ダ')}, ${h.k('ハ')} → ${h.k('バ')} e ${h.k('パ')}. As combinações também:
          ${h.k('キャ')}, ${h.k('シュ')}, ${h.k('チョ')}, ${h.k('ニュ')}…</p>
          <p>Elas aparecem muito em palavras estrangeiras: ${h.w('ジュース', '', 'jūsu', 'suco')}, ${h.w('ニュース', '', 'nyūsu', 'notícias')},
          ${h.w('ピカチュウ', '', 'pikachū', 'Pikachu')}.</p>
          <p>Uma diferença: ${h.k('ヂ')} e ${h.k('ヅ')} praticamente não existem em katakana. Os sons "ji" e "zu" são sempre ${h.k('ジ')} e ${h.k('ズ')}.</p>`
      },
      {
        title: 'ー e ッ: esticar e pausar',
        html: `
          <p>No katakana, as vogais longas não são escritas repetindo a vogal: usa-se um <b>traço</b>, o
          ${h.k('ー')} (<i>chōonpu</i>). Ele estica o som anterior por mais uma batida:</p>
          <ul>
            <li>${h.w('ケーキ', '', 'kēki', 'bolo')} — ke-e-ki</li>
            <li>${h.w('コーヒー', '', 'kōhī', 'café')} — ko-o-hi-i</li>
            <li>${h.w('ビール', '', 'bīru', 'cerveja')} × ${h.w('ビル', '', 'biru', 'prédio')} — o traço muda tudo!</li>
          </ul>
          <p>Em texto vertical, o ー também fica vertical. E o ${h.k('ッ')} pequeno faz a mesma pausa do っ do hiragana —
          e aparece bastante, porque o japonês usa a pausa para imitar consoantes "secas" do inglês:
          ${h.w('ベッド', '', 'beddo', 'cama')}, ${h.w('サッカー', '', 'sakkā', 'futebol')}.</p>`
      },
      {
        title: 'Sons estrangeiros: ファ, ティ, ヴ…',
        html: `
          <p>Alguns sons do inglês e do português não existem no japonês tradicional. Para eles, o katakana usa
          <b>vogais pequenas</b> (ァ ィ ゥ ェ ォ) combinadas com outros caracteres:</p>
          <div class="pairs">
            <span>${h.k('ファ')} fa</span><span>${h.k('フィ')} fi</span><span>${h.k('フェ')} fe</span><span>${h.k('フォ')} fo</span>
            <span>${h.k('ティ')} ti</span><span>${h.k('ディ')} di</span><span>${h.k('トゥ')} tu</span>
            <span>${h.k('ウィ')} wi</span><span>${h.k('ウェ')} we</span><span>${h.k('ウォ')} wo</span>
            <span>${h.k('シェ')} she</span><span>${h.k('ジェ')} je</span><span>${h.k('チェ')} che</span><span>${h.k('ヴ')} vu</span>
          </div>
          <p>Repare em ${h.k('ティ')}: é um "ti" puro, sem chiar, como o "ti" nordestino — algo que o japonês
          tradicional não tem (lá, "ti" vira "chi"). Já o ${h.k('ヴ')} imita o "v", mas muita gente pronuncia como "b",
          e várias palavras têm as duas grafias: ヴァイオリン = バイオリン (violino).</p>
          ${h.box('regra', 'Como uma palavra vira katakana', 'O japonês quase não tem consoante sozinha, então ele <b>coloca uma vogal</b> depois de cada uma — geralmente "u" (ou "o" depois de t e d): <i>Christmas</i> → ク・リ・ス・マ・ス (<i>kurisumasu</i>). "L" vira "r", "v" costuma virar "b", "er" no fim vira um "a" longo: <i>computer</i> → コンピューター.')}
          <p>Seu nome também tem versão em katakana! Alguns exemplos de nomes brasileiros:</p>
          <div class="pairs names">
            <span>${h.w('マリア', '', 'maria', 'Maria')}</span><span>${h.w('アナ', '', 'ana', 'Ana')}</span>
            <span>${h.w('ルーカス', '', 'rūkasu', 'Lucas')}</span><span>${h.w('ガブリエル', '', 'gaburieru', 'Gabriel')}</span>
            <span>${h.w('ラファエル', '', 'rafaeru', 'Rafael')}</span><span>${h.w('ビクトル', '', 'bikutoru', 'Victor')}</span>
            <span>${h.w('ジョアン', '', 'joan', 'João')}</span><span>${h.w('リオデジャネイロ', '', 'riodejaneiro', 'Rio de Janeiro')}</span>
          </div>`
      },
      {
        title: 'Teste final',
        html: `
          <p>15 perguntas com os caracteres básicos e os com ゛ e ゜. Lembre-se dos vilões! Com 80% ou mais, a aula
          é marcada como concluída.</p>
          ${h.quiz('final')}
          <p class="muted small">Para revisar, abra a <a href="#/kana/katakana">colinha de katakana</a>. Um bom
          exercício: procure palavras em katakana em embalagens de produtos japoneses e tente lê-las.</p>`
      }
    ]
  });
})();
