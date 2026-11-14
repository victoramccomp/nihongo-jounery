/* História de abertura dos módulos: áudio original, falas com furigana e tradução linha a linha.
   Nos dados, {漢字|かんじ} vira <ruby>漢字<rt>かんじ</rt></ruby>. */
window.NJ = window.NJ || {};

NJ.Story = (function () {
  const { esc, store } = NJ.util;

  function ruby(markup) {
    return markup.split(/(\{[^}]*\})/).map((part) => {
      const m = /^\{([^|}]+)\|([^}]+)\}$/.exec(part);
      return m ? `<ruby>${esc(m[1])}<rt>${esc(m[2])}</rt></ruby>` : esc(part);
    }).join('');
  }

  /* Cor de cada personagem (o resto usa a cor neutra). */
  function who(pt) {
    if (/^emi$/i.test(pt)) return 'emi';
    if (/saver|rob/i.test(pt)) return 'saver';
    if (/^emi e saver$/i.test(pt)) return 'both';
    return 'other';
  }

  function lineHtml(l, i) {
    if (l.t === 'narr') {
      return `<li class="st-narr" data-i="${i}"><p class="jp" lang="ja">${ruby(l.jp)}</p><p class="st-pt">${esc(l.pt)}</p></li>`;
    }
    if (l.t === 'sfx') {
      return `<li class="st-sfx" data-i="${i}"><p><span aria-hidden="true">♫</span> <span class="jp" lang="ja">${ruby(l.jp)}</span> <span class="st-pt-inline">— ${esc(l.pt)}</span></p></li>`;
    }
    return `<li class="st-line ${who(l.whoPt)}" data-i="${i}">
      <span class="st-who"><span class="jp" lang="ja">${ruby(l.who)}</span><small>${esc(l.whoPt)}</small></span>
      <div class="st-bubble">
        <p class="jp" lang="ja">${ruby(l.jp)}</p>
        <p class="st-pt">${esc(l.pt)}</p>
      </div>
    </li>`;
  }

  function widget(host, lines, audioSrc) {
    const furi = store.get('furigana', true);
    const trad = store.get('translate', false);
    host.innerHTML = `
      <div class="st-player">
        <audio controls preload="metadata" src="${esc(audioSrc)}"></audio>
        <div class="st-tools">
          <span class="muted small">Velocidade</span>
          ${[0.75, 1, 1.25].map((r) => `<button type="button" class="chip${r === 1 ? ' on' : ''}" data-rate="${r}">${r}x</button>`).join('')}
        </div>
      </div>
      <div class="st-toggles">
        <button type="button" class="chip" data-tg="furi" aria-pressed="${furi}">ふ Furigana</button>
        <button type="button" class="chip" data-tg="trad" aria-pressed="${trad}">PT Tradução</button>
      </div>
      <p class="muted small">Toque numa fala para ver ou esconder só a tradução dela.</p>
      <ol class="st-lines${furi ? '' : ' no-furi'}${trad ? ' show-pt' : ''}">${lines.map(lineHtml).join('')}</ol>`;

    const audio = host.querySelector('audio');
    const list = host.querySelector('.st-lines');
    host.addEventListener('click', (ev) => {
      const rate = ev.target.closest('[data-rate]');
      if (rate) {
        audio.playbackRate = +rate.dataset.rate;
        host.querySelectorAll('[data-rate]').forEach((b) => b.classList.toggle('on', b === rate));
        return;
      }
      const tg = ev.target.closest('[data-tg]');
      if (tg) {
        const on = tg.getAttribute('aria-pressed') !== 'true';
        tg.setAttribute('aria-pressed', on);
        if (tg.dataset.tg === 'furi') { list.classList.toggle('no-furi', !on); store.set('furigana', on); }
        else { list.classList.toggle('show-pt', on); list.querySelectorAll('.open').forEach((li) => li.classList.remove('open')); store.set('translate', on); }
        return;
      }
      const li = ev.target.closest('.st-lines > li');
      if (li && !getSelection().toString()) li.classList.toggle('open');
    });
    return { destroy() { audio.pause(); } };
  }

  return { widget, ruby };
})();
