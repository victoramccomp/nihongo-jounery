/* Utilidades compartilhadas por todos os módulos. */
window.NJ = window.NJ || {};

NJ.util = (function () {
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  /* localStorage pode falhar (aba anônima, armazenamento bloqueado): o app segue funcionando sem salvar. */
  const store = {
    get(key, fallback) {
      try { const v = localStorage.getItem('nj.' + key); return v === null ? fallback : JSON.parse(v); } catch (e) { return fallback; }
    },
    set(key, value) {
      try { localStorage.setItem('nj.' + key, JSON.stringify(value)); } catch (e) { /* sem persistência */ }
    }
  };

  let toastTimer;
  function toast(msg) {
    const t = document.getElementById('toast');
    t.textContent = msg;
    t.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => t.classList.remove('show'), 2600);
  }

  /* Áudio pela voz japonesa do próprio aparelho (Web Speech API).
     Prioridade: a voz escolhida em "Áudio" > vozes locais (offline, mais confiáveis) > vozes online.
     As vozes online do Chrome no computador ("Google 日本語") às vezes "tocam" sem sair som. */
  const hasTTS = 'speechSynthesis' in window;
  function jaVoices() {
    if (!hasTTS) return [];
    const saved = store.get('voice', '');
    return speechSynthesis.getVoices()
      .filter((v) => /^ja/i.test(v.lang))
      .sort((a, b) => (b.name === saved) - (a.name === saved) || b.localService - a.localService);
  }
  if (hasTTS) {
    speechSynthesis.getVoices();
    speechSynthesis.addEventListener && speechSynthesis.addEventListener('voiceschanged', () => speechSynthesis.getVoices());
  }

  /* "Acorda" a saída de som antes de falar. Fones Bluetooth e algumas placas de som entram em repouso e
     cortam o começo do áudio ao voltar: numa frase perde-se o início, mas uma sílaba curta some inteira.
     Um tom inaudível (20 Hz, volume quase zero) mantém o dispositivo ativo durante a fala. */
  let actx = null, awakeUntil = 0;
  function wakeAudio(seconds) {
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return 0;
    try {
      actx = actx || new AC();
      if (actx.state === 'suspended') actx.resume();
      const now = performance.now();
      const wasAsleep = now > awakeUntil;
      const osc = actx.createOscillator(), gain = actx.createGain();
      osc.frequency.value = 20;
      gain.gain.value = 0.0008;
      osc.connect(gain).connect(actx.destination);
      osc.start();
      osc.stop(actx.currentTime + seconds);
      awakeUntil = Math.max(awakeUntil, now + seconds * 1000);
      return wasAsleep ? 350 : 0;   // se estava em repouso, dá um tempo para o dispositivo ligar
    } catch (e) { return 0; }
  }

  let utter = null;      // referência global: sem ela o Chrome pode descartar a fala no meio
  let timer = null;
  function speak(text, rate, voiceName) {
    if (!hasTTS) { toast('Este navegador não tem síntese de voz.'); return; }
    const voices = jaVoices();
    const voice = (voiceName && voices.find((v) => v.name === voiceName)) || voices[0] || null;
    if (!voice) toast('Sem voz japonesa instalada: adicione "Japonês" nas vozes do sistema.');
    const u = new SpeechSynthesisUtterance(text);
    u.lang = 'ja-JP';
    if (voice) u.voice = voice;
    u.rate = rate || store.get('rate', 0.8);
    u.onerror = (ev) => {
      if (ev.error === 'interrupted' || ev.error === 'canceled') return;
      toast('A voz "' + (voice ? voice.name : 'padrão') + '" falhou. Troque de voz em Áudio (ícone de alto-falante no topo).');
    };
    utter = u;
    clearTimeout(timer);
    /* Chamar speak() logo após cancel() faz o Chrome às vezes engolir a fala: espera um instante. */
    const busy = speechSynthesis.speaking || speechSynthesis.pending;
    if (busy) speechSynthesis.cancel();
    if (speechSynthesis.paused) speechSynthesis.resume();
    const wake = wakeAudio(Math.min(8, 2.5 + text.length * 0.4));
    timer = setTimeout(() => speechSynthesis.speak(utter), Math.max(busy ? 80 : 0, wake));
  }

  /* Janela "Áudio": escolher a voz, a velocidade e testar. */
  let audioDlg = null;
  function audioSettings() {
    if (!audioDlg) {
      audioDlg = document.createElement('dialog');
      audioDlg.className = 'sheet';
      document.body.appendChild(audioDlg);
      audioDlg.addEventListener('click', (ev) => {
        if (ev.target === audioDlg || ev.target.closest('[data-close]')) return audioDlg.close();
        const t = ev.target.closest('[data-test]');
        if (t) {
          const sel = audioDlg.querySelector('#voiceSel');
          speak(t.dataset.test, +audioDlg.querySelector('#rateIn').value, sel ? sel.value : '');
        }
      });
      audioDlg.addEventListener('change', (ev) => {
        if (ev.target.id === 'voiceSel') store.set('voice', ev.target.value);
        if (ev.target.id === 'rateIn') store.set('rate', +ev.target.value);
      });
      audioDlg.addEventListener('input', (ev) => {
        if (ev.target.id === 'rateIn') audioDlg.querySelector('#rateOut').textContent = (+ev.target.value).toFixed(1) + 'x';
      });
    }
    const voices = jaVoices();
    const rate = store.get('rate', 0.8);
    audioDlg.innerHTML = `
      <div class="sheet-inner audio-set">
        <div class="sheet-head">
          <span class="flash-bolt">${icon.sound}</span>
          <div><b class="flash-title">Áudio</b><p class="muted small">Voz japonesa usada nos botões de ouvir</p></div>
          <button type="button" class="icon-btn" data-close aria-label="Fechar">✕</button>
        </div>
        ${voices.length ? `
          <label>Voz
            <select id="voiceSel">${voices.map((v) => `<option value="${esc(v.name)}">${esc(v.name)}${v.localService ? '' : ' (online)'}</option>`).join('')}</select>
          </label>` : '<p class="note">Nenhuma voz japonesa encontrada neste aparelho. Adicione "Japonês" nas vozes/idiomas do sistema e reabra o navegador.</p>'}
        <label>Velocidade <output id="rateOut">${rate.toFixed(1)}x</output>
          <input type="range" id="rateIn" min="0.5" max="1.2" step="0.1" value="${rate}">
        </label>
        <div class="audio-tests">
          <button type="button" class="btn" data-test="こんにちは。にほんご">${icon.sound} Testar frase</button>
          <button type="button" class="btn outline" data-test="あ">${icon.sound} Testar sílaba (あ)</button>
        </div>
        <p class="muted small">Não saiu som? Confira o volume e experimente outra voz — as marcadas "(online)" precisam de internet
        e às vezes falham no computador. Se a frase sai mas a sílaba não, o começo do áudio está sendo cortado pela saída
        de som (comum em fones Bluetooth): o app já tenta evitar isso, mas trocar de saída costuma resolver.</p>
      </div>`;
    audioDlg.showModal();
  }

  const icon = {
    play: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14l11-7z"/></svg>',
    pause: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 5h4v14H7zM13 5h4v14h-4z"/></svg>',
    replay: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5V2L7 6l5 4V7a5 5 0 1 1-5 5H5a7 7 0 1 0 7-7z"/></svg>',
    prev: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15.4 7.4 14 6l-6 6 6 6 1.4-1.4L10.8 12z"/></svg>',
    next: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8.6 16.6 10 18l6-6-6-6-1.4 1.4 4.6 4.6z"/></svg>',
    sound: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3A4.5 4.5 0 0 0 14 8v8a4.5 4.5 0 0 0 2.5-4zM14 3.2v2.1a7 7 0 0 1 0 13.4v2.1a9 9 0 0 0 0-17.6z"/></svg>',
    check: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 16.2 4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4z"/></svg>',
    erase: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 19a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg>',
    back: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 11H7.8l5.6-5.6L12 4l-8 8 8 8 1.4-1.4L7.8 13H20z"/></svg>',
    eye: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5C6.5 5 2.7 9 1.5 12c1.2 3 5 7 10.5 7s9.3-4 10.5-7C21.3 9 17.5 5 12 5zm0 11a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm0-6a2 2 0 1 0 0 4 2 2 0 0 0 0-4z"/></svg>'
  };

  return { esc, store, toast, speak, audioSettings, icon };
})();
