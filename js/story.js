/* História de abertura dos módulos: áudio original, falas com furigana e tradução linha a linha.
   Nos dados, {漢字|かんじ} vira <ruby>漢字<rt>かんじ</rt></ruby>. */
window.NJ = window.NJ || {};

NJ.Story = (function () {
  const { esc, store, icon, toast } = NJ.util;
  const fmt = (t) => (isFinite(t) ? Math.floor(t / 60) + ':' + String(Math.floor(t % 60)).padStart(2, '0') : '0:00');

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
      <ol class="st-lines${furi ? '' : ' no-furi'}${trad ? ' show-pt' : ''}">${lines.map(lineHtml).join('')}</ol>`;

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

    host.addEventListener('click', (ev) => {
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
