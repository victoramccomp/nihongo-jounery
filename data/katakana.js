/* Katakana. Mesmos campos do hiragana.js. Os exemplos são, em sua maioria, palavras estrangeiras (gairaigo),
   que é onde o katakana mais aparece; elas não têm kanji. */
window.NJ = window.NJ || {};
NJ.kana = NJ.kana || {};

NJ.kana.katakana = {
  base: [
    { c: 'ア', r: 'a', o: '阿', s: ['マ', 'ヤ'], ex: ['アイス||aisu|sorvete', 'アメリカ||amerika|Estados Unidos', 'アニメ||anime|anime', 'アイドル||aidoru|ídolo (artista pop)', 'アルバイト||arubaito|trabalho de meio período'] },
    { c: 'イ', r: 'i', o: '伊', s: ['ト', 'ィ'], ex: ['イギリス||igirisu|Reino Unido', 'イタリア||itaria|Itália', 'インターネット||intānetto|internet', 'ワイン||wain|vinho', 'イベント||ibento|evento'] },
    { c: 'ウ', r: 'u', o: '宇', s: ['ワ', 'フ', 'ラ'], ex: ['ウイルス||uirusu|vírus', 'ウール||ūru|lã', 'サウナ||sauna|sauna', 'ソウル||sōru|Seul', 'ウインク||uinku|piscadela'] },
    { c: 'エ', r: 'e', o: '江', s: ['工', 'ユ'], w: 'Não confunda com o kanji 工 (trabalho), que é igual: o contexto diz qual é.', ex: ['エレベーター||erebētā|elevador', 'エアコン||eakon|ar-condicionado', 'エネルギー||enerugī|energia', 'エンジン||enjin|motor', 'エプロン||epuron|avental'] },
    { c: 'オ', r: 'o', o: '於', s: ['ホ', '才'], ex: ['オレンジ||orenji|laranja', 'オリンピック||orinpikku|Olimpíadas', 'ラジオ||rajio|rádio', 'ビデオ||bideo|vídeo', 'オーストラリア||ōsutoraria|Austrália'] },

    { c: 'カ', r: 'ka', o: '加', s: ['力', 'ヵ'], w: 'Muito parecido com o kanji 力 (força), que não tem o gancho tão marcado.', ex: ['カメラ||kamera|câmera', 'カレー||karē|curry', 'カード||kādo|cartão', 'スカート||sukāto|saia', 'アメリカ||amerika|Estados Unidos'] },
    { c: 'キ', r: 'ki', o: '幾', s: ['き', 'モ'], ex: ['キッチン||kitchin|cozinha', 'ケーキ||kēki|bolo', 'スキー||sukī|esqui', 'キス||kisu|beijo', 'キロ||kiro|quilo'] },
    { c: 'ク', r: 'ku', o: '久', s: ['ケ', 'タ', 'ワ'], w: 'ク tem 2 traços; タ é igual com um tracinho a mais no meio; ケ tem o segundo traço reto e um terceiro descendo.', ex: ['クラス||kurasu|turma, classe', 'クリスマス||kurisumasu|Natal', 'ピンク||pinku|rosa (cor)', 'マスク||masuku|máscara', 'クッキー||kukkī|biscoito'] },
    { c: 'ケ', r: 'ke', o: '介', s: ['ク', 'タ'], ex: ['ケーキ||kēki|bolo', 'ポケモン||pokemon|Pokémon', 'ポケット||poketto|bolso', 'ケチャップ||kechappu|ketchup', 'ロケット||roketto|foguete'] },
    { c: 'コ', r: 'ko', o: '己', s: ['ユ', 'ロ'], w: 'コ abre para a esquerda; ユ abre para cima; ロ é fechado.', ex: ['コーヒー||kōhī|café (bebida)', 'コップ||koppu|copo', 'ココア||kokoa|chocolate quente', 'エアコン||eakon|ar-condicionado', 'コンビニ||konbini|loja de conveniência'] },

    { c: 'サ', r: 'sa', o: '散', s: ['せ', 'ナ'], ex: ['サッカー||sakkā|futebol', 'サラダ||sarada|salada', 'サイズ||saizu|tamanho', 'サンドイッチ||sandoitchi|sanduíche', 'サウナ||sauna|sauna'] },
    { c: 'シ', r: 'shi', o: '之', s: ['ツ', 'ミ', 'ン'], w: 'シ: os dois pontos ficam um embaixo do outro, mais deitados, e o traço longo sobe da esquerda-baixo para a direita. Em ツ os pontos ficam lado a lado e o traço longo desce.', ex: ['タクシー||takushī|táxi', 'システム||shisutemu|sistema', 'シンプル||shinpuru|simples', 'ミシン||mishin|máquina de costura', 'シーズン||shīzun|temporada'] },
    { c: 'ス', r: 'su', o: '須', s: ['ヌ', 'ヘ'], ex: ['スポーツ||supōtsu|esporte', 'バス||basu|ônibus', 'テスト||tesuto|prova, teste', 'スープ||sūpu|sopa', 'ジュース||jūsu|suco'] },
    { c: 'セ', r: 'se', o: '世', s: ['せ', 'ヒ'], ex: ['セーター||sētā|suéter', 'セット||setto|conjunto, combo', 'セール||sēru|liquidação', 'センター||sentā|centro', 'セロリ||serori|aipo, salsão'] },
    { c: 'ソ', r: 'so', o: '曽', s: ['ン', 'リ', 'ツ'], w: 'ソ: o traço longo desce de cima para baixo, quase na vertical. Em ン ele sobe de baixo para cima e o primeiro traço é mais deitado.', ex: ['ソファー||sofā|sofá', 'ソース||sōsu|molho', 'ソフト||sofuto|software, macio', 'ソーセージ||sōsēji|salsicha', 'ソウル||sōru|Seul'] },

    { c: 'タ', r: 'ta', o: '多', s: ['ク', 'ケ', '夕'], ex: ['タクシー||takushī|táxi', 'タオル||taoru|toalha', 'ギター||gitā|violão, guitarra', 'バター||batā|manteiga', 'タイ||tai|Tailândia'] },
    { c: 'チ', r: 'chi', o: '千', s: ['テ', '千'], ex: ['チーズ||chīzu|queijo', 'チケット||chiketto|ingresso', 'チーム||chīmu|time, equipe', 'キッチン||kitchin|cozinha', 'ランチ||ranchi|almoço'] },
    { c: 'ツ', r: 'tsu', o: '川', s: ['シ', 'ソ'], w: 'ツ: os dois pontos ficam lado a lado, mais em pé, e o traço longo desce da direita para a esquerda. Em シ os pontos ficam um embaixo do outro e o traço sobe.', n: 'Pequeno (ッ) dobra a consoante seguinte, como no hiragana.', ex: ['シャツ||shatsu|camisa', 'スポーツ||supōtsu|esporte', 'ツアー||tsuā|excursão, tour', 'パンツ||pantsu|calça, cueca', 'ドイツ||doitsu|Alemanha'] },
    { c: 'テ', r: 'te', o: '天', s: ['チ', 'ラ'], ex: ['テレビ||terebi|televisão', 'テスト||tesuto|prova, teste', 'ホテル||hoteru|hotel', 'テニス||tenisu|tênis (esporte)', 'テーブル||tēburu|mesa'] },
    { c: 'ト', r: 'to', o: '止', s: ['卜', 'ド'], ex: ['トマト||tomato|tomate', 'トイレ||toire|banheiro', 'ノート||nōto|caderno', 'デパート||depāto|loja de departamentos', 'トラック||torakku|caminhão'] },

    { c: 'ナ', r: 'na', o: '奈', s: ['メ', 'サ', '十'], ex: ['バナナ||banana|banana', 'ナイフ||naifu|faca', 'ナンバー||nanbā|número', 'ナース||nāsu|enfermeira', 'サウナ||sauna|sauna'] },
    { c: 'ニ', r: 'ni', o: '仁', s: ['二', 'コ'], w: 'Igual ao kanji 二 (dois).', ex: ['アニメ||anime|anime', 'テニス||tenisu|tênis (esporte)', 'ミニ||mini|mini', 'ユニフォーム||yunifōmu|uniforme', 'ニット||nitto|malha, tricô'] },
    { c: 'ヌ', r: 'nu', o: '奴', s: ['ス', 'メ'], w: 'É um ス com um tracinho cortando a diagonal.', n: 'Pouco frequente em palavras estrangeiras.', ex: ['ヌードル||nūdoru|macarrão (noodle)', 'カヌー||kanū|canoa', 'ヌガー||nugā|nugá', 'アイヌ||ainu|Ainu (povo nativo do norte do Japão)'] },
    { c: 'ネ', r: 'ne', o: '祢', s: ['ホ', 'ヌ'], ex: ['ネクタイ||nekutai|gravata', 'ネット||netto|internet, rede', 'ネックレス||nekkuresu|colar', 'トンネル||tonneru|túnel', 'ネオン||neon|néon'] },
    { c: 'ノ', r: 'no', o: '乃', s: ['メ', 'ソ'], ex: ['ノート||nōto|caderno', 'ピアノ||piano|piano', 'ノック||nokku|bater (na porta)', 'カジノ||kajino|cassino', 'カプチーノ||kapuchīno|cappuccino'] },

    { c: 'ハ', r: 'ha', o: '八', s: ['八', 'ル'], w: 'Igual ao kanji 八 (oito).', ex: ['ハンバーガー||hanbāgā|hambúrguer', 'ハンカチ||hankachi|lenço', 'ハム||hamu|presunto', 'ハート||hāto|coração (símbolo)', 'ハワイ||hawai|Havaí'] },
    { c: 'ヒ', r: 'hi', o: '比', s: ['ビ', 'セ', '匕'], ex: ['コーヒー||kōhī|café (bebida)', 'ヒーロー||hīrō|herói', 'ヒント||hinto|dica', 'ヒーター||hītā|aquecedor', 'ヒップホップ||hippuhoppu|hip-hop'] },
    { c: 'フ', r: 'fu', o: '不', s: ['ワ', 'ウ', 'ヲ'], ex: ['ナイフ||naifu|faca', 'フランス||furansu|França', 'スカーフ||sukāfu|cachecol, lenço', 'フルーツ||furūtsu|frutas', 'ゴルフ||gorufu|golfe'] },
    { c: 'ヘ', r: 'he', o: '部', s: ['へ', 'ス'], w: 'Praticamente igual ao hiragana へ; o katakana costuma ser mais reto e anguloso.', ex: ['ヘリコプター||herikoputā|helicóptero', 'ヘア||hea|cabelo (penteado)', 'ヘルメット||herumetto|capacete', 'ヘルシー||herushī|saudável', 'ヘッドホン||heddohon|fone de ouvido'] },
    { c: 'ホ', r: 'ho', o: '保', s: ['木', 'ネ', 'オ'], ex: ['ホテル||hoteru|hotel', 'ホーム||hōmu|plataforma (estação), lar', 'ホット||hotto|quente', 'ヘッドホン||heddohon|fone de ouvido', 'ホッチキス||hotchikisu|grampeador'] },

    { c: 'マ', r: 'ma', o: '末', s: ['ア', 'ム'], ex: ['マスク||masuku|máscara', 'マラソン||marason|maratona', 'トマト||tomato|tomate', 'ママ||mama|mamãe', 'マンション||manshon|apartamento (prédio)'] },
    { c: 'ミ', r: 'mi', o: '三', s: ['シ', '三'], ex: ['ミルク||miruku|leite', 'ミシン||mishin|máquina de costura', 'ミス||misu|erro', 'ミニ||mini|mini', 'ゼミ||zemi|seminário (aula)'] },
    { c: 'ム', r: 'mu', o: '牟', s: ['マ', 'ヌ'], ex: ['ゲーム||gēmu|jogo, game', 'ハム||hamu|presunto', 'チーム||chīmu|time, equipe', 'ムード||mūdo|clima, ambiente', 'アルバム||arubamu|álbum'] },
    { c: 'メ', r: 'me', o: '女', s: ['ナ', 'ノ', 'ヌ'], ex: ['メール||mēru|e-mail', 'カメラ||kamera|câmera', 'アニメ||anime|anime', 'メロン||meron|melão', 'メモ||memo|anotação'] },
    { c: 'モ', r: 'mo', o: '毛', s: ['キ', 'も'], ex: ['モデル||moderu|modelo', 'メモ||memo|anotação', 'ポケモン||pokemon|Pokémon', 'レモン||remon|limão-siciliano', 'モノレール||monorēru|monotrilho'] },

    { c: 'ヤ', r: 'ya', o: '也', s: ['セ', 'や'], ex: ['タイヤ||taiya|pneu', 'イヤホン||iyahon|fone de ouvido (intra-auricular)', 'ダイヤ||daiya|diamante; horário de trens', 'ロイヤル||roiyaru|real (da realeza)', 'ヤング||yangu|jovem'] },
    { c: 'ユ', r: 'yu', o: '由', s: ['コ', 'エ'], ex: ['ユニフォーム||yunifōmu|uniforme', 'ユーモア||yūmoa|humor', 'ユーザー||yūzā|usuário', 'ユーロ||yūro|euro', 'ユニーク||yunīku|original, único'] },
    { c: 'ヨ', r: 'yo', o: '与', s: ['ヲ', 'コ'], ex: ['ヨーグルト||yōguruto|iogurte', 'ヨット||yotto|veleiro, iate', 'ヨーロッパ||yōroppa|Europa', 'マヨネーズ||mayonēzu|maionese', 'ヨガ||yoga|ioga'] },

    { c: 'ラ', r: 'ra', o: '良', s: ['ヲ', 'テ', 'ウ'], ex: ['ラジオ||rajio|rádio', 'ラーメン||rāmen|lámen', 'カメラ||kamera|câmera', 'サラダ||sarada|salada', 'ドラマ||dorama|dorama, série de TV'] },
    { c: 'リ', r: 'ri', o: '利', s: ['り', 'ソ', 'ル'], ex: ['アメリカ||amerika|Estados Unidos', 'イギリス||igirisu|Reino Unido', 'リモコン||rimokon|controle remoto', 'パリ||pari|Paris', 'リボン||ribon|fita, laço'] },
    { c: 'ル', r: 'ru', o: '流', s: ['レ', 'ハ', 'リ'], ex: ['ビル||biru|prédio', 'ボール||bōru|bola', 'ホテル||hoteru|hotel', 'ルール||rūru|regra', 'メール||mēru|e-mail'] },
    { c: 'レ', r: 're', o: '礼', s: ['ル', 'し'], ex: ['レストラン||resutoran|restaurante', 'カレー||karē|curry', 'トイレ||toire|banheiro', 'テレビ||terebi|televisão', 'レモン||remon|limão-siciliano'] },
    { c: 'ロ', r: 'ro', o: '呂', s: ['口', 'コ'], w: 'Igual ao kanji 口 (boca); o katakana costuma ser um pouco menor.', ex: ['ロボット||robotto|robô', 'メロン||meron|melão', 'ヒーロー||hīrō|herói', 'ロケット||roketto|foguete', 'ゼロ||zero|zero'] },

    { c: 'ワ', r: 'wa', o: '和', s: ['ウ', 'フ', 'ク'], ex: ['ワイン||wain|vinho', 'ハワイ||hawai|Havaí', 'シャワー||shawā|chuveiro, ducha', 'タワー||tawā|torre', 'ワンピース||wanpīsu|vestido (e o anime One Piece)'] },
    { c: 'ヲ', r: 'wo', o: '乎', s: ['ヨ', 'フ', 'ラ'], n: 'Quase não é usado. Só aparece em textos escritos todo em katakana (telegramas antigos, títulos e efeitos estilizados), no lugar da partícula を.', ex: [] },
    { c: 'ン', r: 'n', o: '尓 (origem incerta)', s: ['ソ', 'シ'], w: 'ン: o primeiro traço é quase horizontal e o traço longo sobe de baixo para cima. Em ソ o primeiro traço é mais em pé e o longo desce.', n: 'Mesmo comportamento do ん: vale uma batida e muda de som conforme a letra seguinte.', ex: ['パン||pan|pão', 'ペン||pen|caneta', 'レストラン||resutoran|restaurante', 'ワイン||wain|vinho', 'ラーメン||rāmen|lámen'] }
  ],

  dakuten: [
    { c: 'ガ', r: 'ga', ex: ['ガム||gamu|chiclete', 'ガラス||garasu|vidro', 'ガイド||gaido|guia', 'ガソリン||gasorin|gasolina', 'ガス||gasu|gás'] },
    { c: 'ギ', r: 'gi', ex: ['ギター||gitā|violão, guitarra', 'イギリス||igirisu|Reino Unido', 'エネルギー||enerugī|energia', 'ギフト||gifuto|presente', 'アレルギー||arerugī|alergia'] },
    { c: 'グ', r: 'gu', ex: ['グラス||gurasu|taça, copo de vidro', 'グループ||gurūpu|grupo', 'ヨーグルト||yōguruto|iogurte', 'バッグ||baggu|bolsa', 'グレー||gurē|cinza'] },
    { c: 'ゲ', r: 'ge', ex: ['ゲーム||gēmu|jogo, game', 'ゲスト||gesuto|convidado', 'ゲート||gēto|portão', 'ゲレンデ||gerende|pista de esqui', 'ゲノム||genomu|genoma'] },
    { c: 'ゴ', r: 'go', ex: ['ゴルフ||gorufu|golfe', 'ゴール||gōru|gol, meta', 'ゴム||gomu|borracha (elástico)', 'ゴリラ||gorira|gorila', 'マンゴー||mangō|manga (fruta)'] },

    { c: 'ザ', r: 'za', ex: ['ピザ||piza|pizza', 'デザート||dezāto|sobremesa', 'デザイン||dezain|design', 'バザー||bazā|bazar', 'ザリガニ||zarigani|lagostim'] },
    { c: 'ジ', r: 'ji', ex: ['ラジオ||rajio|rádio', 'ページ||pēji|página', 'オレンジ||orenji|laranja', 'ジーンズ||jīnzu|jeans', 'エンジン||enjin|motor'] },
    { c: 'ズ', r: 'zu', ex: ['チーズ||chīzu|queijo', 'サイズ||saizu|tamanho', 'ズボン||zubon|calça', 'クイズ||kuizu|quiz', 'ジーンズ||jīnzu|jeans'] },
    { c: 'ゼ', r: 'ze', ex: ['ゼロ||zero|zero', 'プレゼント||purezento|presente', 'ゼミ||zemi|seminário (aula)', 'ゼリー||zerī|gelatina', 'ガーゼ||gāze|gaze'] },
    { c: 'ゾ', r: 'zo', ex: ['ゾーン||zōn|zona', 'アマゾン||amazon|Amazônia', 'リゾート||rizōto|resort', 'ゾンビ||zonbi|zumbi', 'オゾン||ozon|ozônio'] },

    { c: 'ダ', r: 'da', ex: ['サラダ||sarada|salada', 'ダンス||dansu|dança', 'カナダ||kanada|Canadá', 'オランダ||oranda|Holanda (Países Baixos)', 'パンダ||panda|panda'] },
    { c: 'ヂ', r: 'ji', ime: 'di', k: 'zi', s: ['ジ'], n: 'Praticamente não é usado. O som "ji" em katakana é escrito com ジ.', ex: [] },
    { c: 'ヅ', r: 'zu', ime: 'du', s: ['ズ'], n: 'Praticamente não é usado. O som "zu" em katakana é escrito com ズ.', ex: [] },
    { c: 'デ', r: 'de', ex: ['デパート||depāto|loja de departamentos', 'デザート||dezāto|sobremesa', 'モデル||moderu|modelo', 'ビデオ||bideo|vídeo', 'デート||dēto|encontro (romântico)'] },
    { c: 'ド', r: 'do', ex: ['ドア||doa|porta', 'ドラマ||dorama|dorama, série de TV', 'カード||kādo|cartão', 'ドイツ||doitsu|Alemanha', 'ガイド||gaido|guia'] },

    { c: 'バ', r: 'ba', ex: ['バス||basu|ônibus', 'バナナ||banana|banana', 'バター||batā|manteiga', 'バッグ||baggu|bolsa', 'アルバイト||arubaito|trabalho de meio período'] },
    { c: 'ビ', r: 'bi', ex: ['テレビ||terebi|televisão', 'ビル||biru|prédio', 'ビール||bīru|cerveja', 'ビデオ||bideo|vídeo', 'ゾンビ||zonbi|zumbi'] },
    { c: 'ブ', r: 'bu', ex: ['ブラジル||burajiru|Brasil', 'テーブル||tēburu|mesa', 'ブログ||burogu|blog', 'ブーツ||būtsu|botas', 'ブルー||burū|azul'] },
    { c: 'ベ', r: 'be', ex: ['ベッド||beddo|cama', 'ベルト||beruto|cinto', 'ベンチ||benchi|banco (assento)', 'エレベーター||erebētā|elevador', 'ベランダ||beranda|varanda'] },
    { c: 'ボ', r: 'bo', ex: ['ボール||bōru|bola', 'ロボット||robotto|robô', 'ボタン||botan|botão', 'ボールペン||bōrupen|caneta esferográfica', 'ズボン||zubon|calça'] },

    { c: 'パ', r: 'pa', ex: ['パン||pan|pão', 'パソコン||pasokon|computador (PC)', 'デパート||depāto|loja de departamentos', 'パスポート||pasupōto|passaporte', 'パンダ||panda|panda'] },
    { c: 'ピ', r: 'pi', ex: ['ピアノ||piano|piano', 'ピザ||piza|pizza', 'ピンク||pinku|rosa (cor)', 'ピカチュウ||pikachū|Pikachu', 'スピード||supīdo|velocidade'] },
    { c: 'プ', r: 'pu', ex: ['プール||pūru|piscina', 'スープ||sūpu|sopa', 'プレゼント||purezento|presente', 'コップ||koppu|copo', 'プロ||puro|profissional'] },
    { c: 'ペ', r: 'pe', ex: ['ペン||pen|caneta', 'ページ||pēji|página', 'ペット||petto|animal de estimação', 'スペイン||supein|Espanha', 'ペンギン||pengin|pinguim'] },
    { c: 'ポ', r: 'po', ex: ['ポケモン||pokemon|Pokémon', 'ポケット||poketto|bolso', 'スポーツ||supōtsu|esporte', 'パスポート||pasupōto|passaporte', 'ポスト||posuto|caixa de correio'] }
  ],

  yoon: [
    { c: 'キャ', r: 'kya', ex: ['キャンプ||kyanpu|acampamento', 'キャベツ||kyabetsu|repolho', 'キャラクター||kyarakutā|personagem'] },
    { c: 'キュ', r: 'kyu', ex: ['キューバ||kyūba|Cuba', 'バーベキュー||bābekyū|churrasco', 'キュート||kyūto|fofo'] },
    { c: 'キョ', r: 'kyo', n: 'Pouco frequente em palavras estrangeiras.', ex: ['キョロキョロ||kyorokyoro|olhar para todos os lados'] },
    { c: 'シャ', r: 'sha', ex: ['シャツ||shatsu|camisa', 'シャワー||shawā|chuveiro, ducha', 'シャンプー||shanpū|xampu'] },
    { c: 'シュ', r: 'shu', ex: ['シューズ||shūzu|tênis, calçados', 'シュークリーム||shūkurīmu|bomba de creme', 'シュート||shūto|chute a gol'] },
    { c: 'ショ', r: 'sho', ex: ['ショッピング||shoppingu|compras', 'ショー||shō|show, espetáculo', 'マンション||manshon|apartamento (prédio)'] },
    { c: 'チャ', r: 'cha', ex: ['チャンス||chansu|chance, oportunidade', 'チャンネル||channeru|canal', 'ケチャップ||kechappu|ketchup'] },
    { c: 'チュ', r: 'chu', ex: ['ピカチュウ||pikachū|Pikachu', 'チューリップ||chūrippu|tulipa', 'シチュー||shichū|ensopado'] },
    { c: 'チョ', r: 'cho', ex: ['チョコレート||chokorēto|chocolate', 'チョーク||chōku|giz', 'チョコ||choko|chocolate (abreviado)'] },
    { c: 'ニャ', r: 'nya', ex: ['ニャース||nyāsu|Meowth (Pokémon)', 'ニャンコ||nyanko|gatinho'] },
    { c: 'ニュ', r: 'nyu', ex: ['ニュース||nyūsu|notícias', 'メニュー||menyū|cardápio', 'ニューヨーク||nyūyōku|Nova York'] },
    { c: 'ニョ', r: 'nyo', ex: ['ニョッキ||nyokki|nhoque'] },
    { c: 'ヒャ', r: 'hya', n: 'Raro; aparece em interjeições.', ex: ['ヒャッホー||hyahhō|iuhu! (grito de alegria)'] },
    { c: 'ヒュ', r: 'hyu', ex: ['ヒューズ||hyūzu|fusível', 'ヒューマン||hyūman|humano'] },
    { c: 'ヒョ', r: 'hyo', ex: ['ヒョウ||hyō|leopardo'] },
    { c: 'ミャ', r: 'mya', ex: ['ミャンマー||myanmā|Mianmar'] },
    { c: 'ミュ', r: 'myu', ex: ['ミュージック||myūjikku|música', 'ミュージアム||myūjiamu|museu', 'ミュージカル||myūjikaru|musical'] },
    { c: 'ミョ', r: 'myo', n: 'Raríssimo em katakana.', ex: [] },
    { c: 'リャ', r: 'rya', n: 'Raríssimo em katakana.', ex: [] },
    { c: 'リュ', r: 'ryu', ex: ['リュック||ryukku|mochila', 'ボリューム||boryūmu|volume'] },
    { c: 'リョ', r: 'ryo', n: 'Raro em katakana.', ex: [] },
    { c: 'ギャ', r: 'gya', ex: ['ギャグ||gyagu|piada, gag', 'ギャラリー||gyararī|galeria'] },
    { c: 'ギュ', r: 'gyu', ex: ['フィギュア||figyua|boneco colecionável, action figure'] },
    { c: 'ギョ', r: 'gyo', ex: ['ギョーザ||gyōza|guioza (também escrito 餃子)'] },
    { c: 'ジャ', r: 'ja', ex: ['ジャム||jamu|geleia', 'ジャズ||jazu|jazz', 'ジャケット||jaketto|jaqueta'] },
    { c: 'ジュ', r: 'ju', ex: ['ジュース||jūsu|suco', 'スケジュール||sukejūru|agenda, cronograma'] },
    { c: 'ジョ', r: 'jo', ex: ['ジョギング||jogingu|corrida leve (cooper)', 'ジョーク||jōku|piada'] },
    { c: 'ビャ', r: 'bya', n: 'Raríssimo em katakana.', ex: [] },
    { c: 'ビュ', r: 'byu', ex: ['インタビュー||intabyū|entrevista', 'デビュー||debyū|estreia', 'レビュー||rebyū|resenha, avaliação'] },
    { c: 'ビョ', r: 'byo', n: 'Raríssimo em katakana.', ex: [] },
    { c: 'ピャ', r: 'pya', n: 'Raríssimo em katakana.', ex: [] },
    { c: 'ピュ', r: 'pyu', ex: ['コンピューター||konpyūtā|computador', 'ピューレ||pyūre|purê'] },
    { c: 'ピョ', r: 'pyo', ex: ['ピョンヤン||pyonyan|Pyongyang'] }
  ],

  ext: [
    { c: 'ヴ', r: 'vu', n: 'Criado para o som de "v" em palavras estrangeiras; combina com ァィェォ pequenos (ヴァ va, ヴィ vi, ヴェ ve, ヴォ vo). Muitas palavras também têm uma grafia com バ: ヴァイオリン = バイオリン.', ex: ['ヴァイオリン||vaiorin|violino', 'ヴィーナス||vīnasu|Vênus', 'ヴォーカル||vōkaru|vocal (cantor)'] },
    { c: 'ファ', r: 'fa', ex: ['ファン||fan|fã', 'ファイル||fairu|arquivo, pasta', 'ソファ||sofa|sofá'] },
    { c: 'フィ', r: 'fi', ex: ['フィルム||firumu|filme fotográfico', 'フィギュア||figyua|boneco colecionável', 'フィンランド||finrando|Finlândia'] },
    { c: 'フェ', r: 'fe', ex: ['カフェ||kafe|café (lugar)', 'フェスティバル||fesutibaru|festival'] },
    { c: 'フォ', r: 'fo', ex: ['フォーク||fōku|garfo', 'カリフォルニア||kariforunia|Califórnia'] },
    { c: 'ティ', r: 'ti', ime: 'thi', ex: ['パーティー||pātī|festa', 'ティッシュ||tisshu|lenço de papel', 'スパゲッティ||supagetti|espaguete'] },
    { c: 'ディ', r: 'di', ime: 'dhi', ex: ['ディズニー||dizunī|Disney', 'メロディー||merodī|melodia', 'ディスク||disuku|disco'] },
    { c: 'トゥ', r: 'tu', ime: 'twu', ex: ['タトゥー||tatū|tatuagem'] },
    { c: 'ウィ', r: 'wi', ex: ['ハロウィン||harowin|Halloween', 'ウィキペディア||wikipedia|Wikipédia'] },
    { c: 'ウェ', r: 'we', ex: ['ウェブ||webu|web', 'ウェイター||weitā|garçom', 'ノルウェー||noruwē|Noruega'] },
    { c: 'ウォ', r: 'wo', snd: 'wo~', ime: 'who', ex: ['ウォーキング||wōkingu|caminhada', 'ミネラルウォーター||mineraru wōtā|água mineral'] },
    { c: 'シェ', r: 'she', ex: ['シェフ||shefu|chef de cozinha', 'シェア||shea|compartilhar'] },
    { c: 'ジェ', r: 'je', ex: ['ジェットコースター||jetto kōsutā|montanha-russa', 'ジェスチャー||jesuchā|gesto'] },
    { c: 'チェ', r: 'che', ex: ['チェック||chekku|verificação, check', 'チェス||chesu|xadrez'] },
    { c: 'ツァ', r: 'tsa', ex: ['モーツァルト||mōtsaruto|Mozart'] }
  ],

  small: [
    { c: 'ッ', r: 'tsu', snd: 'small_tsu', label: 'pequeno', ime: 'ltu / xtu (ou dobre a consoante)', n: 'Igual ao っ do hiragana: pausa curta que dobra a consoante seguinte. Muito comum em palavras estrangeiras.', ex: ['ベッド||beddo|cama', 'ロボット||robotto|robô', 'サッカー||sakkā|futebol', 'チケット||chiketto|ingresso', 'キッチン||kitchin|cozinha'] },
    { c: 'ー', r: '—', snd: 'choon', label: 'traço de alongamento', ime: 'tecla de hífen (-)', n: 'Chamado chōonpu. Estica a vogal anterior. No katakana substitui o う/い/あ usados para alongar no hiragana. Na escrita vertical ele também fica vertical (｜).', ex: ['ラーメン||rāmen|lámen', 'コーヒー||kōhī|café (bebida)', 'ケーキ||kēki|bolo', 'ビール||bīru|cerveja', 'スーパー||sūpā|supermercado'] },
    { c: 'ャ', r: 'ya', snd: 'ya', label: 'pequeno', ime: 'lya / xya', n: 'Forma combinações com caracteres terminados em "i": キ + ャ = キャ (kya).', ex: ['キャンプ||kyanpu|acampamento', 'シャツ||shatsu|camisa', 'ジャム||jamu|geleia'] },
    { c: 'ュ', r: 'yu', snd: 'yu', label: 'pequeno', ime: 'lyu / xyu', n: 'Forma combinações com caracteres terminados em "i": ニ + ュ = ニュ (nyu).', ex: ['ニュース||nyūsu|notícias', 'メニュー||menyū|cardápio', 'ジュース||jūsu|suco'] },
    { c: 'ョ', r: 'yo', snd: 'yo', label: 'pequeno', ime: 'lyo / xyo', n: 'Forma combinações com caracteres terminados em "i": チ + ョ = チョ (cho).', ex: ['チョコレート||chokorēto|chocolate', 'ショー||shō|show', 'ジョーク||jōku|piada'] },
    { c: 'ァ', r: 'a', snd: 'a', label: 'pequeno', ime: 'la / xa', n: 'Vogal pequena: muda a vogal do caractere anterior para formar sons estrangeiros. フ + ァ = ファ (fa).', ex: ['ファン||fan|fã', 'ソファ||sofa|sofá'] },
    { c: 'ィ', r: 'i', snd: 'i', label: 'pequeno', ime: 'li / xi', n: 'Vogal pequena para sons estrangeiros: テ + ィ = ティ (ti), デ + ィ = ディ (di).', ex: ['パーティー||pātī|festa', 'ディズニー||dizunī|Disney'] },
    { c: 'ゥ', r: 'u', snd: 'u', label: 'pequeno', ime: 'lu / xu', n: 'Vogal pequena para sons estrangeiros: ト + ゥ = トゥ (tu).', ex: ['タトゥー||tatū|tatuagem'] },
    { c: 'ェ', r: 'e', snd: 'e', label: 'pequeno', ime: 'le / xe', n: 'Vogal pequena para sons estrangeiros: フ + ェ = フェ (fe), シ + ェ = シェ (she).', ex: ['カフェ||kafe|café (lugar)', 'シェフ||shefu|chef de cozinha'] },
    { c: 'ォ', r: 'o', snd: 'o', label: 'pequeno', ime: 'lo / xo', n: 'Vogal pequena para sons estrangeiros: フ + ォ = フォ (fo).', ex: ['フォーク||fōku|garfo'] }
  ]
};
