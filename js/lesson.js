/* Curso: módulos, aulas e os componentes usados dentro das aulas
   (chips de kana, cartões por linha, comparação de traços, teste rápido e janela de detalhe). */
window.NJ = window.NJ || {};

NJ.Course = (function () {
  const { esc, store, speak, icon } = NJ.util;
  const modules = [];
  let widgets = [];

  /* ---------- Registro ---------- */
  function addModule(m) { m.lessons = m.lessons || []; modules.push(m); }
  function addLesson(moduleId, lesson) { getModule(moduleId).lessons.push(lesson); }
  const getModule = (id) => modules.find((m) => m.id === id);

  const doneKey = (m, l) => m + '/' + l;
  const done = () => new Set(store.get('lessonsDone', []));
  const isDone = (m, l) => done().has(doneKey(m, l));
  function setDone(m, l, on) {
    const s = done();
    on ? s.add(doneKey(m, l)) : s.delete(doneKey(m, l));
    store.set('lessonsDone', [...s]);
  }
  function moduleProgress(m) {
    const mod = getModule(m);
    return { done: mod.lessons.filter((l) => isDone(m, l.id)).length, total: mod.lessons.length };
  }

  /* ---------- Helpers usados no texto das aulas ---------- */
  const scriptOf = (c) => (/[゠-ヿ]/.test(c) ? 'katakana' : 'hiragana');
  const entry = (c) => NJ.Kana.db.byChar[scriptOf(c) + ':' + c];

  /* Chip clicável de um kana: abre a janela com traços e áudio. */
  function k(c) {
    const e = entry(c);
    if (!e) return `<span class="jp">${esc(c)}</span>`;
    return `<button type="button" class="k jp" data-k="${esc(c)}" lang="ja" title="${esc(e.r)}">${esc(c)}</button>`;
  }
  /* Palavra com áudio: w('あめ', '雨', 'ame', 'chuva'). */
  function w(kana, kanji, roma, pt) {
    return `<span class="w"><button type="button" class="say-mini" data-say="${esc(kana)}" aria-label="Ouvir ${esc(kana)}">${icon.sound}</button><span class="jp" lang="ja">${esc(kana)}</span>${kanji ? ` <span class="jp w-kanji" lang="ja">${esc(kanji)}</span>` : ''}${roma ? ` <i>${esc(roma)}</i>` : ''}${pt ? ` <span class="w-pt">(${esc(pt)})</span>` : ''}</span>`;
  }
  /* Caixa de destaque: tipo = dica | curiosidade | atencao | regra. */
  function box(type, title, html) {
    return `<aside class="callout ${type}"><b>${esc(title)}</b><div>${html}</div></aside>`;
  }
  /* Cartões de uma linha do silabário, com a explicação de cada caractere. */
  function row(chars, notes) {
    return `<div class="row-cards">${[...chars].map((c) => {
      const e = entry(c);
      if (!e) return '';
      const ex = (e.ex[0] || '').split('|');
      const strokes = NJ.Stroke.count(c);
      return `<article class="kcard">
        <button type="button" class="kcard-char jp" data-k="${esc(c)}" lang="ja" aria-label="Ver traços de ${esc(c)}">${esc(c)}</button>
        <div class="kcard-body">
          <div class="kcard-head"><b class="kcard-roma">${esc(e.r)}</b><span class="muted small">${strokes} ${strokes === 1 ? 'traço' : 'traços'}${e.o ? ' · de <span class="jp">' + esc(e.o.split(' ')[0]) + '</span>' : ''}</span></div>
          <p>${notes[c] || ''}</p>
          ${ex[0] ? `<p class="kcard-ex">${w(ex[0], ex[1], ex[2], ex[3])}</p>` : ''}
        </div>
      </article>`;
    }).join('')}</div>`;
  }
  /* Animações de traço lado a lado (hidratadas depois do render). */
  function compare(chars) {
    return `<div class="compare" data-widget="compare" data-chars="${esc(chars)}"></div>`;
  }
  /* Teste rápido (hidratado depois do render). id aponta para lesson.quizzes[id]. */
  function quiz(id) { return `<div class="quiz" data-widget="quiz" data-quiz="${esc(id)}"></div>`; }

  /* Teclado de treino romaji → kana. */
  function ime() { return `<div class="ime card-in" data-widget="ime"></div>`; }

  const h = { k, w, box, row, compare, quiz, ime, entry };

  /* ---------- Janela de detalhe do kana ---------- */
  let sheet, sheetWidget;
  function openSheet(c) {
    const e = entry(c);
    if (!e) return;
    if (!sheet) {
      sheet = document.createElement('dialog');
      sheet.className = 'sheet';
      document.body.appendChild(sheet);
      sheet.addEventListener('click', (ev) => {
        if (ev.target === sheet || ev.target.closest('[data-close]')) sheet.close();
        const say = ev.target.closest('[data-say]');
        if (say) speak(say.dataset.say);
        if (ev.target.closest('a')) sheet.close();
      });
      sheet.addEventListener('close', () => { sheetWidget && sheetWidget.destroy(); sheetWidget = null; });
    }
    const snd = NJ.sounds[e.snd || e.r];
    sheet.innerHTML = `
      <div class="sheet-inner">
        <div class="sheet-head">
          <span class="sheet-char jp" lang="ja">${esc(c)}</span>
          <div>
            <b class="sheet-roma">${esc(e.r)}</b>
            <p class="muted small">${e.script === 'hiragana' ? 'Hiragana' : 'Katakana'} · ${NJ.Stroke.count(c)} traços</p>
          </div>
          <button type="button" class="icon-btn" data-close aria-label="Fechar">✕</button>
        </div>
        <div class="sheet-anim"></div>
        <p class="small">${esc(snd.dica)}</p>
        <div class="sheet-actions">
          ${e.snd === 'small_tsu' || e.snd === 'choon' ? '' : `<button type="button" class="btn" data-say="${esc(c)}">${icon.sound} Ouvir</button>`}
          <a class="btn outline" href="#/kana/${e.script}/${encodeURIComponent(c)}">Ficha completa</a>
        </div>
      </div>`;
    sheet.showModal();
    sheetWidget = NJ.Stroke.animator(sheet.querySelector('.sheet-anim'), c);
  }

  /* ---------- Teste rápido ---------- */
  function shuffle(a) { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }

  /* cfg: { title, pool: () => [entries], ask: 'kana' | 'roma', count, onPass } */
  function runQuiz(host, cfg) {
    const pool = cfg.pool();
    const total = Math.min(cfg.count || 10, pool.length);
    let qs, i, score, answered;

    function start() {
      qs = shuffle(pool).slice(0, total);
      i = 0; score = 0;
      next();
    }
    function options(e) {
      const others = shuffle(pool.filter((x) => x.r !== e.r && x.c !== e.c));
      const picked = [];
      for (const o of others) { if (!picked.some((p) => p.r === o.r)) picked.push(o); if (picked.length === 3) break; }
      return shuffle([e, ...picked]);
    }
    function next() {
      if (i >= total) return finish();
      answered = false;
      const e = qs[i];
      const askKana = cfg.ask === 'kana' || (cfg.ask === 'mix' && Math.random() < .5);
      host.innerHTML = `
        <div class="quiz-head"><b>${esc(cfg.title || 'Teste rápido')}</b><span class="muted small">${i + 1}/${total} · ${score} ${score === 1 ? 'acerto' : 'acertos'}</span></div>
        <div class="quiz-q">${askKana ? `<span class="jp" lang="ja">${esc(e.c)}</span><small>Qual é a leitura?</small>` : `<span class="quiz-roma">${esc(e.r)}</span><small>Qual é o ${e.script}?</small>`}</div>
        <div class="quiz-opts">${options(e).map((o) => `<button type="button" class="quiz-opt${askKana ? '' : ' jp'}" data-ok="${o === e}">${esc(askKana ? o.r : o.c)}</button>`).join('')}</div>
        <p class="quiz-fb" aria-live="polite"></p>`;
    }
    function finish() {
      const pct = Math.round((score / total) * 100);
      const msg = pct === 100 ? 'Perfeito! すごい！' : pct >= 80 ? 'Muito bem! よくできました。' : pct >= 50 ? 'Bom começo. Revise os que errou e tente de novo.' : 'Volte aos cartões da aula e tente outra vez — repetição é o segredo.';
      host.innerHTML = `
        <div class="quiz-head"><b>${esc(cfg.title || 'Teste rápido')}</b></div>
        <div class="quiz-end"><span class="quiz-score">${score}/${total}</span><p>${msg}</p>
        <button type="button" class="btn" data-again>${icon.replay} Fazer de novo</button></div>`;
      if (pct >= 80 && cfg.onPass) cfg.onPass();
    }
    host.addEventListener('click', (ev) => {
      if (ev.target.closest('[data-again]')) return start();
      const b = ev.target.closest('.quiz-opt');
      if (!b || answered) return;
      answered = true;
      const ok = b.dataset.ok === 'true';
      if (ok) score++;
      host.querySelectorAll('.quiz-opt').forEach((o) => {
        o.disabled = true;
        if (o.dataset.ok === 'true') o.classList.add('right');
      });
      if (!ok) b.classList.add('wrong');
      const e = qs[i];
      host.querySelector('.quiz-fb').innerHTML = ok ? 'Isso! ' + esc(e.c) + ' = ' + esc(e.r) : 'Era ' + esc(e.c) + ' = ' + esc(e.r) + '.';
      if (e.snd !== 'small_tsu') speak(e.c);
      i++;
      setTimeout(next, ok ? 900 : 1700);
    });
    start();
  }

  /* ---------- Hidratação dos componentes depois de montar o HTML ---------- */
  function hydrate(root, lesson, moduleId) {
    root.querySelectorAll('[data-widget=compare]').forEach((el) => {
      el.classList.add('n' + [...el.dataset.chars].length);
      [...el.dataset.chars].forEach((c) => {
        const cell = document.createElement('div');
        cell.className = 'compare-cell';
        el.appendChild(cell);
        widgets.push(NJ.Stroke.animator(cell, c));
        const lab = document.createElement('p');
        const e = entry(c);
        lab.innerHTML = `<b class="jp">${esc(c)}</b> ${e ? esc(e.r) : ''}`;
        cell.prepend(lab);
      });
    });
    root.querySelectorAll('[data-widget=ime]').forEach((el) => widgets.push(NJ.Ime.widget(el)));
    root.querySelectorAll('[data-widget=quiz]').forEach((el) => {
      const cfg = lesson.quizzes[el.dataset.quiz];
      runQuiz(el, Object.assign({}, cfg, { onPass: cfg.final ? () => { setDone(moduleId, lesson.id, true); syncDoneBtn(root, moduleId, lesson.id); } : null }));
    });
  }

  function syncDoneBtn(root, m, l) {
    const b = root.querySelector('#doneBtn');
    if (!b) return;
    const on = isDone(m, l);
    b.classList.toggle('on', on); b.classList.toggle('outline', !on);
    b.querySelector('span').textContent = on ? 'Aula concluída' : 'Marcar como concluída';
  }

  /* ---------- Páginas ---------- */
  function overview(app, moduleId) {
    const m = getModule(moduleId);
    if (!m) { location.hash = '#/'; return; }
    const p = moduleProgress(moduleId);
    app.innerHTML = `
      <section class="page module-page">
        <nav class="detail-nav"><a class="chip" href="#/">${icon.back} Início</a></nav>
        <p class="kicker jp" lang="ja">${esc(m.jp)}</p>
        <h1>Módulo ${esc(m.id)} · ${esc(m.title)}</h1>
        <div class="progress"><div class="bar"><i style="width:${(p.done / p.total) * 100}%"></i></div><span>${p.done}/${p.total} aulas</span></div>
        <div class="prose">${m.intro()}</div>
        <ol class="lesson-list">
          ${m.lessons.map((l, i) => `
            <li><a class="card lesson-item${isDone(moduleId, l.id) ? ' done' : ''}" href="#/m/${m.id}/${l.id}">
              <span class="lesson-n">${isDone(moduleId, l.id) ? icon.check : i + 1}</span>
              <span class="mod-body"><b>${esc(l.title)} <span class="jp muted" lang="ja">${esc(l.jp)}</span></b>
              <span class="muted small">${esc(l.desc)} · ~${l.mins} min</span></span>
            </a></li>`).join('')}
        </ol>
      </section>`;
  }

  function lessonPage(app, moduleId, lessonId) {
    const m = getModule(moduleId);
    const idx = m ? m.lessons.findIndex((l) => l.id === lessonId) : -1;
    if (idx < 0) { overview(app, moduleId); return; }
    const l = m.lessons[idx];
    const prev = m.lessons[idx - 1], next = m.lessons[idx + 1];
    const sections = l.sections(h);
    store.set('lastLesson', `#/m/${moduleId}/${lessonId}`);

    app.innerHTML = `
      <div class="read-progress"><i></i></div>
      <article class="page lesson">
        <nav class="detail-nav">
          <a class="chip" href="#/m/${m.id}">${icon.back} Módulo ${esc(m.id)}</a>
          <span class="spacer"></span>
          <span class="muted small">Aula ${idx + 1} de ${m.lessons.length}</span>
        </nav>
        <header class="lesson-head">
          <p class="kicker">Módulo ${esc(m.id)} · Aula ${idx + 1}</p>
          <h1>${esc(l.title)} <span class="jp" lang="ja">${esc(l.jp)}</span></h1>
          <p class="lead">${l.lead}</p>
          <details class="toc card">
            <summary>Nesta aula (${sections.length} partes · ~${l.mins} min)</summary>
            <ol>${sections.map((s, i) => `<li><button type="button" data-goto="s${i}">${esc(s.title)}</button></li>`).join('')}</ol>
          </details>
        </header>
        ${sections.map((s, i) => `
          <section class="lesson-sec prose" id="s${i}">
            <h2><span class="sec-n">${i + 1}</span>${esc(s.title)}</h2>
            ${s.html}
          </section>`).join('')}
        <footer class="lesson-foot card">
          <button type="button" class="btn outline" id="doneBtn">${icon.check} <span>Marcar como concluída</span></button>
          <div class="lesson-pn">
            ${prev ? `<a class="chip" href="#/m/${m.id}/${prev.id}">${icon.prev} ${esc(prev.title)}</a>` : ''}
            ${next ? `<a class="chip" href="#/m/${m.id}/${next.id}">${esc(next.title)} ${icon.next}</a>` : `<a class="chip" href="#/m/${m.id}">Fim do módulo ${icon.next}</a>`}
          </div>
        </footer>
      </article>`;

    const root = app.querySelector('.lesson');
    syncDoneBtn(root, moduleId, lessonId);
    hydrate(root, l, moduleId);

    root.addEventListener('click', (ev) => {
      const kc = ev.target.closest('[data-k]');
      if (kc) return openSheet(kc.dataset.k);
      const say = ev.target.closest('[data-say]');
      if (say) return speak(say.dataset.say);
      const go = ev.target.closest('[data-goto]');
      if (go) { root.querySelector('#' + go.dataset.goto).scrollIntoView({ behavior: 'smooth' }); return; }
      if (ev.target.closest('#doneBtn')) { setDone(moduleId, lessonId, !isDone(moduleId, lessonId)); syncDoneBtn(root, moduleId, lessonId); }
    });

    const bar = app.querySelector('.read-progress i');
    onScroll = () => {
      const max = document.documentElement.scrollHeight - innerHeight;
      bar.style.width = (max > 0 ? (scrollY / max) * 100 : 0) + '%';
    };
    addEventListener('scroll', onScroll, { passive: true });
  }

  let onScroll = null;
  function leave() {
    widgets.forEach((wg) => wg && wg.destroy && wg.destroy());
    widgets = [];
    if (onScroll) { removeEventListener('scroll', onScroll); onScroll = null; }
  }

  return { addModule, addLesson, getModule, modules, moduleProgress, overview, lessonPage, leave, isDone };
})();
