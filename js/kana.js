/* Módulo Kana: tabelas de hiragana/katakana e a ficha completa de cada caractere. */
window.NJ = window.NJ || {};

NJ.Kana = (function () {
  const { esc, store, speak, icon } = NJ.util;

  const SCRIPTS = {
    hiragana: { name: 'Hiragana', jp: 'ひらがな' },
    katakana: { name: 'Katakana', jp: 'カタカナ' }
  };
  const SECTIONS = {
    base: { title: 'Básicos', jp: '五十音', sub: 'Gojūon: os sons fundamentais' },
    dakuten: { title: 'Dakuten e handakuten', jp: '濁音・半濁音', sub: 'Marcas ゛ e ゜ mudam o som da consoante' },
    yoon: { title: 'Combinações', jp: '拗音', sub: 'Yōon: caractere em "i" + ゃ ゅ ょ pequenos' },
    ext: { title: 'Estendidos', jp: '外来音', sub: 'Sons criados para palavras estrangeiras' },
    small: { title: 'Pequenos e marcas', jp: '小書き・長音', sub: 'Não são lidos sozinhos: modificam o som vizinho' }
  };

  /* Converte hiragana <-> katakana pelo deslocamento fixo do Unicode (0x60). */
  const toKata = (s) => s.replace(/[ぁ-ゖ]/g, (c) => String.fromCharCode(c.charCodeAt(0) + 0x60));
  const toHira = (s) => s.replace(/[ァ-ヶ]/g, (c) => String.fromCharCode(c.charCodeAt(0) - 0x60));

  /* Índice: lista ordenada por escrita e busca por caractere. */
  const db = { hiragana: [], katakana: [], byChar: {} };
  for (const script of Object.keys(SCRIPTS)) {
    const secs = NJ.kana[script];
    for (const sec of ['base', 'dakuten', 'yoon', 'ext', 'small']) {
      (secs[sec] || []).forEach((e) => {
        e.script = script;
        e.sec = sec;
        e.idx = db[script].length;
        db[script].push(e);
        db.byChar[script + ':' + e.c] = e;
      });
    }
  }
  const get = (script, c) => db.byChar[script + ':' + c];
  const findAny = (c) => get('hiragana', c) || get('katakana', c);
  const link = (e) => `#/kana/${e.script}/${encodeURIComponent(e.c)}`;

  const GRID = {
    base: ['あいうえお', 'かきくけこ', 'さしすせそ', 'たちつてと', 'なにぬねの', 'はひふへほ', 'まみむめも', 'や・ゆ・よ', 'らりるれろ', 'わ・・・を', 'ん・・・・'],
    dakuten: ['がぎぐげご', 'ざじずぜぞ', 'だぢづでど', 'ばびぶべぼ', 'ぱぴぷぺぽ'],
    yoon: ['き', 'し', 'ち', 'に', 'ひ', 'み', 'り', 'ぎ', 'じ', 'び', 'ぴ'].map((k) => [k + 'ゃ', k + 'ゅ', k + 'ょ'])
  };

  const ROW_NAMES = {
    base: ['Vogais', 'Linha K', 'Linha S', 'Linha T', 'Linha N', 'Linha H', 'Linha M', 'Linha Y', 'Linha R', 'Linha W', 'N final'],
    dakuten: ['Linha G', 'Linha Z', 'Linha D', 'Linha B', 'Linha P']
  };
  function rowOf(e) {
    if (!ROW_NAMES[e.sec]) return null;
    const h = toHira(e.c);
    const i = GRID[e.sec].findIndex((row) => row.includes(h));
    return i < 0 ? null : ROW_NAMES[e.sec][i];
  }

  /* ---------- Aprendidos (salvo só neste aparelho) ---------- */
  let learned = new Set(store.get('learned', []));
  const isLearned = (e) => learned.has(e.script + ':' + e.c);
  function toggleLearned(e) {
    const k = e.script + ':' + e.c;
    learned.has(k) ? learned.delete(k) : learned.add(k);
    store.set('learned', [...learned]);
  }
  function progress(script, secs) {
    const list = db[script].filter((e) => !secs || secs.includes(e.sec));
    return { done: list.filter(isLearned).length, total: list.length };
  }

  /* ---------- Tabelas ---------- */
  function cell(e) {
    if (!e) return '<span class="cell empty" aria-hidden="true"></span>';
    const roma = e.sec === 'small' && e.snd ? (e.c === 'ー' || e.c === 'ッ' || e.c === 'っ' ? '' : e.r) : e.r;
    return `<a class="cell${isLearned(e) ? ' learned' : ''}${e.c.length > 1 ? ' wide' : ''}" href="${link(e)}">
      <span class="jp">${esc(e.c)}</span><small>${esc(roma || '·')}</small></a>`;
  }

  function gridHtml(script, rows, cols) {
    const conv = script === 'katakana' ? toKata : (s) => s;
    const body = rows.map((row) => {
      const items = Array.isArray(row) ? row : [...row];
      return items.map((c) => cell(c === '・' ? null : get(script, conv(c)))).join('');
    }).join('');
    return `<div class="grid cols-${cols}">${body}</div>`;
  }

  function listHtml(script, sec) {
    return `<div class="grid cols-auto">${(NJ.kana[script][sec] || []).map((e) => cell(e)).join('')}</div>`;
  }

  function hub(app, script) {
    if (!SCRIPTS[script]) script = 'hiragana';
    store.set('lastScript', script);
    const showRoma = store.get('showRomaji', true);
    const p = progress(script);
    const other = script === 'hiragana' ? 'katakana' : 'hiragana';
    const sections = ['base', 'dakuten', 'yoon'].concat(NJ.kana[script].ext ? ['ext'] : [], ['small']);

    app.innerHTML = `
      <section class="page kana-hub${showRoma ? '' : ' hide-roma'}">
        <div class="seg" role="tablist" aria-label="Escrita">
          ${Object.entries(SCRIPTS).map(([k, s]) => `<a role="tab" href="#/kana/${k}" aria-selected="${k === script}" class="${k === script ? 'on' : ''}"><span class="jp">${s.jp}</span> ${s.name}</a>`).join('')}
        </div>

        <div class="hub-head">
          <div>
            <h1>${SCRIPTS[script].name} <span class="jp muted">${SCRIPTS[script].jp}</span></h1>
            <p class="muted">${script === 'hiragana'
              ? 'A escrita "nativa": partículas, terminações de verbos e palavras sem kanji.'
              : 'Usado para palavras estrangeiras, nomes de fora, onomatopeias e ênfase.'}</p>
          </div>
          <div class="progress" title="Marcados como aprendidos">
            <div class="bar"><i style="width:${(p.done / p.total) * 100}%"></i></div>
            <span>${p.done}/${p.total} aprendidos</span>
          </div>
        </div>

        <div class="toolbar">
          <button type="button" class="chip" id="romaBtn" aria-pressed="${showRoma}">${icon.eye} Romaji</button>
          <a class="chip" href="#/kana/${other}">Ir para ${SCRIPTS[other].name}</a>
        </div>

        <details class="card intro">
          <summary>Como funciona o kana</summary>
          <ul>
            <li><b>Cada kana é uma batida</b> (mora). か = ka, uma batida; かった = ka-t-ta, três batidas.</li>
            <li><b>Hiragana e katakana têm os mesmos sons</b>; só mudam o uso. あ e ア são ambos "a".</li>
            <li><b>Dakuten ゛</b> deixa a consoante "sonora": か→が (ka→ga), さ→ざ, た→だ, は→ば. <b>Handakuten ゜</b> só existe na linha H: は→ぱ (ha→pa).</li>
            <li><b>Combinações</b>: caractere terminado em "i" + ゃゅょ pequeno vira uma sílaba só: き + ゃ = きゃ (kya).</li>
            <li><b>っ pequeno</b> dobra a consoante seguinte (きって, kitte). <b>ー</b> estica a vogal no katakana (ケーキ, kēki).</li>
            <li>Toque em um caractere para ver traços, pronúncia, origem e exemplos. Marque "Já sei" para acompanhar seu progresso.</li>
          </ul>
        </details>

        ${sections.map((sec) => `
          <section class="kana-sec" id="sec-${sec}">
            <h2>${SECTIONS[sec].title} <span class="jp muted">${SECTIONS[sec].jp}</span></h2>
            <p class="muted small">${SECTIONS[sec].sub}</p>
            ${sec === 'base' ? '<div class="vowel-head" aria-hidden="true"><span>a</span><span>i</span><span>u</span><span>e</span><span>o</span></div>' : ''}
            ${sec === 'base' || sec === 'dakuten' ? gridHtml(script, GRID[sec], 5)
              : sec === 'yoon' ? gridHtml(script, GRID.yoon, 3)
              : listHtml(script, sec)}
          </section>`).join('')}
      </section>`;

    app.querySelector('#romaBtn').addEventListener('click', (ev) => {
      const on = !store.get('showRomaji', true);
      store.set('showRomaji', on);
      ev.currentTarget.setAttribute('aria-pressed', on);
      app.querySelector('.kana-hub').classList.toggle('hide-roma', !on);
    });
  }

  /* ---------- Ficha do caractere ---------- */
  function typeLabel(e) {
    if (e.sec === 'dakuten') return e.c.normalize('NFD').includes('゚') ? 'Handakuten ゜' : 'Dakuten ゛';
    return { base: 'Básico (gojūon)', yoon: 'Combinação (yōon)', ext: 'Estendido', small: e.label ? e.label[0].toUpperCase() + e.label.slice(1) : 'Pequeno' }[e.sec];
  }

  function chipFor(c) {
    const e = findAny(c);
    if (e) return `<a class="sim" href="${link(e)}"><span class="jp">${esc(c)}</span><small>${esc(e.r)}${e.script !== current.script ? ' · ' + SCRIPTS[e.script].name.toLowerCase() : ''}</small></a>`;
    return `<span class="sim kanji" title="Kanji"><span class="jp">${esc(c)}</span><small>kanji</small></span>`;
  }

  function composition(e) {
    const parts = [];
    const nfd = e.c.normalize('NFD');
    if (e.c.length === 1 && nfd.length === 2) {
      const base = get(e.script, nfd[0]);
      const mark = nfd[1] === '゚' ? '゜ (handakuten)' : '゛ (dakuten)';
      parts.push(`<p class="formula"><a href="${link(base)}" class="jp">${base.c}</a> <small>${base.r}</small> + <span class="jp">${mark.split(' ')[0]}</span> <small>${mark.split(' ')[1]}</small> = <b class="jp">${e.c}</b> <small>${e.r}</small></p>`);
      if (base.o) parts.push(originHtml(e.script, base.o));
    } else if (e.sec === 'yoon' || (e.sec === 'ext' && e.c.length > 1)) {
      const [a, b] = [...e.c];
      const ea = get(e.script, a), eb = get(e.script, b);
      parts.push(`<p class="formula"><a href="${link(ea)}" class="jp">${a}</a> <small>${ea.r}</small> + <a href="${link(eb)}" class="jp small-kana">${b}</a> <small>${eb.r} pequeno</small> = <b class="jp">${e.c}</b> <small>${e.r}</small></p>
        <p class="muted small">Lê-se como <b>uma batida só</b>, não "${ea.r}-${eb.r}".</p>`);
    } else if (e.o) {
      parts.push(originHtml(e.script, e.o));
    }
    const cp = e.script === 'hiragana' ? toKata(e.c) : toHira(e.c);
    const other = get(e.script === 'hiragana' ? 'katakana' : 'hiragana', cp);
    if (other) parts.push(`<p class="pair">Em ${SCRIPTS[other.script].name.toLowerCase()}: <a class="jp" href="${link(other)}">${esc(other.c)}</a></p>`);
    return parts.join('');
  }

  function originHtml(script, o) {
    return `<p class="origin"><span class="jp big-k">${esc(o.split(' ')[0])}</span><span>
      Origem: kanji <b class="jp">${esc(o)}</b>.<br><span class="muted small">${script === 'hiragana'
        ? 'O hiragana nasceu da forma cursiva (sōsho) do kanji inteiro.'
        : 'O katakana nasceu de um pedaço do kanji, usado por monges como anotação.'}</span></span></p>`;
  }

  function exampleHtml(x, e) {
    const [kana, kanji, roma, pt] = x.split('|');
    const hl = esc(kana).split(esc(e.c)).join(`<mark>${esc(e.c)}</mark>`);
    return `<li>
      <button type="button" class="icon-btn say" data-say="${esc(kana)}" aria-label="Ouvir ${esc(kana)}">${icon.sound}</button>
      <div class="ex-word">
        <span class="jp ex-kana">${hl}</span>${kanji ? `<span class="jp ex-kanji">${esc(kanji)}</span>` : ''}
        <span class="ex-roma">${esc(roma)}</span>
      </div>
      <span class="ex-pt">${esc(pt)}</span>
    </li>`;
  }

  let current = null;
  let widgets = [];

  function detail(app, script, c) {
    const e = get(script, c);
    if (!e) { hub(app, script); return; }
    current = e;
    const list = db[script];
    const prev = list[e.idx - 1], next = list[e.idx + 1];
    const snd = NJ.sounds[e.snd || e.r];
    const kunrei = e.k || NJ.kunrei[e.r];
    const ime = e.ime || (e.r === 'n' ? 'nn' : e.r);
    const silent = e.snd === 'small_tsu' || e.snd === 'choon';
    const strokes = NJ.Stroke.count(e.c);
    const row = rowOf(e);
    const comp = composition(e);

    app.innerHTML = `
      <article class="page kana-detail">
        <nav class="detail-nav">
          <a class="chip" href="#/kana/${script}">${icon.back} Tabela</a>
          <span class="spacer"></span>
          ${prev ? `<a class="icon-btn" href="${link(prev)}" aria-label="Anterior: ${esc(prev.c)}">${icon.prev}</a>` : '<span class="icon-btn ghost"></span>'}
          <span class="pos">${e.idx + 1}/${list.length}</span>
          ${next ? `<a class="icon-btn" href="${link(next)}" aria-label="Próximo: ${esc(next.c)}">${icon.next}</a>` : '<span class="icon-btn ghost"></span>'}
        </nav>

        <header class="card hero">
          <div class="hero-char jp${e.c.length > 1 ? ' combo' : ''}" lang="ja">${esc(e.c)}</div>
          <div class="hero-info">
            <div class="hero-roma">${esc(e.r)}</div>
            <div class="tags">
              <span class="tag">${SCRIPTS[script].name}</span>
              <span class="tag">${typeLabel(e)}</span>
              <span class="tag">${strokes} ${strokes === 1 ? 'traço' : 'traços'}</span>
              ${row ? `<span class="tag">${row}</span>` : ''}
            </div>
            <div class="hero-actions">
              ${silent ? '' : `<button type="button" class="btn" data-say="${esc(e.c)}">${icon.sound} Ouvir</button>`}
              <button type="button" class="btn ${isLearned(e) ? 'on' : 'outline'}" id="learnBtn" aria-pressed="${isLearned(e)}">${icon.check} <span>${isLearned(e) ? 'Aprendido' : 'Já sei'}</span></button>
            </div>
          </div>
        </header>

        <section class="card">
          <h2>Ordem dos traços</h2>
          <div id="anim"></div>
          <h3>Passo a passo</h3>
          <p class="muted small">Vermelho = traço atual · bolinha = onde a caneta começa.</p>
          <div id="frames"></div>
          ${e.w ? `<p class="tip"><b>Dica de escrita:</b> ${esc(e.w)}</p>` : ''}
        </section>

        <section class="card">
          <h2>Pronúncia</h2>
          <dl class="facts">
            <div><dt>Romaji (Hepburn)</dt><dd><b>${esc(e.r)}</b></dd></div>
            ${kunrei && kunrei !== e.r ? `<div><dt>Romaji (Kunrei)</dt><dd>${esc(kunrei)}</dd></div>` : ''}
            <div><dt>Fonética (IPA)</dt><dd class="ipa">[${esc(snd.ipa)}]</dd></div>
            <div><dt>Como digitar</dt><dd><code>${esc(ime)}</code></dd></div>
          </dl>
          <p class="tip">${esc(snd.dica)}</p>
        </section>

        ${comp || e.n ? `<section class="card">
          <h2>${e.sec === 'base' ? 'Origem' : e.sec === 'small' ? 'Uso' : 'Composição'}</h2>
          ${comp}
          ${e.n ? `<p class="note">${esc(e.n)}</p>` : ''}
        </section>` : ''}

        ${e.s && e.s.length ? `<section class="card">
          <h2>Não confunda com</h2>
          <div class="sims">${e.s.map(chipFor).join('')}</div>
        </section>` : ''}

        <section class="card">
          <h2>Pratique a escrita</h2>
          <div id="practice"></div>
        </section>

        <section class="card">
          <h2>Exemplos</h2>
          ${e.ex.length ? `<ul class="examples">${e.ex.map((x) => exampleHtml(x, e)).join('')}</ul>`
            : '<p class="muted">Praticamente não aparece em palavras do dia a dia. Veja a observação acima.</p>'}
        </section>
      </article>`;

    widgets.forEach((w) => w && w.destroy && w.destroy());
    widgets = [
      NJ.Stroke.animator(app.querySelector('#anim'), e.c),
      NJ.Stroke.frames(app.querySelector('#frames'), e.c),
      NJ.Stroke.practice(app.querySelector('#practice'), e.c)
    ];

    app.querySelector('.kana-detail').addEventListener('click', (ev) => {
      const say = ev.target.closest('[data-say]');
      if (say) speak(say.dataset.say);
    });
    app.querySelector('#learnBtn').addEventListener('click', (ev) => {
      toggleLearned(e);
      const on = isLearned(e), b = ev.currentTarget;
      b.classList.toggle('on', on); b.classList.toggle('outline', !on);
      b.setAttribute('aria-pressed', on);
      b.querySelector('span').textContent = on ? 'Aprendido' : 'Já sei';
    });

    /* Deslizar o cartão principal para os lados troca de caractere. */
    const hero = app.querySelector('.hero');
    let sx = null, sy = null;
    hero.addEventListener('touchstart', (ev) => { sx = ev.touches[0].clientX; sy = ev.touches[0].clientY; }, { passive: true });
    hero.addEventListener('touchend', (ev) => {
      if (sx === null) return;
      const dx = ev.changedTouches[0].clientX - sx, dy = ev.changedTouches[0].clientY - sy;
      sx = null;
      if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 1.5) {
        const to = dx < 0 ? next : prev;
        if (to) location.hash = link(to);
      }
    });
  }

  function onKey(ev) {
    if (!current || !document.querySelector('.kana-detail')) return;
    if (ev.target.closest('input, textarea')) return;
    const list = db[current.script];
    const to = ev.key === 'ArrowLeft' ? list[current.idx - 1] : ev.key === 'ArrowRight' ? list[current.idx + 1] : null;
    if (to) location.hash = link(to);
  }
  document.addEventListener('keydown', onKey);

  function leave() {
    widgets.forEach((w) => w && w.destroy && w.destroy());
    widgets = [];
    current = null;
  }

  return { hub, detail, leave, progress, db };
})();
