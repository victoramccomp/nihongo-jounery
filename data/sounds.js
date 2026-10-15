/* Sons do japonês, compartilhados por hiragana e katakana.
   Chave = romaji Hepburn. ipa = transcrição fonética; dica = como soa para quem fala português. */
window.NJ = window.NJ || {};

NJ.sounds = {
  // Vogais
  a: { ipa: 'a', dica: '"A" aberto, como em "casa".' },
  i: { ipa: 'i', dica: '"I" como em "vida". Nunca vira "e".' },
  u: { ipa: 'ɯ', dica: '"U" curto, com os lábios quase sem arredondar. Entre consoantes surdas (k, s, t, h, p) costuma quase sumir: です soa "dess".' },
  e: { ipa: 'e', dica: '"E" médio, entre o "ê" de "dedo" e o "é" de "pé". Nunca vira "i" no fim da palavra.' },
  o: { ipa: 'o', dica: '"O" médio, entre o "ô" de "ovo" e o "ó" de "avó". Nunca vira "u" no fim da palavra.' },
  // K
  ka: { ipa: 'ka', dica: 'Como "ca" de "casa".' },
  ki: { ipa: 'kʲi', dica: 'Como "qui" de "quilo".' },
  ku: { ipa: 'kɯ', dica: 'Como "cu" de "cuca", com o "u" curtinho.' },
  ke: { ipa: 'ke', dica: 'Como "que" de "quero".' },
  ko: { ipa: 'ko', dica: 'Como "co" de "coco".' },
  // S
  sa: { ipa: 'sa', dica: 'Como "sa" de "sapo". O "s" nunca soa como "z", nem entre vogais.' },
  shi: { ipa: 'ɕi', dica: 'Como "xi" de "xícara", não "si". É a exceção da linha S.' },
  su: { ipa: 'sɯ', dica: 'Como "su" com o "u" bem fraco; no fim de frase quase some (です → "dess").' },
  se: { ipa: 'se', dica: 'Como "sê" de "você".' },
  so: { ipa: 'so', dica: 'Como "sô" de "sono".' },
  // T
  ta: { ipa: 'ta', dica: 'Como "ta" de "tatu".' },
  chi: { ipa: 'tɕi', dica: 'Como "tchi" do "tia" carioca. Não existe "ti" puro nesta linha.' },
  tsu: { ipa: 'tsɯ', dica: '"Ts" juntinho, como em "tsunami". Não existe em português: encoste a língua no "t" e solte em "s".' },
  te: { ipa: 'te', dica: 'Como "tê" de "você", sem virar "tchê".' },
  to: { ipa: 'to', dica: 'Como "tô" de "tomate".' },
  // N
  na: { ipa: 'na', dica: 'Como "na" de "nada".' },
  ni: { ipa: 'ɲi', dica: 'Como "ni" de "ninho", com a língua um pouco no céu da boca.' },
  nu: { ipa: 'nɯ', dica: 'Como "nu" com o "u" curto.' },
  ne: { ipa: 'ne', dica: 'Como "nê" de "nenê".' },
  no: { ipa: 'no', dica: 'Como "nô" de "nome".' },
  // H
  ha: { ipa: 'ha', dica: '"H" aspirado, como o "rr" suave de "carro" no sotaque carioca, ou o "h" do inglês "house".' },
  hi: { ipa: 'çi', dica: '"H" bem soprado com a língua perto do céu da boca, como um "rri" chiado e leve.' },
  fu: { ipa: 'ɸɯ', dica: 'Entre "f" e "h": sopre com os lábios quase fechados, sem encostar os dentes no lábio.' },
  he: { ipa: 'he', dica: '"H" aspirado + "e": "rrê" suave.' },
  ho: { ipa: 'ho', dica: '"H" aspirado + "o": "rrô" suave.' },
  // M
  ma: { ipa: 'ma', dica: 'Como "ma" de "mala".' },
  mi: { ipa: 'mʲi', dica: 'Como "mi" de "mito".' },
  mu: { ipa: 'mɯ', dica: 'Como "mu" com o "u" curto.' },
  me: { ipa: 'me', dica: 'Como "mê" de "mesa".' },
  mo: { ipa: 'mo', dica: 'Como "mô" de "moço".' },
  // Y
  ya: { ipa: 'ja', dica: 'Como "ia" em uma batida só, como em "iate".' },
  yu: { ipa: 'jɯ', dica: 'Como "iu" em uma batida só.' },
  yo: { ipa: 'jo', dica: 'Como "iô" em uma batida só, como em "iogurte".' },
  // R
  ra: { ipa: 'ɾa', dica: '"R" fraco, a língua dá um toque rápido, como o "r" de "caro". Nunca o "r" forte de "rato".' },
  ri: { ipa: 'ɾʲi', dica: 'Como "ri" de "caricatura": toque rápido da língua.' },
  ru: { ipa: 'ɾɯ', dica: 'Como "ru" de "Peru", toque rápido, "u" curto.' },
  re: { ipa: 'ɾe', dica: 'Como "rê" de "careta", toque rápido da língua.' },
  ro: { ipa: 'ɾo', dica: 'Como "rô" de "caroço", toque rápido da língua.' },
  // W / N
  wa: { ipa: 'ɰa', dica: 'Como "ua" em uma batida só, como em "água" sem o "ág".' },
  wo: { ipa: 'o', dica: 'Hoje soa igual a お: "o". O romaji "wo" serve só para diferenciar na escrita e na digitação.' },
  n: { ipa: 'ɴ / m / n / ŋ', dica: 'Nasal que vale uma batida inteira. Muda conforme o som seguinte: vira "m" antes de m, b, p (さんぽ = "sampo"), "n" antes de t, d, n, e no fim da palavra soa como o "ã" de "irmã".' },
  // G
  ga: { ipa: 'ɡa', dica: 'Como "ga" de "gato".' },
  gi: { ipa: 'ɡʲi', dica: 'Como "gui" de "guitarra", nunca "ji".' },
  gu: { ipa: 'ɡɯ', dica: 'Como "gu" de "gula", "u" curto.' },
  ge: { ipa: 'ɡe', dica: 'Como "guê" de "guerra", nunca "jê".' },
  go: { ipa: 'ɡo', dica: 'Como "gô" de "gol".' },
  // Z
  za: { ipa: 'dza ~ za', dica: 'Como "za" de "zabumba"; no início da palavra pode soar "dza".' },
  ji: { ipa: 'dʑi', dica: 'Como "dji" do "dia" carioca.' },
  zu: { ipa: 'dzɯ ~ zɯ', dica: 'Entre "zu" e "dzu", com o "u" curto.' },
  ze: { ipa: 'dze ~ ze', dica: 'Como "zê" de "zebra".' },
  zo: { ipa: 'dzo ~ zo', dica: 'Como "zô" de "zona".' },
  // D
  da: { ipa: 'da', dica: 'Como "da" de "dado".' },
  de: { ipa: 'de', dica: 'Como "dê" de "dedo", sem virar "djê".' },
  do: { ipa: 'do', dica: 'Como "dô" de "dono".' },
  // B
  ba: { ipa: 'ba', dica: 'Como "ba" de "bala".' },
  bi: { ipa: 'bʲi', dica: 'Como "bi" de "bico".' },
  bu: { ipa: 'bɯ', dica: 'Como "bu" com o "u" curto.' },
  be: { ipa: 'be', dica: 'Como "bê" de "bebê".' },
  bo: { ipa: 'bo', dica: 'Como "bô" de "bolo".' },
  // P
  pa: { ipa: 'pa', dica: 'Como "pa" de "pato".' },
  pi: { ipa: 'pʲi', dica: 'Como "pi" de "pipa".' },
  pu: { ipa: 'pɯ', dica: 'Como "pu" com o "u" curto.' },
  pe: { ipa: 'pe', dica: 'Como "pê" de "pêra".' },
  po: { ipa: 'po', dica: 'Como "pô" de "poço".' },
  // Combinações (yōon): uma batida só
  kya: { ipa: 'kʲa', dica: '"Quia" em uma batida só.' },
  kyu: { ipa: 'kʲɯ', dica: '"Quiu" em uma batida só.' },
  kyo: { ipa: 'kʲo', dica: '"Quiô" em uma batida só.' },
  sha: { ipa: 'ɕa', dica: 'Como "xa" de "xadrez".' },
  shu: { ipa: 'ɕɯ', dica: 'Como "xu" de "xuxu", "u" curto.' },
  sho: { ipa: 'ɕo', dica: 'Como "xô" de "xodó".' },
  cha: { ipa: 'tɕa', dica: 'Como "tcha" de "tchau".' },
  chu: { ipa: 'tɕɯ', dica: 'Como "tchu", "u" curto.' },
  cho: { ipa: 'tɕo', dica: 'Como "tchô".' },
  nya: { ipa: 'ɲa', dica: 'Como "nha" de "manhã". Fácil para quem fala português!' },
  nyu: { ipa: 'ɲɯ', dica: 'Como "nhu" de "nenhum".' },
  nyo: { ipa: 'ɲo', dica: 'Como "nhô" de "senhor".' },
  hya: { ipa: 'ça', dica: '"H" chiado + "ia" em uma batida só.' },
  hyu: { ipa: 'çɯ', dica: '"H" chiado + "iu" em uma batida só.' },
  hyo: { ipa: 'ço', dica: '"H" chiado + "iô" em uma batida só.' },
  mya: { ipa: 'mʲa', dica: '"Mia" em uma batida só.' },
  myu: { ipa: 'mʲɯ', dica: '"Miu" em uma batida só.' },
  myo: { ipa: 'mʲo', dica: '"Miô" em uma batida só.' },
  rya: { ipa: 'ɾʲa', dica: '"R" fraco + "ia" em uma batida só.' },
  ryu: { ipa: 'ɾʲɯ', dica: '"R" fraco + "iu" em uma batida só (não "riú").' },
  ryo: { ipa: 'ɾʲo', dica: '"R" fraco + "iô" em uma batida só (りょこう não é "ri-o-kô").' },
  gya: { ipa: 'ɡʲa', dica: '"Guia" em uma batida só.' },
  gyu: { ipa: 'ɡʲɯ', dica: '"Guiu" em uma batida só.' },
  gyo: { ipa: 'ɡʲo', dica: '"Guiô" em uma batida só.' },
  ja: { ipa: 'dʑa', dica: 'Como "dja".' },
  ju: { ipa: 'dʑɯ', dica: 'Como "dju".' },
  jo: { ipa: 'dʑo', dica: 'Como "djô".' },
  bya: { ipa: 'bʲa', dica: '"Bia" em uma batida só.' },
  byu: { ipa: 'bʲɯ', dica: '"Biu" em uma batida só.' },
  byo: { ipa: 'bʲo', dica: '"Biô" em uma batida só.' },
  pya: { ipa: 'pʲa', dica: '"Pia" em uma batida só.' },
  pyu: { ipa: 'pʲɯ', dica: '"Piu" em uma batida só.' },
  pyo: { ipa: 'pʲo', dica: '"Piô" em uma batida só.' },
  // Estendidos do katakana (sons de palavras estrangeiras)
  fa: { ipa: 'ɸa', dica: '"F" soprado (como em ふ) + "a".' },
  fi: { ipa: 'ɸʲi', dica: '"F" soprado + "i".' },
  fe: { ipa: 'ɸe', dica: '"F" soprado + "e".' },
  fo: { ipa: 'ɸo', dica: '"F" soprado + "o".' },
  ti: { ipa: 'ti', dica: '"Ti" sem chiar, como "ti" do sotaque nordestino.' },
  di: { ipa: 'di', dica: '"Di" sem chiar, como "di" do sotaque nordestino.' },
  tu: { ipa: 'tɯ', dica: '"Tu" puro, sem o "s" de つ.' },
  wi: { ipa: 'wi', dica: '"Ui" em uma batida só.' },
  we: { ipa: 'we', dica: '"Uê" em uma batida só.' },
  'wo~': { ipa: 'wo', dica: '"Uô" em uma batida só (diferente de ヲ, que soa "o").' },
  she: { ipa: 'ɕe', dica: 'Como "xê".' },
  je: { ipa: 'dʑe', dica: 'Como "djê".' },
  che: { ipa: 'tɕe', dica: 'Como "tchê".' },
  tsa: { ipa: 'tsa', dica: '"Tsa", como o começo de "tsar".' },
  vu: { ipa: 'vɯ ~ bɯ', dica: 'Tenta imitar o "v" estrangeiro; muitos japoneses falam como "bu".' },
  // Marcas
  small_tsu: { ipa: '(pausa)', dica: 'Não tem som próprio: é uma pausa curta que dobra a consoante seguinte. きって = "kit-te", com uma parada antes do "t".' },
  choon: { ipa: 'ː', dica: 'Não tem som próprio: estica a vogal anterior por mais uma batida. ケーキ = "kê-ê-ki".' }
};

/* Romanização Kunrei (usada no ensino oficial japonês) quando difere do Hepburn. */
NJ.kunrei = {
  shi: 'si', chi: 'ti', tsu: 'tu', fu: 'hu', ji: 'zi', wo: 'o',
  sha: 'sya', shu: 'syu', sho: 'syo', cha: 'tya', chu: 'tyu', cho: 'tyo',
  ja: 'zya', ju: 'zyu', jo: 'zyo'
};
