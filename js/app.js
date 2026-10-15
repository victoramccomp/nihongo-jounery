/* Roteador por hash (#/...) — funciona em GitHub Pages e Vercel sem configuração de servidor. */
(function () {
  const { esc, store } = NJ.util;
  const app = document.getElementById('app');

  /* Registro de módulos. Para criar um novo: adicione aqui e trate a rota em route(). */
  NJ.modules = [
    {
      id: 'kana', jp: 'かな', title: 'Hiragana e Katakana', ready: true,
      desc: 'Os dois silabários: traços, pronúncia, origem e exemplos de cada caractere.',
      href: () => '#/kana/' + store.get('lastScript', 'hiragana'),
      stat: () => {
        const h = NJ.Kana.progress('hiragana'), k = NJ.Kana.progress('katakana');
        return { done: h.done + k.done, total: h.total + k.total };
      }
    },
    { id: 'kanji', jp: '漢字', title: 'Kanji', ready: false, desc: 'Em breve.' }
  ];

  function home() {
    app.innerHTML = `
      <section class="page home">
        <div class="home-hero">
          <p class="jp kicker" lang="ja">日本語の旅</p>
          <h1>Nihongo Journey</h1>
          <p class="muted">Seu caderno de estudo de japonês. Escolha um módulo:</p>
        </div>
        <div class="modules">
          ${NJ.modules.map((m) => {
            const s = m.ready && m.stat ? m.stat() : null;
            const inner = `
              <span class="mod-jp jp" lang="ja">${esc(m.jp)}</span>
              <span class="mod-body">
                <b>${esc(m.title)}</b>
                <span class="muted small">${esc(m.desc)}</span>
                ${s ? `<span class="progress"><span class="bar"><i style="width:${(s.done / s.total) * 100}%"></i></span><span>${s.done}/${s.total}</span></span>` : ''}
              </span>
              ${m.ready ? '' : '<span class="tag">em breve</span>'}`;
            return m.ready ? `<a class="card module" href="${m.href()}">${inner}</a>` : `<div class="card module soon">${inner}</div>`;
          }).join('')}
        </div>
      </section>`;
  }

  function route() {
    const parts = location.hash.replace(/^#\/?/, '').split('/').map((p) => decodeURIComponent(p));
    NJ.Kana.leave();
    if (parts[0] === 'kana') {
      if (parts[2]) NJ.Kana.detail(app, parts[1], parts[2]);
      else NJ.Kana.hub(app, parts[1] || store.get('lastScript', 'hiragana'));
    } else {
      home();
    }
    window.scrollTo(0, 0);
    app.focus({ preventScroll: true });
  }

  window.addEventListener('hashchange', route);
  route();

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
