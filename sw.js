const CACHE='our-trips-v6.7.2';
const ASSETS=['./manifest.webmanifest','./icon-192.png','./icon-512.png'];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS))));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('message',e=>{if(e.data&&e.data.type==='SKIP_WAITING')self.skipWaiting()});
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;let u=new URL(e.request.url);if(e.request.mode==='navigate'||(u.origin===location.origin&&u.pathname.endsWith('/index.html'))){e.respondWith(fetch(e.request,{cache:'no-store'}).then(r=>{let c=r.clone();caches.open(CACHE).then(x=>x.put('./index.html',c));return r}).catch(()=>caches.match('./index.html')));return}if(u.origin===location.origin)e.respondWith(caches.match(e.request).then(c=>c||fetch(e.request).then(r=>{let q=r.clone();caches.open(CACHE).then(x=>x.put(e.request,q));return r})))});
