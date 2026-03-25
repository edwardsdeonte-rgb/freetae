const CACHE_NAME='freetae-v1';
const PRECACHE=['/','assets/logo-512.png','assets/apple-touch-icon.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE_NAME).then(c=>c.addAll(PRECACHE)).then(()=>self.skipWaiting()));});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE_NAME).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',e=>{
var url=new URL(e.request.url);
if(e.request.method!=='GET')return;
if(url.origin!==self.location.origin)return;
if(e.request.mode==='navigate'||(e.request.headers.get('accept')||'').includes('text/html')){
e.respondWith(fetch(e.request).then(r=>{var c=r.clone();caches.open(CACHE_NAME).then(ca=>ca.put(e.request,c));return r;}).catch(()=>caches.match(e.request)));
return;}
e.respondWith(caches.match(e.request).then(cached=>{if(cached)return cached;return fetch(e.request).then(r=>{if(r.ok){var c=r.clone();caches.open(CACHE_NAME).then(ca=>ca.put(e.request,c));}return r;});}));
});
