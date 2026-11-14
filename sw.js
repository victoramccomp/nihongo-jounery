/* Service worker: guarda o app no aparelho para estudar sem internet.
   Ao alterar qualquer arquivo, aumente VERSION para os celulares baixarem a versão nova. */
const VERSION = 'nj-v6';
const FILES = [
  './',
  'index.html',
  'manifest.webmanifest',
  'css/app.css',
  'css/lesson.css',
  'css/flash.css',
  'js/util.js',
  'js/stroke.js',
  'js/kana.js',
  'js/ime.js',
  'js/lesson.js',
  'js/flash.js',
  'js/app.js',
  'modules/m1/m1.js',
  'modules/m1/hiragana.js',
  'modules/m1/katakana.js',
  'modules/m1/romaji.js',
  'js/story.js',
  'modules/stories.js',
  'modules/m2/historia.js',
  'modules/m3/historia.js',
  'modules/m4/historia.js',
  'data/strokes.js',
  'data/sounds.js',
  'data/hiragana.js',
  'data/katakana.js',
  'fonts/klee-one-400.woff2',
  'fonts/klee-one-600.woff2',
  'icons/icon.svg',
  'icons/icon-192.png',
  'icons/apple-touch-icon.png'
];

self.addEventListener('install', (ev) => {
  ev.waitUntil(caches.open(VERSION).then((c) => c.addAll(FILES)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (ev) => {
  ev.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== VERSION).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

/* Rede primeiro (pega atualizações quando online), cache como reserva quando offline. */
self.addEventListener('fetch', (ev) => {
  const url = new URL(ev.request.url);
  if (ev.request.method !== 'GET' || url.origin !== location.origin) return;
  /* Áudios das histórias (MBs, pedidos em pedaços com Range) vão direto à rede: o cache não guarda respostas parciais. */
  if (url.pathname.endsWith('.mp3') || ev.request.headers.has('range')) return;
  ev.respondWith(
    fetch(ev.request)
      .then((res) => {
        if (res.status === 200) { const copy = res.clone(); caches.open(VERSION).then((c) => c.put(ev.request, copy)); }
        return res;
      })
      .catch(() => caches.match(ev.request, { ignoreSearch: true }).then((r) => r || caches.match('index.html')))
  );
});
