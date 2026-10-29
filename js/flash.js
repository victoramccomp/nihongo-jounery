/* Flashcards: botão fixo com um raio na lateral esquerda, escolha da escrita e sessão infinita
   (mostra o kana, toque para virar e ver a resposta, "Próximo" para seguir, "Finalizar" para encerrar). */
window.NJ = window.NJ || {};

NJ.Flash = (function () {
  const { esc, store, speak, icon } = NJ.util;
  const bolt = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M13 2 4.5 13.5H11L10 22l8.5-11.5H12L13 2z"/></svg>';
  const RARE = 'ぢづをヂヅヲ';

  /* Baralho: básicos + ゛゜ (+ combinações, se marcado). Pequenos, estendidos e caracteres quase sem uso ficam fora. */
  function deck(scripts, combos) {
    const secs = combos ? ['base', 'dakuten', 'yoon'] : ['base'];
    return scripts.flatMap((s) => NJ.Kana.db[s].filter((e) => secs.includes(e.sec) && !RARE.includes(e.c)));
  }

  function shuffle(a) {
    a = a.slice();
    for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
    return a;
  }

  /* ---------- Botão do raio e escolha ---------- */
  const fab = document.createElement('button');
  fab.type = 'button';
  fab.className = 'flash-fab';
  fab.setAttribute('aria-label', 'Flashcards');
  fab.title = 'Flashcards';
  fab.innerHTML = bolt;
  document.body.appendChild(fab);

  const picker = document.createElement('dialog');
  picker.className = 'sheet flash-pick';
  picker.innerHTML = `
    <form method="dialog" class="sheet-inner">
      <div class="sheet-head">
        <span class="flash-bolt">${bolt}</span>
        <div><b class="flash-title">Flashcards</b><p class="muted small">Qual escrita você quer treinar?</p></div>
        <button type="button" class="icon-btn" data-close aria-label="Fechar">✕</button>
      </div>
      <div class="flash-choices">
        <button type="button" data-pick="hiragana"><span class="jp">あ</span><b>Hiragana</b></button>
        <button type="button" data-pick="katakana"><span class="jp">ア</span><b>Katakana</b></button>
        <button type="button" data-pick="both"><span class="jp">あア</span><b>Ambos</b></button>
      </div>
      <label class="flash-opt"><input type="checkbox" id="flashCombos"> Incluir ゛゜ e combinações (が, きゃ…)</label>
    </form>`;
  document.body.appendChild(picker);
  const combosBox = picker.querySelector('#flashCombos');

  fab.addEventListener('click', () => {
    combosBox.checked = store.get('flashCombos', false);
    picker.showModal();
  });
  picker.addEventListener('click', (ev) => {
    if (ev.target === picker || ev.target.closest('[data-close]')) return picker.close();
    const b = ev.target.closest('[data-pick]');
    if (!b) return;
    store.set('flashCombos', combosBox.checked);
    const scripts = b.dataset.pick === 'both' ? ['hiragana', 'katakana'] : [b.dataset.pick];
    picker.close();
    start(scripts, combosBox.checked);
  });

  /* ---------- Sessão ---------- */
  const view = document.createElement('dialog');
  view.className = 'flash-view';
  document.body.appendChild(view);

  let queue = [], current = null, seen = 0, flipped = false, label = '';

  function start(scripts, combos) {
    const cards = deck(scripts, combos);
    label = scripts.length === 2 ? 'Hiragana + Katakana' : scripts[0] === 'hiragana' ? 'Hiragana' : 'Katakana';
    queue = [];
    seen = 0;
    current = null;
    view.dataset.cards = JSON.stringify(cards.map((e) => e.script + ':' + e.c));
    view.innerHTML = `
      <div class="flash-wrap">
        <header class="flash-top">
          <span class="flash-label">${bolt} ${esc(label)}</span>
          <span class="flash-count" aria-live="polite"></span>
          <button type="button" class="chip" data-end>Finalizar</button>
        </header>
        <button type="button" class="flash-card" aria-label="Virar o card" autofocus>
          <span class="flash-inner">
            <span class="flash-face flash-front"><span class="jp" lang="ja"></span><small>toque para ver a resposta</small></span>
            <span class="flash-face flash-back"><span class="jp" lang="ja"></span><b class="flash-roma"></b><small class="flash-kind"></small></span>
          </span>
        </button>
        <div class="flash-actions">
          <button type="button" class="icon-btn" data-say aria-label="Ouvir">${icon.sound}</button>
          <button type="button" class="btn flash-next" data-next>Próximo ${icon.next}</button>
        </div>
      </div>`;
    view.showModal();
    next();
  }

  /* Fila infinita: embaralha o baralho inteiro; quando acaba, embaralha de novo sem repetir o último card. */
  function draw() {
    if (!queue.length) {
      const keys = JSON.parse(view.dataset.cards);
      queue = shuffle(keys);
      if (current && queue.length > 1 && queue[queue.length - 1] === current.script + ':' + current.c) {
        [queue[0], queue[queue.length - 1]] = [queue[queue.length - 1], queue[0]];
      }
    }
    return NJ.Kana.db.byChar[queue.pop()];
  }

  function next() {
    current = draw();
    seen++;
    flipped = false;
    const card = view.querySelector('.flash-card');
    card.classList.add('no-anim');
    card.classList.remove('flipped');
    void card.offsetWidth;            // volta para a frente sem animar a virada
    card.classList.remove('no-anim');
    const combo = current.c.length > 1;
    view.querySelectorAll('.flash-face .jp').forEach((el) => { el.textContent = current.c; el.classList.toggle('combo', combo); });
    view.querySelector('.flash-roma').textContent = current.r;
    view.querySelector('.flash-kind').textContent = current.script === 'hiragana' ? 'hiragana' : 'katakana';
    view.querySelector('.flash-count').textContent = `${seen}º card`;
    view.querySelector('[data-say]').hidden = true;
    card.focus({ preventScroll: true });
  }

  function flip() {
    flipped = !flipped;
    view.querySelector('.flash-card').classList.toggle('flipped', flipped);
    view.querySelector('[data-say]').hidden = !flipped;
    if (flipped) view.querySelector('.flash-next').focus({ preventScroll: true });
  }

  function end() {
    const total = seen;
    view.innerHTML = `
      <div class="flash-wrap flash-end">
        <span class="flash-bolt big">${bolt}</span>
        <h2>Sessão finalizada</h2>
        <p>Você treinou <b>${total}</b> ${total === 1 ? 'card' : 'cards'} de ${esc(label)}.</p>
        <p class="jp" lang="ja">おつかれさま！</p>
        <div class="flash-actions">
          <button type="button" class="btn outline" data-again>Treinar de novo</button>
          <button type="button" class="btn" data-close>Fechar</button>
        </div>
      </div>`;
  }

  view.addEventListener('click', (ev) => {
    if (ev.target.closest('.flash-card')) return flip();
    if (ev.target.closest('[data-next]')) return next();
    if (ev.target.closest('[data-say]')) return speak(current.c);
    if (ev.target.closest('[data-end]')) return end();
    if (ev.target.closest('[data-close]')) return view.close();
    if (ev.target.closest('[data-again]')) { view.close(); fab.click(); }
  });
  /* Esc também finaliza (mostrando o resumo) em vez de fechar direto. */
  view.addEventListener('cancel', (ev) => {
    if (view.querySelector('.flash-card')) { ev.preventDefault(); end(); }
  });
  view.addEventListener('keydown', (ev) => {
    if (!view.querySelector('.flash-card')) return;
    if (ev.key === ' ' || ev.key === 'Enter') {
      if (ev.target.closest('button')) return;   // botões já respondem sozinhos ao Enter/Espaço
      ev.preventDefault(); flip();
    } else if (ev.key === 'ArrowRight') { ev.preventDefault(); next(); }
  });

  return { start };
})();
