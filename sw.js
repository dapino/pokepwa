const CACHE_ACTUAL = "cache0";

const ARCHIVOS_PARA_CACHEAR = [
    "/",
    "/index.html",
    
    "css/main.css",

    "js/app.js",
    "js/services.js",

    "apple-touch-icon.png",

    "sw-registration.js"
]


self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_ACTUAL)
            .then(miCache => {
                console.info('cacheado!!')
                return miCache.addAll(ARCHIVOS_PARA_CACHEAR);
            })
    )
})

self.addEventListener('activate', event => {
    event.waitUntil(self.clients.claim());

    event.waitUntil(
        caches.keys().then(lasCaches => {
            return Promise.all(
                lasCaches.map(unaCache => {
                  console.log(unaCache);
                    if(unaCache !== CACHE_ACTUAL){
                        return caches.delete(unaCache);
                    }
                })
            )
        })
    )
})

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(cacheResponse => {        
        
        var fetchRequest = event.request.clone();

        return fetch(fetchRequest).then(
          response => {
            if(!response || response.status !== 200 || response.type !== 'basic') {
              return cacheResponse;
            }

            var responseToCache = response.clone();

            caches.open(CACHE_ACTUAL)
              .then( chache => {
                cache.put(event.request, responseToCache);
              });

              return response;
          }, err => {
            console.log(err);
              return cacheResponse;
          }
        )
      })
  )
})
