/* Hiragana. Campos de cada caractere:
   c = caractere, r = romaji (Hepburn), o = kanji de origem, s = parecidos (cuidado para não confundir),
   n = observação de uso, w = dica de escrita,
   ex = exemplos "kana|kanji|romaji|significado" (kanji vazio quando a palavra se escreve só em kana). */
window.NJ = window.NJ || {};
NJ.kana = NJ.kana || {};

NJ.kana.hiragana = {
  base: [
    { c: 'あ', r: 'a', o: '安', s: ['お', 'め'], ex: ['あめ|雨|ame|chuva', 'あさ|朝|asa|manhã', 'あか|赤|aka|vermelho', 'あし|足|ashi|pé, perna', 'あおい|青い|aoi|azul'] },
    { c: 'い', r: 'i', o: '以', s: ['り', 'こ'], n: 'Depois de え costuma alongar o "e": せんせい soa "sensê".', ex: ['いぬ|犬|inu|cachorro', 'いえ|家|ie|casa', 'いす|椅子|isu|cadeira', 'いちご|苺|ichigo|morango', 'えいが|映画|eiga|filme'] },
    { c: 'う', r: 'u', o: '宇', s: ['ら', 'つ'], n: 'Depois de お ou う alonga o som: おとうさん (otōsan), くうき (kūki).', ex: ['うみ|海|umi|mar', 'うし|牛|ushi|vaca, boi', 'うた|歌|uta|canção', 'うえ|上|ue|em cima', 'くうき|空気|kūki|ar'] },
    { c: 'え', r: 'e', o: '衣', s: ['ん'], n: 'Como partícula de direção, quem faz o som "e" é へ, não え.', ex: ['えき|駅|eki|estação', 'えんぴつ|鉛筆|enpitsu|lápis', 'え|絵|e|desenho, pintura', 'いえ|家|ie|casa', 'まえ|前|mae|frente, antes'] },
    { c: 'お', r: 'o', o: '於', s: ['あ', 'む'], n: 'Em algumas palavras alonga o "o": おおきい (ōkii), とおい (tōi). Também é prefixo de cortesia: お茶, お金.', ex: ['おかね|お金|okane|dinheiro', 'おちゃ|お茶|ocha|chá', 'おとこ|男|otoko|homem', 'かお|顔|kao|rosto', 'おおきい|大きい|ōkii|grande'] },

    { c: 'か', r: 'ka', o: '加', s: ['が', 'や'], n: 'No fim da frase, か transforma a frase em pergunta: いきますか? (ikimasu ka?).', ex: ['かさ|傘|kasa|guarda-chuva', 'かお|顔|kao|rosto', 'かみ|紙|kami|papel', 'さかな|魚|sakana|peixe', 'たかい|高い|takai|alto, caro'] },
    { c: 'き', r: 'ki', o: '幾', s: ['さ', 'ち'], w: 'Na letra impressa os dois últimos traços podem aparecer ligados; à mão, escreva separados (4 traços).', ex: ['き|木|ki|árvore', 'きた|北|kita|norte', 'きって|切手|kitte|selo', 'あき|秋|aki|outono', 'ゆき|雪|yuki|neve'] },
    { c: 'く', r: 'ku', o: '久', s: ['へ', 'し'], w: 'Um traço só, como um "<" — o ângulo fica do lado esquerdo.', ex: ['くつ|靴|kutsu|sapato', 'くち|口|kuchi|boca', 'くるま|車|kuruma|carro', 'きく|聞く|kiku|ouvir', 'さくら|桜|sakura|cerejeira'] },
    { c: 'け', r: 'ke', o: '計', s: ['は', 'ほ'], ex: ['けさ|今朝|kesa|hoje de manhã', 'いけ|池|ike|lago', 'たけ|竹|take|bambu', 'さけ|酒|sake|saquê, bebida alcoólica', 'けいたい|携帯|keitai|celular'] },
    { c: 'こ', r: 'ko', o: '己', s: ['い', 'に'], ex: ['こども|子供|kodomo|criança', 'ここ||koko|aqui', 'ねこ|猫|neko|gato', 'こえ|声|koe|voz', 'がっこう|学校|gakkō|escola'] },

    { c: 'さ', r: 'sa', o: '左', s: ['き', 'ち'], w: 'À mão, o último traço fica separado (3 traços); algumas fontes o ligam.', ex: ['さる|猿|saru|macaco', 'さくら|桜|sakura|cerejeira', 'かさ|傘|kasa|guarda-chuva', 'あさ|朝|asa|manhã', 'さむい|寒い|samui|frio (clima)'] },
    { c: 'し', r: 'shi', o: '之', s: ['つ', 'も'], ex: ['しお|塩|shio|sal', 'しま|島|shima|ilha', 'あし|足|ashi|pé, perna', 'すし|寿司|sushi|sushi', 'わたし|私|watashi|eu'] },
    { c: 'す', r: 'su', o: '寸', s: ['む', 'お'], ex: ['すいか|西瓜|suika|melancia', 'いす|椅子|isu|cadeira', 'からす|烏|karasu|corvo', 'やすみ|休み|yasumi|folga, férias', 'すき|好き|suki|gostar de'] },
    { c: 'せ', r: 'se', o: '世', s: ['さ', 'や'], ex: ['せんせい|先生|sensei|professor', 'せかい|世界|sekai|mundo', 'あせ|汗|ase|suor', 'みせ|店|mise|loja', 'せなか|背中|senaka|costas'] },
    { c: 'そ', r: 'so', o: '曽', s: ['て', 'ろ'], w: 'Pode ser escrito em 1 traço (forma impressa) ou em 2, com o tracinho de cima separado (forma manuscrita comum).', ex: ['そら|空|sora|céu', 'そと|外|soto|lado de fora', 'うそ|嘘|uso|mentira', 'みそ|味噌|miso|missô', 'そば|蕎麦|soba|macarrão de trigo-sarraceno'] },

    { c: 'た', r: 'ta', o: '太', s: ['な', 'に'], ex: ['たまご|卵|tamago|ovo', 'たこ|蛸|tako|polvo', 'うた|歌|uta|canção', 'した|下|shita|embaixo', 'かた|肩|kata|ombro'] },
    { c: 'ち', r: 'chi', o: '知', s: ['さ', 'ら'], w: 'Parece um さ espelhado: a barriga de ち abre para a direita.', ex: ['ちず|地図|chizu|mapa', 'ちかてつ|地下鉄|chikatetsu|metrô', 'くち|口|kuchi|boca', 'みち|道|michi|caminho, rua', 'いち|一|ichi|um'] },
    { c: 'つ', r: 'tsu', o: '川', s: ['し', 'う'], n: 'Em tamanho pequeno (っ) não é lido: indica pausa e dobra a consoante seguinte (きって = kitte).', ex: ['つき|月|tsuki|lua', 'つくえ|机|tsukue|escrivaninha', 'くつ|靴|kutsu|sapato', 'なつ|夏|natsu|verão', 'つなみ|津波|tsunami|tsunami'] },
    { c: 'て', r: 'te', o: '天', s: ['そ'], ex: ['て|手|te|mão', 'てがみ|手紙|tegami|carta', 'てんき|天気|tenki|tempo (clima)', 'てら|寺|tera|templo budista', 'きって|切手|kitte|selo'] },
    { c: 'と', r: 'to', o: '止', s: ['ど'], n: 'Como partícula significa "e" (ligando substantivos) ou "com": ねこといぬ (neko to inu) = gato e cachorro.', ex: ['とり|鳥|tori|pássaro', 'とけい|時計|tokei|relógio', 'ひと|人|hito|pessoa', 'おとうと|弟|otōto|irmão mais novo', 'そと|外|soto|lado de fora'] },

    { c: 'な', r: 'na', o: '奈', s: ['た', 'は'], ex: ['なつ|夏|natsu|verão', 'なまえ|名前|namae|nome', 'さかな|魚|sakana|peixe', 'はな|花|hana|flor', 'なか|中|naka|dentro, meio'] },
    { c: 'に', r: 'ni', o: '仁', s: ['こ', 'た'], n: 'Como partícula indica lugar/tempo/destino: しちじにおきる (shichiji ni okiru) = acordar às 7.', ex: ['にく|肉|niku|carne', 'にほん|日本|nihon|Japão', 'にわ|庭|niwa|jardim, quintal', 'かに|蟹|kani|caranguejo', 'にし|西|nishi|oeste'] },
    { c: 'ぬ', r: 'nu', o: '奴', s: ['め', 'ね'], w: 'Diferente de め, ぬ termina com um laço (voltinha) embaixo à direita.', ex: ['いぬ|犬|inu|cachorro', 'ぬの|布|nuno|pano, tecido', 'きぬ|絹|kinu|seda', 'たぬき|狸|tanuki|tanuki (cão-guaxinim)', 'ぬいぐるみ||nuigurumi|bicho de pelúcia'] },
    { c: 'ね', r: 'ne', o: '祢', s: ['れ', 'わ'], w: 'ね termina com um laço; れ termina com uma perninha para fora; わ termina com uma curva aberta.', n: 'No fim da frase pede concordância, como o nosso "né?": いいね (ii ne).', ex: ['ねこ|猫|neko|gato', 'ふね|船|fune|barco, navio', 'ねずみ|鼠|nezumi|rato', 'あね|姉|ane|irmã mais velha', 'おかね|お金|okane|dinheiro'] },
    { c: 'の', r: 'no', o: '乃', s: ['め', 'あ'], n: 'Como partícula indica posse ou ligação: わたしのほん (watashi no hon) = meu livro.', ex: ['のみもの|飲み物|nomimono|bebida', 'のり|海苔|nori|alga nori', 'きのこ|茸|kinoko|cogumelo', 'つの|角|tsuno|chifre', 'もの|物|mono|coisa'] },

    { c: 'は', r: 'ha', o: '波', s: ['ほ', 'け'], n: 'Como partícula de tópico lê-se WA: わたしは… (watashi wa…). Por isso こんにちは termina em "wa".', ex: ['はな|花|hana|flor', 'はし|箸|hashi|hashi (pauzinhos)', 'はる|春|haru|primavera', 'はこ|箱|hako|caixa', 'こんにちは||konnichiwa|olá, boa tarde'] },
    { c: 'ひ', r: 'hi', o: '比', s: ['い'], ex: ['ひと|人|hito|pessoa', 'ひ|火|hi|fogo', 'ひかり|光|hikari|luz', 'ひこうき|飛行機|hikōki|avião', 'ひだり|左|hidari|esquerda'] },
    { c: 'ふ', r: 'fu', o: '不', s: ['ぶ', 'ぷ'], w: 'São 4 traços: o gancho do meio e três pontos (esquerda, direita) em volta.', ex: ['ふね|船|fune|barco, navio', 'ふゆ|冬|fuyu|inverno', 'ふとん|布団|futon|futon (colchão japonês)', 'ふく|服|fuku|roupa', 'さいふ|財布|saifu|carteira'] },
    { c: 'へ', r: 'he', o: '部', s: ['く', 'ヘ'], n: 'Como partícula de direção lê-se E: がっこうへいく (gakkō e iku) = ir para a escola. Hiragana へ e katakana ヘ são quase idênticos.', ex: ['へや|部屋|heya|quarto', 'へび|蛇|hebi|cobra', 'へた|下手|heta|ruim em algo, sem jeito', 'へそ|臍|heso|umbigo', 'へいわ|平和|heiwa|paz'] },
    { c: 'ほ', r: 'ho', o: '保', s: ['は', 'ま'], w: 'Igual a は, mas com um traço a mais em cima: ほ tem dois traços horizontais fechados no topo.', ex: ['ほし|星|hoshi|estrela', 'ほん|本|hon|livro', 'ほね|骨|hone|osso', 'ほか|他|hoka|outro', 'ほそい|細い|hosoi|fino'] },

    { c: 'ま', r: 'ma', o: '末', s: ['ほ', 'も', 'よ'], ex: ['まど|窓|mado|janela', 'まち|町|machi|cidade, bairro', 'まめ|豆|mame|feijão, grão', 'あたま|頭|atama|cabeça', 'くま|熊|kuma|urso'] },
    { c: 'み', r: 'mi', o: '美', s: ['よ'], ex: ['みず|水|mizu|água', 'みみ|耳|mimi|orelha', 'みせ|店|mise|loja', 'うみ|海|umi|mar', 'かみ|紙|kami|papel'] },
    { c: 'む', r: 'mu', o: '武', s: ['す', 'お'], ex: ['むし|虫|mushi|inseto', 'むね|胸|mune|peito', 'むら|村|mura|vila, aldeia', 'さむい|寒い|samui|frio (clima)', 'むすこ|息子|musuko|filho'] },
    { c: 'め', r: 'me', o: '女', s: ['ぬ', 'あ', 'の'], w: 'め termina com uma curva aberta; ぬ tem um laço fechado no final.', ex: ['め|目|me|olho', 'あめ|雨|ame|chuva', 'ゆめ|夢|yume|sonho', 'めがね|眼鏡|megane|óculos', 'こめ|米|kome|arroz (cru)'] },
    { c: 'も', r: 'mo', o: '毛', s: ['ま', 'し'], n: 'Como partícula significa "também": わたしも (watashi mo) = eu também.', ex: ['もも|桃|momo|pêssego', 'もり|森|mori|floresta', 'くも|雲|kumo|nuvem', 'もの|物|mono|coisa', 'ともだち|友達|tomodachi|amigo'] },

    { c: 'や', r: 'ya', o: '也', s: ['か', 'せ'], n: 'Em tamanho pequeno (ゃ) forma combinações: き + ゃ = きゃ (kya).', ex: ['やま|山|yama|montanha', 'やさい|野菜|yasai|verdura, legume', 'へや|部屋|heya|quarto', 'やね|屋根|yane|telhado', 'やすみ|休み|yasumi|folga, férias'] },
    { c: 'ゆ', r: 'yu', o: '由', n: 'Em tamanho pequeno (ゅ) forma combinações: し + ゅ = しゅ (shu).', ex: ['ゆき|雪|yuki|neve', 'ゆめ|夢|yume|sonho', 'ゆび|指|yubi|dedo', 'ふゆ|冬|fuyu|inverno', 'ゆかた|浴衣|yukata|yukata (quimono leve de verão)'] },
    { c: 'よ', r: 'yo', o: '与', s: ['ま', 'み'], n: 'Em tamanho pequeno (ょ) forma combinações: き + ょ = きょ (kyo).', ex: ['よる|夜|yoru|noite', 'よこ|横|yoko|lado', 'よむ|読む|yomu|ler', 'よてい|予定|yotei|plano, compromisso', 'つよい|強い|tsuyoi|forte'] },

    { c: 'ら', r: 'ra', o: '良', s: ['う', 'ち'], ex: ['そら|空|sora|céu', 'さくら|桜|sakura|cerejeira', 'からす|烏|karasu|corvo', 'らいねん|来年|rainen|ano que vem', 'むら|村|mura|vila, aldeia'] },
    { c: 'り', r: 'ri', o: '利', s: ['い', 'リ'], w: 'À mão são 2 traços separados; algumas fontes ligam os dois.', ex: ['りんご|林檎|ringo|maçã', 'とり|鳥|tori|pássaro', 'もり|森|mori|floresta', 'くすり|薬|kusuri|remédio', 'のり|海苔|nori|alga nori'] },
    { c: 'る', r: 'ru', o: '留', s: ['ろ'], w: 'る termina com um laço embaixo; ろ termina aberto.', ex: ['はる|春|haru|primavera', 'よる|夜|yoru|noite', 'くるま|車|kuruma|carro', 'さる|猿|saru|macaco', 'るす|留守|rusu|ausência (não estar em casa)'] },
    { c: 'れ', r: 're', o: '礼', s: ['ね', 'わ'], ex: ['これ||kore|isto', 'かれ|彼|kare|ele', 'はれ|晴れ|hare|tempo bom, ensolarado', 'れきし|歴史|rekishi|história', 'れいぞうこ|冷蔵庫|reizōko|geladeira'] },
    { c: 'ろ', r: 'ro', o: '呂', s: ['る'], ex: ['いろ|色|iro|cor', 'しろ|白|shiro|branco', 'ふろ|風呂|furo|banho, ofurô', 'ところ|所|tokoro|lugar', 'ろうそく|蝋燭|rōsoku|vela'] },

    { c: 'わ', r: 'wa', o: '和', s: ['ね', 'れ'], n: 'Em tamanho pequeno (ゎ) é raro e quase não se usa hoje.', ex: ['わたし|私|watashi|eu', 'にわ|庭|niwa|jardim, quintal', 'かわ|川|kawa|rio', 'わに|鰐|wani|crocodilo, jacaré', 'でんわ|電話|denwa|telefone'] },
    { c: 'を', r: 'wo', o: '遠', s: ['お'], n: 'Usado praticamente só como partícula de objeto direto. Pronuncia-se "o" (igual a お), mas digita-se "wo". Exemplos abaixo são frases curtas.', ex: ['ほんをよむ|本を読む|hon o yomu|ler um livro', 'みずをのむ|水を飲む|mizu o nomu|beber água', 'てがみをかく|手紙を書く|tegami o kaku|escrever uma carta', 'えいがをみる|映画を見る|eiga o miru|assistir a um filme', 'すしをたべる|寿司を食べる|sushi o taberu|comer sushi'] },
    { c: 'ん', r: 'n', o: '无', s: ['え', 'そ'], n: 'Único som que é só consoante, e vale uma batida inteira. Nenhuma palavra começa com ん. Antes de vogal ou や/ゆ/よ, o romaji usa apóstrofo: きんえん (kin\'en, proibido fumar) ≠ きねん (kinen, comemoração). Digita-se "nn".', ex: ['ほん|本|hon|livro', 'みかん|蜜柑|mikan|tangerina', 'せんせい|先生|sensei|professor', 'てんき|天気|tenki|tempo (clima)', 'しんぶん|新聞|shinbun|jornal'] }
  ],

  dakuten: [
    { c: 'が', r: 'ga', ex: ['がっこう|学校|gakkō|escola', 'えいが|映画|eiga|filme', 'がいこく|外国|gaikoku|país estrangeiro', 'ながい|長い|nagai|comprido', 'まんが|漫画|manga|mangá'] },
    { c: 'ぎ', r: 'gi', ex: ['ぎんこう|銀行|ginkō|banco', 'かぎ|鍵|kagi|chave', 'うさぎ|兎|usagi|coelho', 'むぎ|麦|mugi|trigo, cevada', 'つぎ|次|tsugi|próximo'] },
    { c: 'ぐ', r: 'gu', ex: ['かぐ|家具|kagu|móveis', 'すぐ||sugu|imediatamente', 'めぐすり|目薬|megusuri|colírio', 'ぐあい|具合|guai|estado, condição', 'ぐんて|軍手|gunte|luvas de trabalho'] },
    { c: 'げ', r: 'ge', ex: ['げんき|元気|genki|saudável, animado', 'げた|下駄|geta|tamanco japonês', 'ひげ|髭|hige|barba, bigode', 'かげ|影|kage|sombra', 'げつようび|月曜日|getsuyōbi|segunda-feira'] },
    { c: 'ご', r: 'go', ex: ['ごはん|ご飯|gohan|arroz cozido, refeição', 'りんご|林檎|ringo|maçã', 'たまご|卵|tamago|ovo', 'ご|五|go|cinco', 'にほんご|日本語|nihongo|língua japonesa'] },

    { c: 'ざ', r: 'za', ex: ['ざっし|雑誌|zasshi|revista', 'ひざ|膝|hiza|joelho', 'ざぶとん|座布団|zabuton|almofada para sentar', 'かざん|火山|kazan|vulcão', 'ざんねん|残念|zannen|que pena'] },
    { c: 'じ', r: 'ji', s: ['ぢ'], n: 'じ e ぢ têm o mesmo som. Use じ em quase tudo; ぢ só em casos especiais.', ex: ['じしょ|辞書|jisho|dicionário', 'じかん|時間|jikan|tempo, horas', 'かじ|火事|kaji|incêndio', 'ふじさん|富士山|fujisan|monte Fuji', 'ひつじ|羊|hitsuji|ovelha'] },
    { c: 'ず', r: 'zu', s: ['づ'], n: 'ず e づ têm o mesmo som. Use ず em quase tudo; づ só em casos especiais.', ex: ['みず|水|mizu|água', 'ちず|地図|chizu|mapa', 'ずっと||zutto|o tempo todo, muito mais', 'すずしい|涼しい|suzushii|fresco (clima)', 'ねずみ|鼠|nezumi|rato'] },
    { c: 'ぜ', r: 'ze', ex: ['かぜ|風|kaze|vento (風邪 = resfriado)', 'ぜんぶ|全部|zenbu|tudo', 'なぜ||naze|por quê', 'ぜいきん|税金|zeikin|imposto', 'ぜんぜん|全然|zenzen|nem um pouco'] },
    { c: 'ぞ', r: 'zo', ex: ['かぞく|家族|kazoku|família', 'ぞう|象|zō|elefante', 'みぞ|溝|mizo|valeta, sulco', 'なぞ|謎|nazo|mistério, enigma', 'れいぞうこ|冷蔵庫|reizōko|geladeira'] },

    { c: 'だ', r: 'da', n: 'だ também é a forma informal de です (ser/estar): げんきだ (genki da).', ex: ['だいがく|大学|daigaku|universidade', 'ともだち|友達|tomodachi|amigo', 'からだ|体|karada|corpo', 'くだもの|果物|kudamono|fruta', 'だれ|誰|dare|quem'] },
    { c: 'ぢ', r: 'ji', ime: 'di', k: 'zi', s: ['じ'], n: 'Raro. Aparece quando ち ganha dakuten numa palavra composta (はな + ち → はなぢ) ou quando ち se repete (ちぢむ). No resto, o som "ji" é escrito com じ. Digita-se "di".', ex: ['はなぢ|鼻血|hanaji|sangramento nasal', 'ちぢむ|縮む|chijimu|encolher', 'ちぢれる|縮れる|chijireru|ficar crespo, enrugar', 'みぢか|身近|mijika|próximo, do dia a dia', 'そこぢから|底力|sokojikara|força interior'] },
    { c: 'づ', r: 'zu', ime: 'du', s: ['ず'], n: 'Raro. Aparece quando つ ganha dakuten numa palavra composta (て + つくり → てづくり) ou quando つ se repete (つづく). No resto, o som "zu" é escrito com ず. Digita-se "du".', ex: ['つづく|続く|tsuzuku|continuar', 'てづくり|手作り|tezukuri|feito à mão', 'みかづき|三日月|mikazuki|lua crescente', 'きづく|気付く|kizuku|perceber', 'こづつみ|小包|kozutsumi|pacote, encomenda'] },
    { c: 'で', r: 'de', n: 'Como partícula indica o lugar da ação ou o meio: でんしゃでいく (densha de iku) = ir de trem.', ex: ['でんわ|電話|denwa|telefone', 'でぐち|出口|deguchi|saída', 'でんしゃ|電車|densha|trem', 'うで|腕|ude|braço', 'そで|袖|sode|manga (de roupa)'] },
    { c: 'ど', r: 'do', ex: ['まど|窓|mado|janela', 'こども|子供|kodomo|criança', 'どうぶつ|動物|dōbutsu|animal', 'どこ||doko|onde', 'のど|喉|nodo|garganta'] },

    { c: 'ば', r: 'ba', ex: ['ばしょ|場所|basho|lugar', 'ことば|言葉|kotoba|palavra', 'そば|蕎麦|soba|macarrão soba', 'ばら|薔薇|bara|rosa (flor)', 'ばんごはん|晩ご飯|bangohan|jantar'] },
    { c: 'び', r: 'bi', ex: ['へび|蛇|hebi|cobra', 'ゆび|指|yubi|dedo', 'えび|海老|ebi|camarão', 'くび|首|kubi|pescoço', 'あそび|遊び|asobi|brincadeira'] },
    { c: 'ぶ', r: 'bu', ex: ['ぶた|豚|buta|porco', 'ぶどう|葡萄|budō|uva', 'しんぶん|新聞|shinbun|jornal', 'ぶんか|文化|bunka|cultura', 'ぜんぶ|全部|zenbu|tudo'] },
    { c: 'べ', r: 'be', ex: ['たべもの|食べ物|tabemono|comida', 'かべ|壁|kabe|parede', 'べんとう|弁当|bentō|marmita (bentô)', 'なべ|鍋|nabe|panela', 'べんきょう|勉強|benkyō|estudo'] },
    { c: 'ぼ', r: 'bo', ex: ['ぼうし|帽子|bōshi|chapéu, boné', 'ぼく|僕|boku|eu (masculino, informal)', 'つぼ|壺|tsubo|pote, vaso', 'たんぼ|田んぼ|tanbo|arrozal', 'そぼ|祖母|sobo|avó (a minha)'] },

    { c: 'ぱ', r: 'pa', ex: ['かんぱい|乾杯|kanpai|saúde! (brinde)', 'いっぱい|一杯|ippai|cheio, muito', 'しっぱい|失敗|shippai|fracasso, erro', 'せんぱい|先輩|senpai|veterano', 'しんぱい|心配|shinpai|preocupação'] },
    { c: 'ぴ', r: 'pi', ex: ['えんぴつ|鉛筆|enpitsu|lápis', 'ぴかぴか||pikapika|brilhante, reluzente', 'ぴったり||pittari|na medida certa', 'いっぴき|一匹|ippiki|um (animal pequeno)', 'しんぴん|新品|shinpin|novo em folha'] },
    { c: 'ぷ', r: 'pu', ex: ['てんぷら|天ぷら|tenpura|tempurá', 'きっぷ|切符|kippu|bilhete, passagem', 'さんぷん|三分|sanpun|três minutos', 'いっぷん|一分|ippun|um minuto', 'ぷかぷか||pukapuka|boiando'] },
    { c: 'ぺ', r: 'pe', ex: ['ぺこぺこ||pekopeko|morrendo de fome', 'ぺらぺら||perapera|fluente (num idioma)', 'ぺろぺろ||peropero|lambendo', 'てっぺん||teppen|topo, cume', 'いっぺん|一遍|ippen|uma vez'] },
    { c: 'ぽ', r: 'po', ex: ['さんぽ|散歩|sanpo|passeio, caminhada', 'しっぽ|尻尾|shippo|rabo, cauda', 'たんぽぽ||tanpopo|dente-de-leão', 'いっぽん|一本|ippon|um (objeto comprido)', 'ぽかぽか||pokapoka|quentinho, agradável'] }
  ],

  yoon: [
    { c: 'きゃ', r: 'kya', ex: ['きゃく|客|kyaku|visita, cliente', 'おきゃくさん|お客さん|okyakusan|cliente', 'きゃっか|却下|kyakka|rejeição'] },
    { c: 'きゅ', r: 'kyu', ex: ['きゅう|九|kyū|nove', 'きゅうり|胡瓜|kyūri|pepino', 'きゅうきゅうしゃ|救急車|kyūkyūsha|ambulância'] },
    { c: 'きょ', r: 'kyo', ex: ['きょう|今日|kyō|hoje', 'きょうしつ|教室|kyōshitsu|sala de aula', 'とうきょう|東京|tōkyō|Tóquio'] },
    { c: 'しゃ', r: 'sha', ex: ['しゃしん|写真|shashin|foto', 'かいしゃ|会社|kaisha|empresa', 'でんしゃ|電車|densha|trem'] },
    { c: 'しゅ', r: 'shu', ex: ['しゅくだい|宿題|shukudai|lição de casa', 'しゅみ|趣味|shumi|hobby', 'かしゅ|歌手|kashu|cantor(a)'] },
    { c: 'しょ', r: 'sho', ex: ['じしょ|辞書|jisho|dicionário', 'しょくじ|食事|shokuji|refeição', 'としょかん|図書館|toshokan|biblioteca'] },
    { c: 'ちゃ', r: 'cha', ex: ['おちゃ|お茶|ocha|chá', 'ちゃわん|茶碗|chawan|tigela de arroz', 'あかちゃん|赤ちゃん|akachan|bebê'] },
    { c: 'ちゅ', r: 'chu', ex: ['ちゅうごく|中国|chūgoku|China', 'ちゅうしゃ|注射|chūsha|injeção', 'ちゅうい|注意|chūi|atenção, cuidado'] },
    { c: 'ちょ', r: 'cho', ex: ['ちょっと||chotto|um pouco', 'ちょうちょ|蝶々|chōcho|borboleta', 'ちょきん|貯金|chokin|poupança'] },
    { c: 'にゃ', r: 'nya', ex: ['こんにゃく|蒟蒻|konnyaku|konnyaku (gelatina de konjac)', 'にゃあ||nyā|miau', 'ふにゃふにゃ||funyafunya|molenga'] },
    { c: 'にゅ', r: 'nyu', ex: ['ぎゅうにゅう|牛乳|gyūnyū|leite', 'にゅういん|入院|nyūin|internação hospitalar', 'にゅうがく|入学|nyūgaku|ingresso na escola'] },
    { c: 'にょ', r: 'nyo', ex: ['にょうぼう|女房|nyōbō|esposa (informal)', 'にょろにょろ||nyoronyoro|serpenteando', 'にょう|尿|nyō|urina'] },
    { c: 'ひゃ', r: 'hya', ex: ['ひゃく|百|hyaku|cem', 'ひゃくえん|百円|hyakuen|cem ienes', 'ひゃっかてん|百貨店|hyakkaten|loja de departamentos'] },
    { c: 'ひゅ', r: 'hyu', n: 'Combinação rara em hiragana.', ex: ['ひゅうひゅう||hyūhyū|assobio do vento', 'ひゅっと||hyutto|num zás (movimento rápido)'] },
    { c: 'ひょ', r: 'hyo', ex: ['ひょう|表|hyō|tabela', 'ひょうじょう|表情|hyōjō|expressão facial', 'ひょうご|兵庫|hyōgo|Hyōgo (província)'] },
    { c: 'みゃ', r: 'mya', ex: ['みゃく|脈|myaku|pulso', 'さんみゃく|山脈|sanmyaku|cordilheira', 'みゃくはく|脈拍|myakuhaku|pulsação'] },
    { c: 'みゅ', r: 'myu', n: 'Quase não aparece em palavras japonesas; é comum em katakana: ミュージック (myūjikku, música).', ex: [] },
    { c: 'みょ', r: 'myo', ex: ['みょうじ|名字|myōji|sobrenome', 'みょうにち|明日|myōnichi|amanhã (formal)', 'きみょう|奇妙|kimyō|estranho'] },
    { c: 'りゃ', r: 'rya', ex: ['りゃく|略|ryaku|abreviação', 'しょうりゃく|省略|shōryaku|omissão', 'りゃくご|略語|ryakugo|sigla, abreviatura'] },
    { c: 'りゅ', r: 'ryu', ex: ['りゅう|竜|ryū|dragão', 'りゅうがく|留学|ryūgaku|estudar no exterior', 'りゅうこう|流行|ryūkō|moda, tendência'] },
    { c: 'りょ', r: 'ryo', ex: ['りょこう|旅行|ryokō|viagem', 'りょうり|料理|ryōri|culinária, prato', 'りょうしん|両親|ryōshin|pais'] },
    { c: 'ぎゃ', r: 'gya', ex: ['ぎゃく|逆|gyaku|contrário, inverso', 'ぎゃくてん|逆転|gyakuten|virada (reviravolta)', 'ぎゃっこう|逆光|gyakkō|contraluz'] },
    { c: 'ぎゅ', r: 'gyu', ex: ['ぎゅうにゅう|牛乳|gyūnyū|leite', 'ぎゅうにく|牛肉|gyūniku|carne bovina', 'ぎゅうどん|牛丼|gyūdon|tigela de arroz com carne'] },
    { c: 'ぎょ', r: 'gyo', ex: ['きんぎょ|金魚|kingyo|peixinho-dourado', 'ぎょうざ|餃子|gyōza|guioza', 'ぎょうれつ|行列|gyōretsu|fila'] },
    { c: 'じゃ', r: 'ja', ex: ['じゃま|邪魔|jama|estorvo, atrapalhar', 'じゃあね||jā ne|até mais', 'じゃんけん||janken|pedra, papel e tesoura'] },
    { c: 'じゅ', r: 'ju', ex: ['じゅぎょう|授業|jugyō|aula', 'じゅうしょ|住所|jūsho|endereço', 'じゅう|十|jū|dez'] },
    { c: 'じょ', r: 'jo', ex: ['じょうず|上手|jōzu|habilidoso', 'じょせい|女性|josei|mulher', 'かのじょ|彼女|kanojo|ela, namorada'] },
    { c: 'びゃ', r: 'bya', ex: ['さんびゃく|三百|sanbyaku|trezentos', 'びゃっこ|白虎|byakko|tigre branco (mitologia)'] },
    { c: 'びゅ', r: 'byu', n: 'Combinação rara em hiragana.', ex: ['びゅうびゅう||byūbyū|vento uivando'] },
    { c: 'びょ', r: 'byo', ex: ['びょういん|病院|byōin|hospital', 'びょうき|病気|byōki|doença', 'びょう|秒|byō|segundo (tempo)'] },
    { c: 'ぴゃ', r: 'pya', ex: ['はっぴゃく|八百|happyaku|oitocentos', 'ろっぴゃく|六百|roppyaku|seiscentos'] },
    { c: 'ぴゅ', r: 'pyu', n: 'Combinação rara em hiragana.', ex: ['ぴゅうぴゅう||pyūpyū|vento assobiando'] },
    { c: 'ぴょ', r: 'pyo', ex: ['ぴょんぴょん||pyonpyon|pulando, saltitando', 'はっぴょう|発表|happyō|apresentação, anúncio', 'いっぴょう|一票|ippyō|um voto'] }
  ],

  small: [
    { c: 'っ', r: 'tsu', snd: 'small_tsu', label: 'pequeno', ime: 'ltu / xtu (ou dobre a consoante)', n: 'Chamado sokuon. Não é lido como "tsu": faz uma pausa curta e dobra a consoante seguinte no romaji (きって = kitte). Compare: きて (kite, venha) × きって (kitte, selo).', ex: ['きって|切手|kitte|selo', 'がっこう|学校|gakkō|escola', 'ざっし|雑誌|zasshi|revista', 'ちょっと||chotto|um pouco', 'みっつ|三つ|mittsu|três (coisas)'] },
    { c: 'ゃ', r: 'ya', snd: 'ya', label: 'pequeno', ime: 'lya / xya', n: 'Sempre depois de um caractere terminado em "i" (き, し, ち…), formando uma sílaba só: き + ゃ = きゃ (kya). Grande, や é lido separado: きや (kiya).', ex: ['おちゃ|お茶|ocha|chá', 'でんしゃ|電車|densha|trem', 'ひゃく|百|hyaku|cem'] },
    { c: 'ゅ', r: 'yu', snd: 'yu', label: 'pequeno', ime: 'lyu / xyu', n: 'Forma combinações com caracteres terminados em "i": し + ゅ = しゅ (shu).', ex: ['しゅみ|趣味|shumi|hobby', 'ぎゅうにゅう|牛乳|gyūnyū|leite', 'じゅう|十|jū|dez'] },
    { c: 'ょ', r: 'yo', snd: 'yo', label: 'pequeno', ime: 'lyo / xyo', n: 'Forma combinações com caracteres terminados em "i": り + ょ = りょ (ryo). Compare: びょういん (byōin, hospital) × びよういん (biyōin, salão de beleza).', ex: ['きょう|今日|kyō|hoje', 'りょこう|旅行|ryokō|viagem', 'びょういん|病院|byōin|hospital'] }
  ]
};
