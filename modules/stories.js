/* Módulos 2 a 4: cada um abre com uma história (texto e áudio em NihongoMaterial).
   As próximas aulas de cada módulo entram em addLesson depois da história. */
(function () {
  /* Roteiro de estudo comum a todas as histórias. */
  const howTo = (h) => `
    <p>A história é a porta de entrada do módulo: tudo o que você vai estudar nas próximas aulas aparece nela.
    Não se preocupe em entender tudo agora. Siga estas etapas:</p>
    <ol>
      <li><b>Só ouça</b>, sem ler, e tente captar palavras soltas e o clima da cena.</li>
      <li><b>Ouça lendo</b> o japonês, com o furigana ligado.</li>
      <li><b>Leia a tradução</b> (botão "Tradução" ou toque numa fala) e descubra o que perdeu.</li>
      <li><b>Ouça de novo</b> sem a tradução. Repare quanto você já entende!</li>
      <li>Se quiser um desafio: desligue o furigana e tente ler os kanji.</li>
    </ol>
    ${h.box('dica', 'Furigana', 'Os hiragana pequenos em cima dos kanji são o <b>furigana</b>: mostram como cada kanji é lido. É assim que crianças japonesas e estudantes leem kanji que ainda não conhecem.')}`;

  const modules = [
    {
      id: '2', jp: '友達', title: 'O robô que veio do céu',
      desc: 'Emi encontra um robô sem nome: cumprimentos, apresentações e o começo de uma amizade.',
      lead: 'Numa manhã comum, Emi encontra um robô desligado. Quando ele acorda, não sabe onde está, nem tem nome… Ouça como os dois se conhecem.',
      mins: 10
    },
    {
      id: '3', jp: '家族', title: 'Compras e família',
      desc: 'A bateria do Saver está acabando: uma ida à loja de conveniência e o encontro com a família da Emi.',
      lead: 'A energia do Saver está baixa! Emi o leva à loja de conveniência e depois para casa, onde ele conhece a família dela.',
      mins: 12
    },
    {
      id: '4', jp: '学校', title: 'O primeiro dia na escola',
      desc: 'Saver acompanha a Emi à escola e conhece a professora Yuki.',
      lead: 'Manhã de aula! Saver vai à escola com a Emi, conhece a professora Yuki e decide estudar a cultura japonesa.',
      mins: 10
    }
  ];

  modules.forEach((m) => {
    NJ.Course.addModule({
      id: m.id, jp: m.jp, title: m.title, desc: m.desc,
      intro: () => `
        <p>${m.desc}</p>
        <p>O módulo começa pela <b>história</b>, com o áudio original, furigana em todos os kanji e tradução fala por fala.
        As próximas aulas vão destrinchar o vocabulário e a gramática que aparecem nela.</p>`
    });
    NJ.Course.addLesson(m.id, {
      id: 'historia',
      title: 'História',
      jp: '物語',
      mins: m.mins,
      desc: 'Ouça e leia a história que abre o módulo',
      lead: m.lead,
      sections: (h) => [
        { title: 'Como estudar a história', html: howTo(h) },
        { title: 'A história', html: h.story(m.id) }
      ]
    });
  });
})();
