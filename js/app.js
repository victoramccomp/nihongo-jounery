/* Roteador por hash (#/...) — funciona em GitHub Pages e Vercel sem configuração de servidor. */
(function () {
  const { esc, store } = NJ.util;
  const app = document.getElementById('app');

  /* Ferramentas de consulta rápida (fora do curso). */
  const tools = [
    {
      jp: 'かな', title: 'Colinha de kana', desc: 'Consulta rápida de hiragana e katakana: traços, pronúncia e exemplos.',
      href: () => '#/kana/' + store.get('lastScript', 'hiragana'),
      stat: () => {
        const h = NJ.Kana.progress('hiragana'), k = NJ.Kana.progress('katakana');
        return { done: h.done + k.done, total: h.total + k.total, label: 'aprendidos' };
      }
    }
  ];
  const bar = (s) => `<span class="progress"><span class="bar"><i style="width:${(s.done / s.total) * 100}%"></i></span><span>${s.done}/${s.total}${s.label ? ' ' + s.label : ''}</span></span>`;

  /* Cabeçalho e conteúdo de cada módulo no acordeão da página inicial. */
  function modHead(m) {
    return `
      <span class="mod-jp jp" lang="ja">${esc(m.jp)}</span>
      <span class="mod-body">
        <span class="muted small">Módulo ${esc(m.id)}</span>
        <b>${esc(m.title)}</b>
        ${bar(Object.assign(NJ.Course.moduleProgress(m.id), { label: 'aulas' }))}
      </span>`;
  }
  function modBody(m) {
    return `
      <p class="muted small">${esc(m.desc)}</p>
      <ol class="acc-lessons">
        ${m.lessons.map((l, i) => {
          const done = NJ.Course.isDone(m.id, l.id);
          return `<li><a href="#/m/${m.id}/${l.id}" class="${done ? 'done' : ''}">
            <span class="lesson-n">${done ? NJ.util.icon.check : i + 1}</span>
            <span><b>${esc(l.title)}</b> <span class="jp muted" lang="ja">${esc(l.jp)}</span><small class="muted">~${l.mins} min</small></span>
          </a></li>`;
        }).join('')}
      </ol>
      ${(m.aside || []).map((a) => `
        <a class="acc-aside${a.href ? '' : ' soon'}" href="${a.href ? esc(a.href) : '#/m/' + m.id}">
          <span class="jp" lang="ja">${esc(a.jp)}</span>
          <span><b>${esc(a.title)}</b> <small class="muted">à parte · ${esc(a.count ? a.count() : 'em breve')}</small></span>
        </a>`).join('')}
      <a class="chip acc-open" href="#/m/${m.id}">Abrir módulo ${NJ.util.icon.next}</a>`;
  }

  function home() {
    const last = store.get('lastLesson', null);
    app.innerHTML = `
      <section class="page home">
        <div class="home-hero">
          <p class="jp kicker" lang="ja">日本語の旅</p>
          <h1>Nihongo Journey</h1>
          <p class="muted">Seu caderno de estudo de japonês.</p>
          ${last ? `<a class="btn" href="${esc(last)}">${NJ.util.icon.play} Continuar de onde parei</a>` : ''}
        </div>
        <h2 class="home-h">Módulos</h2>
        <div class="modules acc-list">
          ${NJ.Course.modules.map((m, i) => i === 0 ? `
            <section class="card acc fixed">
              <div class="acc-head">${modHead(m)}</div>
              <div class="acc-body">${modBody(m)}</div>
            </section>` : `
            <details class="card acc" data-mod="${esc(m.id)}"${store.get('openModule', '') === m.id ? ' open' : ''}>
              <summary class="acc-head">${modHead(m)}<span class="acc-chev" aria-hidden="true">${NJ.util.icon.next}</span></summary>
              <div class="acc-body">${modBody(m)}</div>
            </details>`).join('')}
        </div>
        <h2 class="home-h">Ferramentas</h2>
        <div class="modules">
          ${tools.map((t) => `
            <a class="card module tool" href="${t.href()}">
              <span class="mod-jp jp" lang="ja">${esc(t.jp)}</span>
              <span class="mod-body"><b>${esc(t.title)}</b><span class="muted small">${esc(t.desc)}</span>${bar(t.stat())}</span>
            </a>`).join('')}
        </div>
      </section>`;
    /* Acordeão: um módulo aberto por vez, e o último aberto é lembrado. */
    app.querySelectorAll('details.acc').forEach((d) => d.addEventListener('toggle', () => {
      if (d.open) {
        store.set('openModule', d.dataset.mod);
        app.querySelectorAll('details.acc[open]').forEach((o) => { if (o !== d) o.open = false; });
      } else if (store.get('openModule', '') === d.dataset.mod) store.set('openModule', '');
    }));
  }

  function route() {
    const parts = location.hash.replace(/^#\/?/, '').split('/').map((p) => decodeURIComponent(p));
    NJ.Kana.leave();
    NJ.Course.leave();
    NJ.KanjiPage.leave();
    if (parts[0] === 'kanji') {
      NJ.KanjiPage.render(app);
    } else if (parts[0] === 'kana') {
      if (parts[2]) NJ.Kana.detail(app, parts[1], parts[2]);
      else NJ.Kana.hub(app, parts[1] || store.get('lastScript', 'hiragana'));
    } else if (parts[0] === 'm' && parts[1]) {
      if (parts[2]) NJ.Course.lessonPage(app, parts[1], parts[2]);
      else NJ.Course.overview(app, parts[1]);
    } else {
      home();
    }
    window.scrollTo(0, 0);
    app.focus({ preventScroll: true });
  }

  window.addEventListener('hashchange', route);
  route();

  document.getElementById('audioBtn').addEventListener('click', () => NJ.util.audioSettings());

  /* Tema: segue o sistema até o usuário escolher. */
  document.getElementById('themeBtn').addEventListener('click', () => {
    const root = document.documentElement;
    const dark = root.dataset.theme ? root.dataset.theme === 'dark' : matchMedia('(prefers-color-scheme: dark)').matches;
    root.dataset.theme = dark ? 'light' : 'dark';
    try { localStorage.setItem('nj.theme', root.dataset.theme); } catch (e) { /* sem persistência */ }
  });

  /* Modo offline (PWA). Só funciona servido por http(s), não abrindo o arquivo direto. */
  if ('serviceWorker' in navigator && location.protocol.startsWith('http')) {
    window.addEventListener('load', () => navigator.serviceWorker.register('sw.js').catch(() => {}));
  }
})();
