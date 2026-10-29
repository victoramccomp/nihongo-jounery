/* Conversor romaji → kana no estilo dos teclados japoneses (IME). Usado no "teclado de treino". */
window.NJ = window.NJ || {};

NJ.Ime = (function () {
  const T = { a: 'あ', i: 'い', u: 'う', e: 'え', o: 'お', '-': 'ー' };
  const rows = {
    k: 'かきくけこ', s: 'さしすせそ', t: 'たちつてと', n: 'なにぬねの', h: 'はひふへほ', m: 'まみむめも',
    r: 'らりるれろ', g: 'がぎぐげご', z: 'ざじずぜぞ', d: 'だぢづでど', b: 'ばびぶべぼ', p: 'ぱぴぷぺぽ'
  };
  for (const c in rows) {
    [...'aiueo'].forEach((v, j) => { T[c + v] = rows[c][j]; });
    T[c + 'ya'] = rows[c][1] + 'ゃ'; T[c + 'yu'] = rows[c][1] + 'ゅ'; T[c + 'ye'] = rows[c][1] + 'ぇ'; T[c + 'yo'] = rows[c][1] + 'ょ';
  }
  Object.assign(T, {
    ya: 'や', yu: 'ゆ', yo: 'よ', yi: 'い', ye: 'いぇ',
    wa: 'わ', wi: 'うぃ', wu: 'う', we: 'うぇ', wo: 'を', who: 'うぉ',
    shi: 'し', chi: 'ち', tsu: 'つ', fu: 'ふ', ji: 'じ', si: 'し', ti: 'ち', tu: 'つ', hu: 'ふ', zi: 'じ', di: 'ぢ', du: 'づ',
    sha: 'しゃ', shu: 'しゅ', she: 'しぇ', sho: 'しょ',
    cha: 'ちゃ', chu: 'ちゅ', che: 'ちぇ', cho: 'ちょ', cya: 'ちゃ', cyu: 'ちゅ', cyo: 'ちょ',
    ja: 'じゃ', ju: 'じゅ', je: 'じぇ', jo: 'じょ', jya: 'じゃ', jyu: 'じゅ', jyo: 'じょ',
    fa: 'ふぁ', fi: 'ふぃ', fe: 'ふぇ', fo: 'ふぉ', tsa: 'つぁ',
    thi: 'てぃ', dhi: 'でぃ', twu: 'とぅ', dwu: 'どぅ',
    va: 'ゔぁ', vi: 'ゔぃ', vu: 'ゔ', ve: 'ゔぇ', vo: 'ゔぉ',
    xa: 'ぁ', xi: 'ぃ', xu: 'ぅ', xe: 'ぇ', xo: 'ぉ', la: 'ぁ', li: 'ぃ', lu: 'ぅ', le: 'ぇ', lo: 'ぉ',
    xya: 'ゃ', xyu: 'ゅ', xyo: 'ょ', lya: 'ゃ', lyu: 'ゅ', lyo: 'ょ',
    xtu: 'っ', ltu: 'っ', xtsu: 'っ', ltsu: 'っ', xwa: 'ゎ', lwa: 'ゎ'
  });

  function toKana(input) {
    const s = input.toLowerCase();
    let out = '', i = 0;
    while (i < s.length) {
      const c = s[i], n1 = s[i + 1];
      if (c === 'n') {
        if (n1 === "'") { out += 'ん'; i += 2; continue; }
        if (n1 === 'n') {
          const n2 = s[i + 2];
          out += 'ん';
          i += n2 && /[aiueoy]/.test(n2) ? 1 : 2;   // "konnichi" → こんにち, "honn" → ほん
          continue;
        }
        if (n1 && !/[aiueoy]/.test(n1) && /[a-z]/.test(n1)) { out += 'ん'; i += 1; continue; }
      }
      if (s.substr(i, 3) === 'tch') { out += 'っ'; i += 1; continue; }
      if (n1 === c && /[bcdfghjklmpqrstvwxyz]/.test(c)) { out += 'っ'; i += 1; continue; }
      let hit = false;
      for (let len = 4; len >= 1; len--) {
        const k = s.substr(i, len);
        if (T[k]) { out += T[k]; i += len; hit = true; break; }
      }
      if (!hit) { out += input[i]; i++; }
    }
    return out.replace(/([ぁ-ヿ])n$/i, '$1ん');   // "n" final: o teclado real espera o "nn", aqui já mostramos ん
  }

  const toKata = (s) => s.replace(/[ぁ-ゖ]/g, (ch) => String.fromCharCode(ch.charCodeAt(0) + 0x60));

  /* Widget: campo de texto + resultado grande + exemplos. */
  function widget(host) {
    host.innerHTML = `
      <div class="ime-top">
        <input type="text" class="ime-in" placeholder="digite em romaji: nihongo" autocapitalize="off" autocomplete="off" autocorrect="off" spellcheck="false" aria-label="Texto em romaji">
        <div class="seg ime-seg" role="tablist">
          <button type="button" class="on" data-m="h">ひらがな</button>
          <button type="button" data-m="k">カタカナ</button>
        </div>
      </div>
      <div class="ime-out"><span class="jp" lang="ja">　</span><button type="button" class="icon-btn" data-speak aria-label="Ouvir">${NJ.util.icon.sound}</button></div>
      <div class="ime-try">${['nihongo', 'sushi', 'kitte', 'kyou', 'konnichiha', 'toukyou', 'ra-men', 'sakka-', 'pikachuu', 'burajiru'].map((t) => `<button type="button" class="chip" data-try="${t}">${t}</button>`).join('')}</div>`;
    const input = host.querySelector('.ime-in');
    const out = host.querySelector('.ime-out .jp');
    let mode = 'h';
    function render() {
      const k = toKana(input.value);
      out.textContent = (mode === 'k' ? toKata(k) : k) || '　';
    }
    input.addEventListener('input', render);
    host.addEventListener('click', (ev) => {
      const m = ev.target.closest('[data-m]');
      if (m) {
        mode = m.dataset.m;
        host.querySelectorAll('[data-m]').forEach((b) => b.classList.toggle('on', b === m));
        render();
      }
      const t = ev.target.closest('[data-try]');
      if (t) {
        input.value = t.dataset.try;
        if (/-|burajiru|pikachuu/.test(t.dataset.try)) {
          mode = 'k';
          host.querySelectorAll('[data-m]').forEach((b) => b.classList.toggle('on', b.dataset.m === 'k'));
        }
        render();
      }
      if (ev.target.closest('[data-speak]') && out.textContent.trim()) NJ.util.speak(out.textContent);
    });
    return { destroy() {} };
  }

  return { toKana, widget };
})();
