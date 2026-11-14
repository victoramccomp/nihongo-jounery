"""Gera o subconjunto da Klee One com todos os caracteres japoneses usados no projeto.
Uso: python font_subset.py <pasta do projeto>"""
import glob, os, re, sys, urllib.parse, urllib.request

root = sys.argv[1]
files = [f for pat in ('js/*.js', 'data/*.js', 'modules/**/*.js', 'index.html')
         for f in glob.glob(os.path.join(root, pat), recursive=True) if 'strokes' not in f]
txt = ''.join(open(f, encoding='utf-8').read() for f in files)
txt += ''.join(chr(c) for c in list(range(0x3041, 0x3097)) + list(range(0x30a1, 0x30ff)))
txt += '゛゜・「」、。〜！？｜一二三四五六七八九十百千円日月火水木金土人口工力夕卜匕才'
chars = sorted(set(ch for ch in txt if re.match(r'[　-ヿ一-鿿＀-￯]', ch)))
print(len(chars), 'glifos')
ua = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Safari/537.36'
for w in (400, 600):
    url = 'https://fonts.googleapis.com/css2?family=Klee+One:wght@%d&text=%s' % (w, urllib.parse.quote(''.join(chars)))
    css = urllib.request.urlopen(urllib.request.Request(url, headers={'User-Agent': ua})).read().decode()
    font_url = re.search(r'url\((https://[^)]+)\)', css).group(1)
    data = urllib.request.urlopen(font_url).read()
    assert data[:4] == b'wOF2', 'não é woff2'
    open(os.path.join(root, 'fonts', 'klee-one-%d.woff2' % w), 'wb').write(data)
    print(w, len(data) // 1024, 'KB')
