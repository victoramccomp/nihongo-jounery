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

  /* Áudio pela voz japonesa do próprio aparelho (Web Speech API). Funciona offline na maioria dos celulares. */
  let jaVoice = null;
  function pickVoice() {
    if (!('speechSynthesis' in window)) return null;
    const voices = speechSynthesis.getVoices();
    jaVoice = voices.find((v) => /^ja[-_]JP/i.test(v.lang) && /google|kyoko|o-ren|siri/i.test(v.name)) ||
              voices.find((v) => /^ja/i.test(v.lang)) || null;
    return jaVoice;
  }
  if ('speechSynthesis' in window) {
    pickVoice();
    speechSynthesis.addEventListener && speechSynthesis.addEventListener('voiceschanged', pickVoice);
  }

  function speak(text, rate) {
    if (!('speechSynthesis' in window)) { toast('Este navegador não tem síntese de voz.'); return; }
    if (!jaVoice) pickVoice();
    speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = 'ja-JP';
    if (jaVoice) u.voice = jaVoice;
    u.rate = rate || 0.8;
    speechSynthesis.speak(u);
    if (!jaVoice) toast('Sem voz japonesa instalada: instale "Japonês" nas vozes do sistema.');
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

  return { esc, store, toast, speak, icon };
})();
