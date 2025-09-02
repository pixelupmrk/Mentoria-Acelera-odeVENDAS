const CACHE='pxup-mentoria-v4';
const PRECACHE=['/','/index.html','/styles.css','/app.js','/modules.json','/manifest.webmanifest',
'/icons/icon-192.png','/icons/icon-256.png','/icons/icon-512.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(PRECACHE)));self.skipWaiting();});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(keys=>Promise.all(keys.map(k=>k!==CACHE&&caches.delete(k)))));self.clients.claim();});
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;e.respondWith(caches.match(e.request).then(c=>c||fetch(e.request).then(r=>{const x=r.clone();caches.open(CACHE).then(C=>C.put(e.request,x));return r;}).catch(()=>caches.match('/index.html'))));});