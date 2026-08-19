const CACHE='our-trips-v6.2';
const ASSETS=['./manifest.webmanifest','./icon-192.png','./icon-512.png'];

self.addEventListener('install',event=>{
  event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(ASSETS)));
});

self.addEventListener('activate',event=>{
  event.waitUntil(
    caches.keys()
      .then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k))))
      .then(()=>self.clients.claim())
  );
});

self.addEventListener('message',event=>{
  if(event.data && event.data.type==='SKIP_WAITING') self.skipWaiting();
});

self.addEventListener('fetch',event=>{
  const req=event.request;
  if(req.method!=='GET') return;
  const url=new URL(req.url);

  // Navigation/HTML: network first so GitHub releases do not get stuck on old index.html.
  if(req.mode==='navigate' || (url.origin===location.origin && url.pathname.endsWith('/index.html'))){
    event.respondWith(
      fetch(req,{cache:'no-store'})
        .then(res=>{
          const copy=res.clone();
          caches.open(CACHE).then(cache=>cache.put('./index.html',copy)).catch(()=>{});
          return res;
        })
        .catch(()=>caches.match('./index.html').then(r=>r || caches.match('./')))
    );
    return;
  }

  // Same-origin app assets: stale-while-revalidate.
  if(url.origin===location.origin){
    event.respondWith(
      caches.match(req).then(cached=>{
        const fresh=fetch(req).then(res=>{
          if(res && res.ok){
            const copy=res.clone();
            caches.open(CACHE).then(cache=>cache.put(req,copy)).catch(()=>{});
          }
          return res;
        }).catch(()=>cached);
        return cached || fresh;
      })
    );
  }
});
