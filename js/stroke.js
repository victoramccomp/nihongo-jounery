/* Ordem dos traços: animação, quadro passo a passo e área de prática.
   Usa os caminhos do KanjiVG (caixa de 109 x 109). Combinações (きゃ, ファ…) ficam lado a lado. */
window.NJ = window.NJ || {};

NJ.Stroke = (function () {
  const NS = 'http://www.w3.org/2000/svg';
  const BOX = 109, STEP = 109;
  const reduceMotion = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;

  function svgEl(tag, attrs, parent) {
    const el = document.createElementNS(NS, tag);
    for (const k in attrs) el.setAttribute(k, attrs[k]);
    if (parent) parent.appendChild(el);
    return el;
  }

  /* Lista plana dos traços de uma sequência de caracteres, já com o deslocamento horizontal. */
  function strokesOf(chars) {
    const out = [];
    [...chars].forEach((ch, i) => {
      const data = NJ.strokes[ch];
      if (!data) return;
      data.s.forEach((d, j) => {
        const m = /^[Mm]\s*([\d.\-]+)[ ,]*([\d.\-]+)/.exec(d);
        out.push({ d, dx: i * STEP, start: m ? [+m[1] + i * STEP, +m[2]] : null, num: data.n[j] ? [data.n[j][0] + i * STEP, data.n[j][1]] : null });
      });
    });
    return out;
  }

  function width(chars) { return BOX + STEP * ([...chars].length - 1); }

  function baseSvg(chars, cls) {
    const w = width(chars);
    const svg = svgEl('svg', { viewBox: `0 0 ${w} ${BOX}`, class: 'stk ' + (cls || ''), 'aria-hidden': 'true' });
    const guide = svgEl('g', { class: 'stk-guide' }, svg);
    [...chars].forEach((_, i) => {
      const x = i * STEP;
      svgEl('rect', { x: x + 2, y: 2, width: BOX - 4, height: BOX - 4, rx: 6 }, guide);
      svgEl('line', { x1: x + BOX / 2, y1: 4, x2: x + BOX / 2, y2: BOX - 4 }, guide);
      svgEl('line', { x1: x + 4, y1: BOX / 2, x2: x + BOX - 4, y2: BOX / 2 }, guide);
    });
    return svg;
  }

  function pathEl(s, cls, parent) {
    return svgEl('path', { d: s.d, class: cls, transform: s.dx ? `translate(${s.dx} 0)` : '' }, parent);
  }

  /* ---------- Animação principal ---------- */
  function animator(host, chars) {
    const strokes = strokesOf(chars);
    host.innerHTML = '';
    host.classList.add('stk-anim');
    const stage = document.createElement('div');
    stage.className = 'stk-stage';
    stage.style.maxWidth = Math.max(300, (width(chars) / BOX) * 230) + 'px';
    host.appendChild(stage);

    const svg = baseSvg(chars, 'stk-big');
    stage.appendChild(svg);
    const ghost = svgEl('g', { class: 'stk-ghost' }, svg);
    const ink = svgEl('g', { class: 'stk-ink' }, svg);
    const nums = svgEl('g', { class: 'stk-nums' }, svg);
    strokes.forEach((s) => pathEl(s, '', ghost));
    const paths = strokes.map((s) => pathEl(s, '', ink));
    const labels = strokes.map((s, i) => {
      if (!s.num) return null;
      const t = svgEl('text', { x: s.num[0], y: s.num[1] }, nums);
      t.textContent = i + 1;
      return t;
    });
    const pen = svgEl('circle', { r: 3.4, class: 'stk-pen' }, svg);
    const lens = paths.map((p) => p.getTotalLength());
    paths.forEach((p, i) => { p.style.strokeDasharray = `${lens[i]} ${lens[i]}`; p.style.strokeDashoffset = lens[i]; });

    const bar = document.createElement('div');
    bar.className = 'stk-controls';
    bar.innerHTML = `
      <button type="button" class="icon-btn" data-a="prev" aria-label="Traço anterior">${NJ.util.icon.prev}</button>
      <button type="button" class="icon-btn primary" data-a="play" aria-label="Reproduzir">${NJ.util.icon.play}</button>
      <button type="button" class="icon-btn" data-a="next" aria-label="Próximo traço">${NJ.util.icon.next}</button>
      <span class="stk-count" aria-live="polite"></span>
      <button type="button" class="chip" data-a="speed" aria-label="Velocidade">1x</button>
      <button type="button" class="chip" data-a="nums" aria-pressed="true">Números</button>`;
    host.appendChild(bar);
    const playBtn = bar.querySelector('[data-a=play]');
    const countEl = bar.querySelector('.stk-count');
    const speedBtn = bar.querySelector('[data-a=speed]');
    const numsBtn = bar.querySelector('[data-a=nums]');

    let done = 0;          // traços completos
    let anim = null;       // animação do traço atual
    let playing = false;
    let speed = 1;
    let timer = null;

    function paint() {
      paths.forEach((p, i) => {
        p.classList.toggle('cur', i === done && playing);
        if (anim && i === done) return;
        p.style.strokeDashoffset = i < done ? 0 : lens[i];
      });
      labels.forEach((t, i) => t && t.classList.toggle('on', i < done || (playing && i === done)));
      const nextStart = strokes[Math.min(done, strokes.length - 1)].start;
      if (nextStart && done < strokes.length) { pen.setAttribute('cx', nextStart[0]); pen.setAttribute('cy', nextStart[1]); pen.style.opacity = 1; }
      else pen.style.opacity = 0;
      countEl.textContent = `${done}/${strokes.length}`;
      playBtn.innerHTML = playing ? NJ.util.icon.pause : (done >= strokes.length ? NJ.util.icon.replay : NJ.util.icon.play);
      playBtn.setAttribute('aria-label', playing ? 'Pausar' : 'Reproduzir');
    }

    function stopAnim() {
      clearTimeout(timer);
      if (anim) { anim.cancel(); anim = null; }
    }

    function drawNext() {
      if (!playing) return;
      if (done >= strokes.length) { playing = false; paint(); return; }
      const i = done, p = paths[i];
      paint();
      const dur = Math.max(320, Math.min(1100, lens[i] * 11)) / speed;
      anim = p.animate([{ strokeDashoffset: lens[i] }, { strokeDashoffset: 0 }], { duration: dur, easing: 'ease-in-out', fill: 'forwards' });
      anim.onfinish = () => {
        p.style.strokeDashoffset = 0;
        anim.cancel(); anim = null;
        done++;
        paint();
        timer = setTimeout(drawNext, 260 / speed);
      };
    }

    function play() {
      if (done >= strokes.length) { done = 0; }
      if (anim) { anim.play(); playing = true; paint(); return; }
      playing = true;
      drawNext();
    }
    function pause() {
      playing = false;
      clearTimeout(timer);
      if (anim) anim.pause();
      paint();
    }
    function jump(n) {
      stopAnim();
      playing = false;
      done = Math.max(0, Math.min(strokes.length, n));
      paint();
    }

    bar.addEventListener('click', (ev) => {
      const b = ev.target.closest('button');
      if (!b) return;
      const a = b.dataset.a;
      if (a === 'play') playing ? pause() : play();
      else if (a === 'prev') jump(done - 1);
      else if (a === 'next') jump(done + 1);
      else if (a === 'speed') {
        speed = speed === 1 ? 0.5 : speed === 0.5 ? 2 : 1;
        b.textContent = speed + 'x';
        if (anim) anim.updatePlaybackRate(speed);
      } else if (a === 'nums') {
        const on = host.classList.toggle('no-nums') === false;
        b.setAttribute('aria-pressed', on);
      }
    });
    stage.addEventListener('click', () => (playing ? pause() : play()));

    if (reduceMotion) jump(strokes.length);
    else { paint(); setTimeout(play, 350); }

    return { destroy: stopAnim };
  }

  /* ---------- Quadro passo a passo (como no jisho.org) ---------- */
  function frames(host, chars) {
    const strokes = strokesOf(chars);
    host.innerHTML = '';
    host.classList.add('stk-frames');
    strokes.forEach((cur, i) => {
      const fig = document.createElement('figure');
      const svg = baseSvg(chars, 'stk-frame');
      const g = svgEl('g', {}, svg);
      strokes.forEach((s, j) => pathEl(s, j < i ? 'f-done' : j === i ? 'f-cur' : 'f-todo', g));
      if (cur.start) svgEl('circle', { cx: cur.start[0], cy: cur.start[1], r: 6, class: 'f-start' }, svg);
      fig.appendChild(svg);
      const cap = document.createElement('figcaption');
      cap.textContent = i + 1;
      fig.appendChild(cap);
      host.appendChild(fig);
    });
  }

  /* ---------- Área de prática (desenhar por cima do modelo) ---------- */
  function practice(host, chars) {
    const strokes = strokesOf(chars);
    host.innerHTML = '';
    host.classList.add('stk-practice');
    const pad = document.createElement('div');
    pad.className = 'pad';
    pad.style.aspectRatio = `${width(chars)} / ${BOX}`;
    const svg = baseSvg(chars, 'pad-guide');
    const g = svgEl('g', { class: 'pad-model' }, svg);
    strokes.forEach((s) => pathEl(s, '', g));
    const canvas = document.createElement('canvas');
    canvas.setAttribute('aria-label', 'Área para praticar a escrita');
    pad.append(svg, canvas);

    const bar = document.createElement('div');
    bar.className = 'stk-controls';
    bar.innerHTML = `
      <button type="button" class="chip" data-a="model" aria-pressed="true">${NJ.util.icon.eye} Modelo</button>
      <span class="stk-count">Desenhe com o dedo</span>
      <button type="button" class="chip" data-a="clear">${NJ.util.icon.erase} Limpar</button>`;
    host.append(pad, bar);

    const ctx = canvas.getContext('2d');
    let drawing = false, last = null, scale = 1;

    function resize() {
      const r = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = Math.round(r.width * dpr);
      canvas.height = Math.round(r.height * dpr);
      scale = r.height / BOX;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
    }
    const ro = 'ResizeObserver' in window ? new ResizeObserver(resize) : null;
    ro ? ro.observe(canvas) : setTimeout(resize, 0);

    function pos(ev) {
      const r = canvas.getBoundingClientRect();
      return [ev.clientX - r.left, ev.clientY - r.top];
    }
    canvas.addEventListener('pointerdown', (ev) => {
      drawing = true; last = pos(ev);
      canvas.setPointerCapture(ev.pointerId);
      ctx.strokeStyle = getComputedStyle(host).getPropertyValue('--ink').trim() || '#222';
      ctx.lineWidth = 4.2 * scale;
      ctx.beginPath(); ctx.arc(last[0], last[1], ctx.lineWidth / 2, 0, Math.PI * 2);
      ctx.fillStyle = ctx.strokeStyle; ctx.fill();
    });
    canvas.addEventListener('pointermove', (ev) => {
      if (!drawing) return;
      const p = pos(ev);
      ctx.beginPath(); ctx.moveTo(last[0], last[1]); ctx.lineTo(p[0], p[1]); ctx.stroke();
      last = p;
    });
    const end = () => { drawing = false; };
    canvas.addEventListener('pointerup', end);
    canvas.addEventListener('pointercancel', end);

    bar.addEventListener('click', (ev) => {
      const b = ev.target.closest('button');
      if (!b) return;
      if (b.dataset.a === 'clear') ctx.clearRect(0, 0, canvas.width, canvas.height);
      if (b.dataset.a === 'model') {
        const hidden = pad.classList.toggle('hide-model');
        b.setAttribute('aria-pressed', !hidden);
      }
    });
    return { destroy: () => ro && ro.disconnect() };
  }

  function count(chars) { return strokesOf(chars).length; }

  return { animator, frames, practice, count };
})();
