/* Kanji das histórias (parte "à parte" do Módulo 1): lista por módulo e janela com traços e leituras. */
window.NJ = window.NJ || {};

NJ.KanjiPage = (function () {
  const { esc, speak, icon } = NJ.util;
  const ruby = (m) => NJ.Story.ruby(m);
  const reading = (m) => m.replace(/\{[^|}]+\|([^}]+)\}/g, '$1');   // só a leitura em kana, para o áudio
  const all = () => Object.values(NJ.kanji).flat();
  const find = (k) => all().find((e) => e.k === k);
  let widgets = [];

  function words(e) {
    return e.w.map(([w, pt]) => `
      <li><button type="button" class="say-mini" data-say="${esc(reading(w))}" aria-label="Ouvir">${icon.sound}</button>
        <span class="jp" lang="ja">${ruby(w)}</span> <span class="muted">${esc(pt)}</span></li>`).join('');
  }

  function card(e) {
    return `<article class="kj-card">
      <button type="button" class="kj-char jp" data-kj="${esc(e.k)}" lang="ja" aria-label="Ver traços de ${esc(e.k)}">${esc(e.k)}</button>
      <div class="kj-body">
        <b class="kj-mean">${esc(e.m)}</b>
        <p class="kj-read"><span class="tag">on</span> <span class="jp" lang="ja">${esc(e.on)}</span>
          <span class="tag">kun</span> <span class="jp" lang="ja">${esc(e.kun)}</span></p>
        <ul class="kj-words">${words(e)}</ul>
      </div>
    </article>`;
  }

  function render(app) {
    const total = all().length;
    app.innerHTML = `
      <section class="page kanji-page">
        <nav class="detail-nav"><a class="chip" href="#/m/1">${icon.back} Módulo 1</a></nav>
        <p class="kicker">Módulo 1 · à parte</p>
        <h1>Kanji das histórias <span class="jp" lang="ja">漢字</span></h1>
        <p class="lead">Os ${total} kanji que apareceram até agora nas histórias, na ordem em que surgem. Toque num kanji
        para ver a ordem dos traços.</p>
        <details class="card intro">
          <summary>Como ler esta página</summary>
          <ul>
            <li><b>on'yomi</b> (em katakana) é a leitura de origem chinesa, comum em palavras compostas: 学校 = <i>gakkō</i>.</li>
            <li><b>kun'yomi</b> (em hiragana) é a leitura japonesa, comum quando o kanji aparece sozinho ou com hiragana:
              <span class="jp">高い</span> = <i>takai</i>. O que está entre parênteses é o <b>okurigana</b>, o hiragana que acompanha o kanji.</li>
            <li>Não decore todas as leituras: aprenda a <b>palavra</b> da história. As outras leituras virão com o tempo.</li>
          </ul>
        </details>
        ${Object.entries(NJ.kanji).map(([mod, list]) => {
          const m = NJ.Course.getModule(mod);
          return `<section class="kj-group">
            <h2>Módulo ${esc(mod)}${m ? ' · ' + esc(m.title) : ''} <span class="muted small">${list.length} kanji</span></h2>
            ${m ? `<a class="chip" href="#/m/${esc(mod)}/historia">Ouvir a história ${icon.next}</a>` : ''}
            <div class="kj-grid">${list.map(card).join('')}</div>
          </section>`;
        }).join('')}
      </section>`;

    app.querySelector('.kanji-page').addEventListener('click', (ev) => {
      const k = ev.target.closest('[data-kj]');
      if (k) return openSheet(k.dataset.kj);
      const s = ev.target.closest('[data-say]');
      if (s) speak(s.dataset.say);
    });
  }

  let sheet;
  function openSheet(k) {
    const e = find(k);
    if (!e) return;
    if (!sheet) {
      sheet = document.createElement('dialog');
      sheet.className = 'sheet kj-sheet';
      document.body.appendChild(sheet);
      sheet.addEventListener('click', (ev) => {
        if (ev.target === sheet || ev.target.closest('[data-close]')) return sheet.close();
        const s = ev.target.closest('[data-say]');
        if (s) speak(s.dataset.say);
      });
      sheet.addEventListener('close', () => { widgets.forEach((w) => w && w.destroy && w.destroy()); widgets = []; });
    }
    const n = NJ.Stroke.count(k);
    sheet.innerHTML = `
      <div class="sheet-inner">
        <div class="sheet-head">
          <span class="sheet-char jp" lang="ja">${esc(k)}</span>
          <div><b class="sheet-roma kj-sheet-mean">${esc(e.m)}</b><p class="muted small">Kanji · ${n} ${n === 1 ? 'traço' : 'traços'}</p></div>
          <button type="button" class="icon-btn" data-close aria-label="Fechar">✕</button>
        </div>
        <div class="sheet-anim"></div>
        <p class="kj-read"><span class="tag">on</span> <span class="jp" lang="ja">${esc(e.on)}</span>
          <span class="tag">kun</span> <span class="jp" lang="ja">${esc(e.kun)}</span></p>
        <ul class="kj-words">${words(e)}</ul>
        <h3>Passo a passo</h3>
        <div class="sheet-frames"></div>
      </div>`;
    sheet.showModal();
    widgets = [NJ.Stroke.animator(sheet.querySelector('.sheet-anim'), k)];
    NJ.Stroke.frames(sheet.querySelector('.sheet-frames'), k);
  }

  function leave() {
    if (sheet && sheet.open) sheet.close();
  }

  return { render, leave, count: () => all().length };
})();
