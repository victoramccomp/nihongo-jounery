/* História de abertura dos módulos: áudio original, falas com furigana e tradução linha a linha.
   Nos dados, {漢字|かんじ} vira <ruby>漢字<rt>かんじ</rt></ruby>. */
window.NJ = window.NJ || {};

NJ.Story = (function () {
  const { esc, store, icon, toast } = NJ.util;
  const fmt = (t) => (isFinite(t) ? Math.floor(t / 60) + ':' + String(Math.floor(t % 60)).padStart(2, '0') : '0:00');

  const isKanji = (c) => c >= '一' && c <= '鿿';

  /* Kanji usados numa história, na ordem em que aparecem, com contagem e palavras (kanji + leitura). */
  function kanjiOf(lines) {
    const map = new Map();
    lines.forEach((l) => [l.who || '', l.jp].forEach((txt) => {
      for (const [, k, r] of txt.matchAll(/\{([^|}]+)\|([^}]+)\}/g)) {
        [...k].filter(isKanji).forEach((c) => {
          if (!map.has(c)) map.set(c, { k: c, n: 0, words: new Map() });
          const e = map.get(c);
          e.n++;
          e.words.set(k, r);
        });
      }
    }));
    return [...map.values()];
  }
  /* Módulo em que o kanji apareceu pela primeira vez (data/kanji.js). */
  function firstModule(c) {
    for (const [mod, list] of Object.entries(NJ.kanji || {})) if (list.some((e) => e.k === c)) return mod;
    return null;
  }

  function ruby(markup) {
    return markup.split(/(\{[^}]*\})/).map((part) => {
      const m = /^\{([^|}]+)\|([^}]+)\}$/.exec(part);
      if (!m) return esc(part);
      const kj = [...m[1]].filter(isKanji).join('');
      return `<ruby${kj ? ` data-kj="${esc(kj)}"` : ''}>${esc(m[1])}<rt>${esc(m[2])}</rt></ruby>`;
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

  function sideHtml(kanji, mod) {
    const fresh = kanji.filter((e) => firstModule(e.k) === mod).length;
    return `
      <div class="st-side-head">
        <b>Kanji desta história</b>
        <button type="button" class="icon-btn st-side-close" data-side-close aria-label="Fechar">✕</button>
      </div>
      <p class="muted small">${kanji.length} kanji · ${fresh} novos. Toque num kanji para destacá-lo no texto.</p>
      <button type="button" class="chip st-hl-clear" data-hl-clear hidden>Limpar destaque</button>
      <ol class="st-kj-list">${kanji.map((e) => {
        const info = NJ.KanjiPage ? NJ.KanjiPage.find(e.k) : null;
        const fm = firstModule(e.k);
        return `<li>
          <button type="button" class="st-kj" data-hl="${esc(e.k)}" aria-pressed="false">
            <span class="jp st-kj-char" lang="ja">${esc(e.k)}</span>
            <span class="st-kj-txt">
              <b>${esc(info ? info.m : '')}</b>
              <small class="jp" lang="ja">${[...e.words].map(([w, r]) => `${esc(w)}（${esc(r)}）`).join('、')}</small>
            </span>
            <span class="st-kj-meta">${fm === mod ? '<span class="tag new">novo</span>' : fm ? `<span class="tag">M${esc(fm)}</span>` : ''}<small>×${e.n}</small></span>
          </button>
          <button type="button" class="icon-btn st-kj-info" data-kjsheet="${esc(e.k)}" aria-label="Traços de ${esc(e.k)}">${icon.eye}</button>
        </li>`;
      }).join('')}</ol>`;
  }

  function widget(host, lines, audioSrc, mod) {
    const furi = store.get('furigana', true);
    const trad = store.get('translate', false);
    const kanji = kanjiOf(lines);
    host.innerHTML = `
      <div class="st-layout">
      <div class="st-main">
      <div class="st-player">
        <audio preload="metadata" src="${esc(audioSrc)}"></audio>
        <div class="st-bar">
          <span class="st-time" data-cur>0:00</span>
          <input type="range" class="st-seek" min="0" max="1000" value="0" step="1" aria-label="Posição do áudio">
          <span class="st-time" data-dur>0:00</span>
        </div>
        <div class="st-tools">
          <button type="button" class="icon-btn" data-skip="-5" aria-label="Voltar 5 segundos">${icon.replay}</button>
          <button type="button" class="icon-btn primary st-pp" data-pp aria-label="Tocar">${icon.play}</button>
          <span class="st-rates">${[0.75, 1, 1.25].map((r) => `<button type="button" class="chip${r === 1 ? ' on' : ''}" data-rate="${r}">${r}x</button>`).join('')}</span>
        </div>
      </div>
      <div class="st-toggles">
        <button type="button" class="chip" data-tg="furi" aria-pressed="${furi}">ふ Furigana</button>
        <button type="button" class="chip" data-tg="trad" aria-pressed="${trad}">PT Tradução</button>
      </div>
      <p class="muted small">Toque numa fala para ver ou esconder só a tradução dela.</p>
      <ol class="st-lines${furi ? '' : ' no-furi'}${trad ? ' show-pt' : ''}">${lines.map(lineHtml).join('')}</ol>
      </div>
      <aside class="st-side" aria-label="Kanji desta história">${sideHtml(kanji, mod)}</aside>
      </div>
      <button type="button" class="st-side-fab" data-side-open aria-label="Kanji desta história"><span class="jp" lang="ja">漢字</span><small>${kanji.length}</small></button>
      <div class="st-side-backdrop" data-side-close></div>`;

    const audio = host.querySelector('audio');
    const list = host.querySelector('.st-lines');
    const pp = host.querySelector('[data-pp]'), seek = host.querySelector('.st-seek');
    const cur = host.querySelector('[data-cur]'), dur = host.querySelector('[data-dur]');
    let seeking = false;
    const syncPP = () => { pp.innerHTML = audio.paused ? icon.play : icon.pause; pp.setAttribute('aria-label', audio.paused ? 'Tocar' : 'Pausar'); };
    const syncTime = () => {
      cur.textContent = fmt(audio.currentTime);
      if (!seeking && audio.duration) seek.value = Math.round((audio.currentTime / audio.duration) * 1000);
    };
    audio.addEventListener('loadedmetadata', () => { dur.textContent = fmt(audio.duration); });
    audio.addEventListener('timeupdate', syncTime);
    audio.addEventListener('play', syncPP);
    audio.addEventListener('pause', syncPP);
    audio.addEventListener('ended', syncPP);
    seek.addEventListener('input', () => { seeking = true; if (audio.duration) cur.textContent = fmt((seek.value / 1000) * audio.duration); });
    seek.addEventListener('change', () => { seeking = false; if (audio.duration) audio.currentTime = (seek.value / 1000) * audio.duration; });

    /* Plano B: o Firefox às vezes não consegue abrir a saída de som do <audio> (NS_ERROR_DOM_MEDIA_MEDIASINK_ERR),
       mesmo com o arquivo perfeito. Passando o áudio pelo Web Audio, ele usa outro caminho de saída.
       Se o plano B funcionar uma vez, o app já começa por ele nas próximas vezes. */
    let actx = null, viaWebAudio = false, retrying = false, wantPlay = false;
    function useWebAudio() {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (viaWebAudio || !AC) return false;
      try {
        actx = new AC();
        actx.createMediaElementSource(audio).connect(actx.destination);
        viaWebAudio = true;
        return true;
      } catch (e) { return false; }
    }
    if (store.get('audioViaWebAudio', false)) useWebAudio();

    async function start() {
      if (actx && actx.state === 'suspended') await actx.resume();
      if (audio.error || audio.networkState === 3) audio.load();
      await audio.play();
    }

    async function fallback(reason) {
      if (retrying) return;
      if (!viaWebAudio && useWebAudio()) {
        retrying = true;
        const at = audio.currentTime;
        audio.load();
        try {
          if (at) audio.currentTime = at;
          await start();
          store.set('audioViaWebAudio', true);
        } catch (e) {
          toast('O áudio não tocou (' + reason + '). Feche e abra o navegador ou confira a saída de som.');
        }
        retrying = false;
        return;
      }
      toast('O áudio não tocou (' + reason + '). Feche e abra o navegador ou confira a saída de som.');
    }

    audio.addEventListener('error', () => {
      const code = audio.error ? audio.error.code : 0;
      if (wantPlay && code !== 2) fallback('erro ' + code);           // 2 = rede: aí não adianta trocar de caminho
      else if (code === 2) toast('Não foi possível baixar o áudio. Confira a internet e tente de novo.');
    });

    async function togglePlay() {
      if (!audio.paused) { audio.pause(); wantPlay = false; return; }
      wantPlay = true;
      try {
        await start();
      } catch (e) {
        if (e && e.name === 'AbortError') return;                        // o 'error' do elemento cuida disso
        fallback(e && e.name ? e.name : 'erro');
      }
    }

    /* Destaque de um kanji no texto (um por vez). */
    const layout = host.querySelector('.st-layout');
    const narrow = () => !matchMedia('(min-width: 1100px)').matches;
    function highlight(c) {
      host.querySelectorAll('ruby.hl').forEach((r) => r.classList.remove('hl'));
      host.querySelectorAll('[data-hl]').forEach((b) => b.setAttribute('aria-pressed', b.dataset.hl === c));
      host.querySelector('[data-hl-clear]').hidden = !c;
      if (!c) return;
      const hits = [...list.querySelectorAll('ruby[data-kj]')].filter((r) => r.dataset.kj.includes(c));
      hits.forEach((r) => r.classList.add('hl'));
      if (narrow()) layout.classList.remove('side-open');
      if (hits[0]) hits[0].scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    host.addEventListener('click', (ev) => {
      if (ev.target.closest('[data-side-open]')) return layout.classList.add('side-open');
      if (ev.target.closest('[data-side-close]')) return layout.classList.remove('side-open');
      const info = ev.target.closest('[data-kjsheet]');
      if (info) return NJ.KanjiPage.open(info.dataset.kjsheet);
      const hl = ev.target.closest('[data-hl]');
      if (hl) return highlight(hl.getAttribute('aria-pressed') === 'true' ? null : hl.dataset.hl);
      if (ev.target.closest('[data-hl-clear]')) return highlight(null);
      if (ev.target.closest('[data-pp]')) return togglePlay();
      const skip = ev.target.closest('[data-skip]');
      if (skip) { audio.currentTime = Math.max(0, audio.currentTime + +skip.dataset.skip); syncTime(); return; }
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
    return { destroy() { audio.pause(); if (actx) actx.close(); } };
  }

  return { widget, ruby };
})();
