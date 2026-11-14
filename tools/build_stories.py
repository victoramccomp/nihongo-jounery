"""Gera modules/mN/historia.js (e copia o mp3 para audio/mN/) a partir de NihongoMaterial/Material/moduloNN.
Cada pasta precisa de historiaXX-jp.txt, historiaXX-ptbr.txt e historiaXX.mp3, com as falas na mesma ordem.
Kanji novos: acrescente a leitura na lista F — o script para e avisa se algum kanji ficar sem furigana.
Uso: python tools/build_stories.py ../NihongoMaterial/Material ."""
import json, os, re, sys
sys.stdout.reconfigure(encoding="utf-8")

mat, proj = sys.argv[1], sys.argv[2]

# Leituras revisadas à mão. Formato: (trecho, marcado). {kanji|leitura} vira <ruby>.
# Ordem importa: trechos mais específicos primeiro (お父さん antes de 父, 家族 antes de 家…).
F = [
    ('１２００円', '{１２００円|せんにひゃくえん}'),
    ('お父さんとお母さん', 'お{父|とう}さんとお{母|かあ}さん'),
    ('お父さん', 'お{父|とう}さん'), ('お母さん', 'お{母|かあ}さん'), ('お兄ちゃん', 'お{兄|にい}ちゃん'),
    ('父と母', '{父|ちち}と{母|はは}'),
    ('日本語', '{日本語|にほんご}'), ('日本', '{日本|にほん}'), ('上手', '{上手|じょうず}'),
    ('家族', '{家族|かぞく}'), ('家', '{家|いえ}'),
    ('友達', '{友達|ともだち}'), ('二人', '{二人|ふたり}'), ('冒険', '{冒険|ぼうけん}'), ('名前', '{名前|なまえ}'),
    ('電気', '{電気|でんき}'), ('電池', '{電池|でんち}'), ('店員', '{店員|てんいん}'), ('海外', '{海外|かいがい}'),
    ('部屋', '{部屋|へや}'), ('学校', '{学校|がっこう}'), ('先生', '{先生|せんせい}'), ('授業', '{授業|じゅぎょう}'),
    ('勉強', '{勉強|べんきょう}'), ('文化', '{文化|ぶんか}'), ('頑張', '{頑張|がんば}'), ('出会', '{出会|であ}'),
    ('ご飯', 'ご{飯|はん}'),
    ('私', '{私|わたし}'), ('何', '{何|なん}'), ('上', '{上|うえ}'), ('空', '{空|そら}'), ('源', '{源|みなもと}'),
    ('誰', '{誰|だれ}'), ('妹', '{妹|いもうと}'), ('今', '{今|いま}'), ('朝', '{朝|あさ}'),
    ('起', '{起|お}'), ('教', '{教|おし}'), ('行', '{行|い}'), ('始', '{始|はじ}'), ('初', '{初|はじ}'),
    ('来', '{来|き}'), ('待', '{待|ま}'), ('低', '{低|ひく}'), ('買', '{買|か}'), ('高', '{高|たか}'),
    ('危', '{危|あぶ}'), ('新', '{新|あたら}'), ('願', '{願|ねが}'), ('住', '{住|す}'), ('寝', '{寝|ね}'),
    ('食', '{食|た}'), ('連', '{連|つ}'), ('偉', '{偉|えら}'), ('欲', '{欲|ほ}'), ('使', '{使|つか}'),
]

def furigana(text):
    # Substitui sem reprocessar o que já virou {kanji|leitura}.
    parts = [text]
    for src, dst in F:
        out = []
        for p in parts:
            if p.startswith('{') or src not in p:
                out.append(p); continue
            chunks = p.split(src)
            for i, c in enumerate(chunks):
                if c: out.extend(split_marked(c))
                if i < len(chunks) - 1: out.extend(split_marked(dst))
        parts = out
    joined = ''.join(parts)
    left = re.sub(r'\{[^}]*\}', '', joined)
    bad = [ch for ch in left if '一' <= ch <= '鿿']
    if bad: raise SystemExit('kanji sem furigana: %s em %s' % (''.join(bad), text))
    return joined

def split_marked(s):
    return [x for x in re.split(r'(\{[^}]*\})', s) if x]

def parse(path, jp=True):
    lines = [l.strip() for l in open(path, encoding='utf-8').read().splitlines()]
    lines = [l for l in lines if l and l != 'Tradução literal']
    out = []
    for l in lines:
        if l.startswith('▶'):
            out.append({'t': 'narr', 'text': l.lstrip('▶︎').strip()})
        elif l.startswith('♫'):
            out.append({'t': 'sfx', 'text': l.lstrip('♫').strip()})
        else:
            sep = '：' if jp else ':'
            who, _, text = l.partition(sep)
            out.append({'t': 'line', 'who': who.strip(), 'text': text.strip()})
    return out

import glob, shutil
stories = []
for d in sorted(glob.glob(os.path.join(mat, 'modulo*'))):
    jp_files = glob.glob(os.path.join(d, '*-jp.txt'))
    if jp_files:
        name = os.path.basename(jp_files[0])[:-len('-jp.txt')]
        stories.append((str(int(os.path.basename(d)[len('modulo'):])), os.path.basename(d), name))
for mod, folder, name in stories:
    jp = parse(os.path.join(mat, folder, name + '-jp.txt'))
    pt = parse(os.path.join(mat, folder, name + '-ptbr.txt'), jp=False)
    assert len(jp) == len(pt), (name, len(jp), len(pt))
    data = []
    for a, b in zip(jp, pt):
        assert a['t'] == b['t'], (name, a, b)
        row = {'t': a['t'], 'jp': furigana(a['text']), 'pt': b['text']}
        if a['t'] == 'line':
            row['who'] = furigana(a['who'])
            row['whoPt'] = b['who']
        data.append(row)
        print(mod, '|', row.get('whoPt', a['t']), '|', a['text'][:28], '→', b['text'][:40])
    dst = os.path.join(proj, 'modules', 'm' + mod)
    os.makedirs(dst, exist_ok=True)
    js = ('/* Gerado a partir de NihongoMaterial/Material/%s (%s). Furigana: {kanji|leitura}. */\n'
          'NJ.Course.addStory(\'%s\', %s);\n') % (folder, name, mod, json.dumps(data, ensure_ascii=False, indent=1))
    open(os.path.join(dst, 'historia.js'), 'w', encoding='utf-8').write(js)
    mp3 = os.path.join(mat, folder, name + '.mp3')
    if os.path.exists(mp3):
        os.makedirs(os.path.join(proj, 'audio', 'm' + mod), exist_ok=True)
        shutil.copyfile(mp3, os.path.join(proj, 'audio', 'm' + mod, 'historia.mp3'))
    print('->', os.path.join(dst, 'historia.js'), len(data), 'falas')
