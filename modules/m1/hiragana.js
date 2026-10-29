/* Módulo 1 · Aula 1 — Hiragana */
(function () {
  /* Explicação de cada caractere: imagem para memorizar + detalhe de escrita ou som. */
  const notes = {
    'あ': 'Uma cruz em cima de um laço grande: imagine uma <b>âncora</b> presa a uma corda enrolada — "<b>a</b>ncora". Repare que o laço cruza o traço vertical.',
    'い': 'Dois traços em pé, o da esquerda com um ganchinho: parecem duas letras <b>i</b> sem pingo, lado a lado — "ii".',
    'う': 'Um tracinho em cima e uma curva que se abre para a direita: um rosto de perfil fazendo "<b>uuu</b>" com a boca.',
    'え': 'Tracinho em cima e um corpo que termina num rabinho ondulado: alguém <b>e</b>scorregando e deixando rastro.',
    'お': 'Parece あ, mas o laço se abre e um pingo fica solto à direita: uma bola que escapou — "<b>o</b>h!".',
    'か': 'Um traço com gancho cortado por outro, e um tracinho voando à direita: um lutador de <b>ka</b>ratê com o grito saindo da boca.',
    'き': 'Dois traços horizontais cortados por um vertical, e uma curva embaixo: uma chave antiga — <i>key</i>, "<b>ki</b>". À mão, a curva de baixo fica separada.',
    'く': 'Um único traço em "<": o bico aberto de um <b>cu</b>co cantando "cu-cu".',
    'け': 'Uma barra à esquerda e, ao lado, uma cruz de perna comprida: alguém olhando um cartaz e perguntando "<b>quê</b>?".',
    'こ': 'Dois traços deitados, um sobre o outro: duas <b>co</b>lheres na gaveta.',
    'さ': 'É como き com um traço horizontal a menos. Se き é a chave, さ é a <b>sa</b>ída — o mesmo desenho, mais simples.',
    'し': 'Um anzol só: você puxa a linha e... "<b>xi</b>", o peixe escapou! Lembre: o som é "xi", não "si".',
    'す': 'Um traço deitado e uma corda que dá um laço e desce: quem <b>su</b>biu e agora desce de rapel.',
    'せ': 'Traço deitado com duas pernas, a da direita curvada para baixo: um pedaço de <b>ce</b>rca.',
    'そ': 'Um zigue-zague em cima e uma curva embaixo, como o <b>so</b>be-e-desce de uma montanha-russa. Pode ser escrito em 1 ou 2 traços.',
    'た': 'Parece as letras <b>t</b> e <b>a</b> escritas juntas: "ta". Um dos truques mais famosos para aprender hiragana.',
    'ち': 'É さ espelhado: a barriga vira para a direita. Som de "<b>tchi</b>", como o "tia" carioca.',
    'つ': 'Uma onda só: <b>tsu</b>nami (つなみ é escrita com ela!). O som "ts" não existe em português — treine com "tsunami".',
    'て': 'Um braço estendido com a mão no fim — e て é justamente a palavra "<b>mão</b>" em japonês.',
    'と': 'Um dedão do pé (<i>toe</i>, "<b>to</b>") com uma farpa espetada.',
    'な': 'Uma cruz, um pontinho e um laço: um <b>na</b>vio amarrado no cais.',
    'に': 'Uma perna (o traço vertical) ao lado de こ: <i>knee</i>, joelho em inglês — "<b>ni</b>".',
    'ぬ': 'Fios cruzados que terminam num laço: <b>nu</b>dles (macarrão) enrolados no hashi. Diferente de め, ぬ tem o laço no fim.',
    'ね': 'Uma barra e uma curva que termina enrolada: um gato (<b>ne</b>ko, ねこ) com o rabo enrolado.',
    'の': 'Um círculo cortado, como a placa de proibido: "<b>no</b>!". É também uma das partículas mais usadas da língua.',
    'は': 'Uma barra à esquerda e uma cruz com laço: alguém dando risada de lado — "<b>ha</b> ha!". Como partícula, lê-se "wa".',
    'ひ': 'Um sorriso largo de orelha a orelha: "<b>hi</b> hi hi". Som de "h" bem soprado.',
    'ふ': 'Um gancho no meio e três pontos em volta: o monte <b>Fu</b>ji com nuvens ao redor. São 4 traços.',
    'へ': 'O pico de uma montanha: quem chega lá em cima grita "<b>he</b>!". Como partícula de direção, lê-se "e".',
    'ほ': 'É は com um traço a mais em cima, como um gorro de Papai Noel: "<b>ho</b> ho ho!".',
    'ま': 'Uma cruz com dois traços horizontais e um laço embaixo: o avental amarrado da <b>ma</b>mãe.',
    'み': 'Parece o número "21" escrito à mão, com um rabinho à direita: "<b>mi</b>" — vinte e um de <b>mi</b>m.',
    'む': 'Uma vaca vista de lado, com o rabinho (o ponto) no alto: "<b>muuu</b>".',
    'め': 'Um olho com um cílio — e め é justamente a palavra "<b>olho</b>" (目). Diferente de ぬ: め termina aberta.',
    'も': 'Um anzol com duas iscas: para pescar <b>mo</b>re (mais) peixes. Compare com し, o anzol simples.',
    'や': 'Um <b>ia</b>que com chifres: o traço curvo é o corpo, o pontinho é o chifre.',
    'ゆ': 'Um peixe nadando de lado, com a espinha atravessando o corpo — no ofurô, a água quente se chama <b>yu</b> (湯).',
    'よ': 'Um <b>io</b>iô pendurado no barbante, com o nó embaixo.',
    'ら': 'Um ponto em cima e uma curva aberta: um <b>ra</b>to sentado olhando para a direita.',
    'り': 'Dois fios d\'água descendo: um <b>ri</b>acho. À mão são 2 traços separados.',
    'る': 'Um 3 que termina numa voltinha: a <b>ru</b>a com rotatória no fim. Compare com ろ, que termina aberto.',
    'れ': 'Uma barra e uma curva que termina em perninha para fora: alguém fazendo <b>re</b>verência.',
    'ろ': 'Como る, mas sem o laço: uma <b>ro</b>da que perdeu o pneu.',
    'わ': 'Barra e curva grande aberta: alguém bocejando de braço esticado — "<b>uaaa</b>". Compare com ね (laço) e れ (perninha).',
    'を': 'Alguém tropeçando com o pé torto: "<b>oh</b>!". Hoje soa "o" e serve só como partícula.',
    'ん': 'Um "n" minúsculo escrito com pressa. É o único som do japonês que é só consoante.'
  };

  NJ.Course.addLesson('1', {
    id: 'hiragana',
    title: 'Hiragana',
    jp: 'ひらがな',
    mins: 35,
    desc: 'Origem, usos e os 46 caracteres básicos, com sons derivados e combinações',
    lead: 'O hiragana é a primeira escrita que toda criança japonesa aprende — e a primeira que você vai dominar. Com ele, já dá para escrever qualquer palavra do japonês.',
    quizzes: {
      vogais: { title: 'Até aqui: linhas A, K e S', ask: 'kana', count: 8, pool: () => NJ.Kana.db.hiragana.filter((e) => e.sec === 'base' && 'あいうえおかきくけこさしすせそ'.includes(e.c)) },
      meio: { title: 'Linhas T, N, H e M', ask: 'kana', count: 10, pool: () => NJ.Kana.db.hiragana.filter((e) => e.sec === 'base' && 'たちつてとなにぬねのはひふへほまみむめも'.includes(e.c)) },
      final: { title: 'Teste final da aula', ask: 'mix', count: 15, final: true, pool: () => NJ.Kana.db.hiragana.filter((e) => (e.sec === 'base' || e.sec === 'dakuten') && !'ぢづを'.includes(e.c)) }
    },
    sections: (h) => [
      {
        title: 'O que é o hiragana',
        html: `
          <p>O hiragana é um <b>silabário</b>: em vez de letras soltas como o nosso A, B, C, cada caractere representa
          uma <b>sílaba inteira</b> (ou uma vogal sozinha). ${h.k('か')} é "ka", ${h.k('さ')} é "sa", ${h.k('ね')} é "ne".
          Não existe um "k" sozinho — a consoante sempre vem acompanhada de uma vogal.</p>
          <p>São <b>46 caracteres básicos</b>. Parece muito, mas eles seguem uma lógica de tabela tão organizada
          que, em poucos dias, você vai reconhecer todos. Com mais duas marquinhas (゛ e ゜) e algumas combinações,
          o hiragana cobre <b>todos os sons</b> da língua japonesa.</p>
          ${h.box('dica', 'O nome', `<span class="jp">ひらがな</span> vem de <i>hira</i> (comum, simples, "plano") + <i>kana</i> (escrita silábica). É "a escrita simples" — em oposição aos kanji, considerados a escrita "séria" por séculos.`)}`
      },
      {
        title: 'De onde ele veio',
        html: `
          <p>Até por volta do século V, o japonês <b>não tinha escrita</b>. Os kanji chegaram da China (passando pela
          Coreia) junto com textos budistas e confucianos — só que eles foram criados para o chinês, uma língua
          completamente diferente. Como escrever o japonês com eles?</p>
          <p>A solução foi usar alguns kanji <b>só pelo som</b>, ignorando o significado. Para escrever
          <i>yama</i> (montanha), por exemplo, podia-se usar <span class="jp">也末</span>: 也 pelo som "ya" e 末 pelo
          som "ma". Esse sistema ficou conhecido como <b>man'yōgana</b>, por causa do <i>Man'yōshū</i>, a grande
          antologia de poemas do século VIII escrita assim.</p>
          <p>Escrever um kanji inteiro para cada sílaba era trabalhoso. No período <b>Heian</b> (séculos IX a XII),
          de tanto ser escrito rápido, em estilo cursivo (<i>sōsho</i>), cada kanji foi se simplificando até virar
          uma forma nova, fluida e arredondada: nascia o hiragana.</p>
          <div class="evo">${['安あ', '以い', '宇う', '加か', '奈な', '波は', '末ま', '也や'].map((p) => `<span><b class="jp">${p[0]}</b><i>→</i>${h.k(p[1])}</span>`).join('')}</div>
          <p>Na época, a escrita "oficial" dos homens da corte era o chinês clássico, em kanji. O hiragana era
          associado às mulheres — chegou a ser chamado de <i>onnade</i>, "mão feminina". E foram mulheres que
          escreveram com ele algumas das maiores obras da literatura japonesa: o <b>Genji Monogatari</b>
          (Murasaki Shikibu, por volta do ano 1000), considerado um dos primeiros romances do mundo, e o
          <b>Makura no Sōshi</b> (Sei Shōnagon).</p>
          ${h.box('curiosidade', 'Um homem fingindo ser mulher', 'O poeta Ki no Tsurayuki escreveu o <i>Tosa Nikki</i> (por volta de 935) inteiro em hiragana, narrando como se fosse uma mulher — porque era o jeito "aceitável" de um homem da corte escrever em japonês e não em chinês.')}
          <p>Durante séculos, cada sílaba podia ser escrita com vários hiragana diferentes, derivados de kanji
          diferentes. Só em <b>1900</b> o governo japonês padronizou um caractere por som — os que sobraram, chamados
          <b>hentaigana</b>, ainda aparecem em placas de restaurantes tradicionais de soba, para dar um ar antigo.</p>`
      },
      {
        title: 'Para que ele é usado hoje',
        html: `
          <p>Num texto japonês moderno, o hiragana é a <b>"cola"</b> que liga os kanji. Você vai vê-lo em:</p>
          <ul>
            <li><b>Partículas</b> — as pecinhas gramaticais que dizem a função de cada palavra:
              ${h.k('は')} (tópico), ${h.k('を')} (objeto), ${h.k('に')} (destino/tempo), ${h.k('の')} (posse).</li>
            <li><b>Terminações de verbos e adjetivos</b> (<i>okurigana</i>): em ${h.w('たべる', '食べる', 'taberu', 'comer')},
              o kanji 食 dá o significado e べる, em hiragana, conjuga. Comi = 食べ<b>た</b>, não como = 食べ<b>ない</b>.</li>
            <li><b>Palavras sem kanji</b> ou com kanji raro: ${h.w('ありがとう', '', 'arigatō', 'obrigado')},
              ${h.w('これ', '', 'kore', 'isto')}, ${h.w('とても', '', 'totemo', 'muito')}.</li>
            <li><b>Furigana</b> — hiragana pequenino em cima dos kanji, mostrando a leitura. Comum em mangás e livros para jovens.</li>
            <li><b>Livros infantis</b>: crianças leem quase só em hiragana até aprenderem os kanji na escola.</li>
          </ul>
          ${h.box('dica', 'Dica do professor', 'Tudo o que se escreve em kanji <b>pode</b> ser escrito em hiragana — então, com esta aula, você já consegue escrever qualquer coisa em japonês. Vai parecer texto de criança, mas é perfeitamente legível!')}`
      },
      {
        title: 'Como a tabela funciona',
        html: `
          <p>A tabela do hiragana se chama <b>gojūon</b> (五十音, "cinquenta sons"). Ela é uma grade: as
          <b>colunas</b> são as cinco vogais — sempre na ordem <b>a, i, u, e, o</b> — e as <b>linhas</b> são as
          consoantes: <b>(nada), k, s, t, n, h, m, y, r, w</b>.</p>
          <p>Essa ordem — <b>a, ka, sa, ta, na, ha, ma, ya, ra, wa</b> — é o "ABC" japonês: dicionários, listas de
          chamada e agendas seguem essa sequência. Ela foi organizada por monges budistas inspirados na fonética do
          sânscrito. Repita em voz alta até ficar natural: <i>a-ka-sa-ta-na-ha-ma-ya-ra-wa</i>.</p>
          <p>Outra ideia importante é a <b>mora</b>, a "batida" do japonês. Cada kana vale uma batida de mesma duração.
          ${h.w('さくら', '桜', 'sakura', 'cerejeira')} tem três batidas: sa-ku-ra. ${h.w('がっこう', '学校', 'gakkō', 'escola')}
          tem quatro: ga-k-ko-u. Falar "no ritmo" das moras é o segredo para soar natural.</p>
          ${h.box('regra', 'As vogais japonesas são sempre iguais', 'Em português, o "e" e o "o" mudam (ê/é, ô/ó) e no fim da palavra viram "i" e "u" ("leite" soa "leiti"). Em japonês, não: <b>e</b> é sempre "e" e <b>o</b> é sempre "o". <i>sake</i> é "sakê", nunca "saki".')}
          <p>A seguir vamos percorrer a tabela linha por linha. <b>Toque em qualquer caractere</b> para ver a ordem
          dos traços animada e ouvir a pronúncia.</p>`
      },
      {
        title: 'As vogais: あ い う え お',
        html: `
          <p>Comece por aqui: as cinco vogais são a base de toda a tabela. A boa notícia é que elas soam quase como
          as nossas. Só o ${h.k('う')} pede atenção: é um "u" com os lábios relaxados, sem fazer biquinho.</p>
          ${h.row('あいうえお', notes)}
          ${h.box('atencao', 'Cuidado com あ e お', 'São os gêmeos mais confundidos. あ tem uma cruz completa e o laço é um traço separado que cruza a vertical. Em お, a vertical desce e ela mesma vira o laço — e há um pingo solto à direita.')}`
      },
      {
        title: 'Linha K: か き く け こ',
        html: `
          <p>Junte o "k" a cada vogal. Repare como o "k" é sempre duro, como em "casa" — ${h.k('き')} é "qui"
          (e não "ci"), ${h.k('け')} é "quê".</p>
          ${h.row('かきくけこ', notes)}`
      },
      {
        title: 'Linha S: さ し す せ そ',
        html: `
          <p>O "s" japonês nunca soa como "z", nem entre vogais: ${h.w('あさ', '朝', 'asa', 'manhã')} é "assa", não "aza".
          E aqui aparece a primeira <b>exceção</b>: em vez de "si", o japonês diz <b>"shi"</b> (como o nosso "xi").</p>
          ${h.row('さしすせそ', notes)}
          ${h.quiz('vogais')}`
      },
      {
        title: 'Linha T: た ち つ て と',
        html: `
          <p>A linha mais "irregular": em vez de "ti" e "tu", temos <b>chi</b> ("tchi") e <b>tsu</b>. Os outros três
          (ta, te, to) são normais — e <b>te</b> é "tê", nunca "tchê".</p>
          ${h.row('たちつてと', notes)}
          ${h.box('dica', 'Treinando o "tsu"', 'Fale "gatos" bem rápido e repare no "ts" final. Agora coloque um "u" curtinho depois: "tsu". Pratique com ' + h.w('つき', '月', 'tsuki', 'lua') + '.')}`
      },
      {
        title: 'Linha N: な に ぬ ね の',
        html: `
          <p>Sem surpresas de som: "n" como em "nada". O desafio aqui é visual — ${h.k('ぬ')}, ${h.k('ね')} e
          ${h.k('め')} se parecem, e ${h.k('ね')} tem primos na linha R e W.</p>
          ${h.row('なにぬねの', notes)}`
      },
      {
        title: 'Linha H: は ひ ふ へ ほ',
        html: `
          <p>O "h" japonês é <b>aspirado</b> — um sopro, como o "h" do inglês <i>house</i> ou o "rr" suave do carioca.
          Nunca é mudo como em "hora". A exceção é ${h.k('ふ')}: um som entre "f" e "h", feito soprando com os lábios
          quase fechados, sem encostar os dentes no lábio.</p>
          ${h.row('はひふへほ', notes)}`
      },
      {
        title: 'Linha M: ま み む め も',
        html: `
          <p>Linha tranquila: "m" como em "mala". Aproveite para fixar ${h.k('め')}, que também é a palavra "olho".</p>
          ${h.row('まみむめも', notes)}
          ${h.quiz('meio')}`
      },
      {
        title: 'Linha Y: や ゆ よ',
        html: `
          <p>Só três caracteres: "yi" e "ye" não existem no japonês moderno. O "y" é uma semivogal, como o "i" de
          "iate" — <b>ya</b> é "ia" numa batida só. Guarde bem estes três: em versão pequena, eles formam as
          combinações que veremos daqui a pouco.</p>
          ${h.row('やゆよ', notes)}`
      },
      {
        title: 'Linha R: ら り る れ ろ',
        html: `
          <p>O "r" japonês é <b>sempre fraco</b>: um toque rápido da ponta da língua, como o "r" de "caro" ou "arara".
          Nunca o "r" forte de "rato" ou o "r" caipira. Na verdade, ele fica entre o nosso "r" fraco e o "l"
          — por isso japoneses às vezes confundem "r" e "l" em outras línguas.</p>
          ${h.row('らりるれろ', notes)}`
      },
      {
        title: 'Linha W e o ん',
        html: `
          <p>A linha W ficou só com dois: ${h.k('わ')} ("ua") e ${h.k('を')}, que hoje soa exatamente como お e
          <b>só aparece como partícula</b> (veremos adiante). Dois outros, ゐ (wi) e ゑ (we), saíram de uso na reforma
          ortográfica de 1946.</p>
          <p>E por fim o ${h.k('ん')}, o único caractere que é <b>só consoante</b>. Ele vale uma batida inteira e
          muda de som conforme o que vem depois: vira "m" antes de m, b e p (${h.w('さんぽ', '散歩', 'sanpo', 'passeio')}
          soa "sampo") e, no fim da palavra, soa nasal como o "ã" de "irmã". Nenhuma palavra japonesa começa com ん.</p>
          ${h.row('わをん', notes)}
          ${h.box('dica', 'Parabéns!', 'Você acabou de ver os <b>46 caracteres básicos</b>. Tudo o que vem a seguir são variações deles — nenhuma forma nova para decorar.')}`
      },
      {
        title: 'Dakuten e handakuten: ゛ e ゜',
        html: `
          <p>Duas marquinhas no canto superior direito transformam os sons. O <b>dakuten</b> (゛, "tenten") torna a
          consoante <b>sonora</b> — as cordas vocais vibram:</p>
          <div class="pairs">
            <span>${h.k('か')} ka → ${h.k('が')} ga</span>
            <span>${h.k('さ')} sa → ${h.k('ざ')} za</span>
            <span>${h.k('た')} ta → ${h.k('だ')} da</span>
            <span>${h.k('は')} ha → ${h.k('ば')} ba</span>
          </div>
          <p>O <b>handakuten</b> (゜, "maru", bolinha) só existe na linha H e faz o som de <b>p</b>:
          ${h.k('は')} → ${h.k('ぱ')}, ${h.k('ひ')} → ${h.k('ぴ')}, ${h.k('ふ')} → ${h.k('ぷ')}…</p>
          ${h.box('curiosidade', 'Por que h vira b e p?', 'No japonês antigo, a linha H era pronunciada com <b>p</b>. Ao longo dos séculos o som virou "f" e depois "h" — mas as marcas ゛ e ゜ preservaram o parentesco antigo: h, b e p são "da mesma família".')}
          <p>Atenção a três detalhes:</p>
          <ul>
            <li>${h.k('ぎ')} é "gui" e ${h.k('げ')} é "guê" — o "g" é sempre duro, nunca "ji".</li>
            <li>${h.k('じ')} é "dji" (como o "dia" carioca), e ${h.k('ず')} é "zu".</li>
            <li>${h.k('ぢ')} e ${h.k('づ')} soam <b>igual</b> a じ e ず. São raros: aparecem quando ち ou つ ganham
              dakuten ao formar palavras compostas, como ${h.w('はなぢ', '鼻血', 'hanaji', 'sangramento nasal')}
              (はな + ち) ou na repetição ${h.w('つづく', '続く', 'tsuzuku', 'continuar')}.</li>
          </ul>
          ${h.compare('がざだばぱ')}`
      },
      {
        title: 'Combinações: きゃ, しゅ, ちょ…',
        html: `
          <p>Pegue um caractere terminado em <b>i</b> (き, し, ち, に, ひ, み, り e os com ゛/゜) e coloque depois um
          ${h.k('ゃ')}, ${h.k('ゅ')} ou ${h.k('ょ')} <b>pequeno</b>. O resultado é <b>uma sílaba só</b>, chamada
          <i>yōon</i>:</p>
          <div class="pairs">
            <span>${h.k('き')} + ゃ = ${h.k('きゃ')} kya</span>
            <span>${h.k('し')} + ゅ = ${h.k('しゅ')} shu</span>
            <span>${h.k('ち')} + ょ = ${h.k('ちょ')} cho</span>
            <span>${h.k('に')} + ゃ = ${h.k('にゃ')} nya</span>
          </div>
          <p>O tamanho importa! ${h.w('きよう', '器用', 'kiyō', 'habilidoso')} (três batidas: ki-yo-u) é uma palavra;
          ${h.w('きょう', '今日', 'kyō', 'hoje')} (duas batidas: kyo-u) é outra. E o par clássico:
          ${h.w('びよういん', '美容院', 'biyōin', 'salão de beleza')} × ${h.w('びょういん', '病院', 'byōin', 'hospital')}.</p>
          ${h.box('dica', 'Presente para quem fala português', 'O som de にゃ, にゅ, にょ é exatamente o nosso <b>"nh"</b>: nya = "nha" de "manhã". E しゃ, しゅ, しょ são "xa, xu, xô". Brasileiros pronunciam essas combinações melhor que muitos estrangeiros!')}`
      },
      {
        title: 'O っ pequeno',
        html: `
          <p>Quando o ${h.k('つ')} aparece pequeno (${h.k('っ')}), ele <b>não é lido como "tsu"</b>. Ele vira uma
          <b>pausa</b> de uma batida, e a consoante seguinte sai "presa", com mais força. No romaji, isso aparece
          como consoante dobrada:</p>
          <ul>
            <li>${h.w('きて', '来て', 'kite', 'venha')} × ${h.w('きって', '切手', 'kitte', 'selo')}</li>
            <li>${h.w('さか', '坂', 'saka', 'ladeira')} × ${h.w('さっか', '作家', 'sakka', 'escritor')}</li>
          </ul>
          ${h.box('dica', 'Como sentir a pausa', 'Pense no "ops" que a gente faz ao tropeçar: a garganta trava por um instante. <i>kit</i> ‿ <i>te</i>. É essa travadinha.')}`
      },
      {
        title: 'Vogais longas',
        html: `
          <p>No japonês, a <b>duração</b> da vogal muda o significado. Uma vogal longa dura duas batidas e, no
          hiragana, é escrita repetindo a vogal:</p>
          <ul>
            <li><b>a</b> longo: + あ — ${h.w('おかあさん', 'お母さん', 'okāsan', 'mãe')}</li>
            <li><b>i</b> longo: + い — ${h.w('おにいさん', 'お兄さん', 'onīsan', 'irmão mais velho')}</li>
            <li><b>u</b> longo: + う — ${h.w('くうき', '空気', 'kūki', 'ar')}</li>
            <li><b>e</b> longo: geralmente + い — ${h.w('せんせい', '先生', 'sensei', 'professor')} (soa "sensê"); às vezes + え — ${h.w('おねえさん', 'お姉さん', 'onēsan', 'irmã mais velha')}</li>
            <li><b>o</b> longo: geralmente + う — ${h.w('おとうさん', 'お父さん', 'otōsan', 'pai')}; às vezes + お — ${h.w('おおきい', '大きい', 'ōkii', 'grande')}</li>
          </ul>
          ${h.box('atencao', 'Não é detalhe!', h.w('おばさん', '', 'obasan', 'tia, senhora') + ' × ' + h.w('おばあさん', '', 'obāsan', 'avó') + ' — esticar ou não o "a" muda quem você está chamando.')}`
      },
      {
        title: 'Três partículas rebeldes: は へ を',
        html: `
          <p>Por motivos históricos, três hiragana têm uma leitura especial <b>quando funcionam como partícula</b>
          (as pecinhas gramaticais que vêm depois das palavras):</p>
          <ul>
            <li>${h.k('は')} vira <b>wa</b> quando marca o tópico: <span class="jp">わたし<b>は</b></span> <i>watashi wa</i> (quanto a mim…).
              É por isso que ${h.w('こんにちは', '', 'konnichiwa', 'olá')} termina em "wa".</li>
            <li>${h.k('へ')} vira <b>e</b> quando indica direção: <span class="jp">にほん<b>へ</b>いく</span> <i>nihon e iku</i> (ir ao Japão).</li>
            <li>${h.k('を')} é lido <b>o</b> e marca o objeto: <span class="jp">みず<b>を</b>のむ</span> <i>mizu o nomu</i> (beber água).</li>
          </ul>
          <p>Fora dessas funções, は é "ha" e へ é "he" normalmente: ${h.w('はな', '花', 'hana', 'flor')}, ${h.w('へや', '部屋', 'heya', 'quarto')}.</p>`
      },
      {
        title: 'Curiosidade: o poema Iroha',
        html: `
          <p>Antes da tabela gojūon se popularizar, os japoneses aprendiam o hiragana com um poema do período Heian
          que usa <b>cada caractere exatamente uma vez</b> — um pangrama perfeito:</p>
          <p class="poem jp" lang="ja">いろはにほへと　ちりぬるを<br>わかよたれそ　つねならむ<br>うゐのおくやま　けふこえて<br>あさきゆめみし　ゑひもせす</p>
          <p>Ele fala da <b>impermanência</b>, ideia central do budismo: as flores perfumadas um dia caem; neste mundo
          nada dura para sempre; atravessando hoje as montanhas da existência, não teremos mais sonhos vazios nem
          embriaguez. Repare nos antigos ゐ e ゑ. Até hoje a ordem "i-ro-ha" aparece em listas, como nosso "a, b, c",
          e "iroha" significa "o básico" de algo.</p>`
      },
      {
        title: 'Teste final',
        html: `
          <p>Hora de conferir! São 15 perguntas misturando os caracteres básicos e os com ゛ e ゜, ora pedindo a
          leitura, ora o caractere. Acertando 80% ou mais, a aula é marcada como concluída.</p>
          ${h.quiz('final')}
          <p class="muted small">Errou alguns? Normal. Revise os cartões da linha correspondente ou use a
          <a href="#/kana/hiragana">colinha de hiragana</a> e tente de novo amanhã — espaçar a revisão ajuda a memória.</p>`
      }
    ]
  });
})();
