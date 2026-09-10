const CACHE='our-trips-v6.12';
const ASSETS=['./','./index.html','./trip-core.js?v=6.12','./manifest.webmanifest','./icon-192.png','./icon-512.png'];
const assetURLs=new Set(ASSETS.map(path=>new URL(path,self.registration.scope).href));
self.addEventListener('install',event=>event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(ASSETS.map(path=>new Request(new URL(path,self.registration.scope),{cache:'reload'}))))));
self.addEventListener('message',event=>{if(event.data?.type==='SKIP_WAITING')self.skipWaiting()});
self.addEventListener('activate',event=>event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(key=>/^our-trips-v\d+\.\d+(?:\.\d+)?$/.test(key)&&key!==CACHE).map(key=>caches.delete(key)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',event=>{
 if(event.request.method!=='GET')return;
 const url=new URL(event.request.url);
 if(url.origin!==self.location.origin)return; // Cloud data, authentication and signed files stay on the network.
 if(event.request.mode==='navigate'){
  event.respondWith((async()=>{
   const cache=await caches.open(CACHE);
   try{
    const response=await fetch(event.request,{cache:'no-store'});
    const entry=new URL('./index.html',self.registration.scope);
    if(response.ok&&(url.pathname===entry.pathname||url.pathname===new URL('./',self.registration.scope).pathname)){
     try{await cache.put(entry.href,response.clone())}catch(_){}
    }
    return response;
   }catch(_){
    return await cache.match(new URL('./index.html',self.registration.scope).href)||new Response('You are offline. Reconnect to open Our Trips.',{status:503,headers:{'Content-Type':'text/plain; charset=utf-8'}});
   }
  })());return;
 }
 if(!assetURLs.has(url.href))return;
 event.respondWith(caches.open(CACHE).then(cache=>cache.match(event.request)).then(cached=>cached||fetch(event.request)));
});
