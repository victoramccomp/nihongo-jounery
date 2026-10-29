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
  /* Módulos ainda não escritos aparecem como "em breve". */
  const soon = [{ id: '2', jp: '漢字', title: 'Kanji', desc: 'Em breve.' }];

  const bar = (s) => `<span class="progress"><span class="bar"><i style="width:${(s.done / s.total) * 100}%"></i></span><span>${s.done}/${s.total}${s.label ? ' ' + s.label : ''}</span></span>`;

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
        <div class="modules">
          ${NJ.Course.modules.map((m) => `
            <a class="card module" href="#/m/${m.id}">
              <span class="mod-jp jp" lang="ja">${esc(m.jp)}</span>
              <span class="mod-body">
                <span class="muted small">Módulo ${esc(m.id)}</span>
                <b>${esc(m.title)}</b>
                <span class="muted small">${esc(m.desc)}</span>
                ${bar(Object.assign(NJ.Course.moduleProgress(m.id), { label: 'aulas' }))}
              </span>
            </a>`).join('')}
          ${soon.map((m) => `
            <div class="card module soon">
              <span class="mod-jp jp" lang="ja">${esc(m.jp)}</span>
              <span class="mod-body"><span class="muted small">Módulo ${esc(m.id)}</span><b>${esc(m.title)}</b><span class="muted small">${esc(m.desc)}</span></span>
              <span class="tag">em breve</span>
            </div>`).join('')}
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
  }

  function route() {
    const parts = location.hash.replace(/^#\/?/, '').split('/').map((p) => decodeURIComponent(p));
    NJ.Kana.leave();
    NJ.Course.leave();
    if (parts[0] === 'kana') {
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
