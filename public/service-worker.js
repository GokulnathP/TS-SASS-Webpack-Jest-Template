const STATIC_CACHE_NAME = 'static-v1';
const DYNAMIC_CACHE_NAME = 'dynamic-v1';
const STATIC_FILES = [];

self.addEventListener('install', function (event) {
    console.log('[Service Workers] installing...', event);
    event.waitUntil(
        caches.open(STATIC_CACHE_NAME)
            .then(function (cache) {
                console.log('[Service Workers] Precaching...');
                cache.addAll(STATIC_FILES);
            })
    );
});

self.addEventListener('activate', function (event) {
    console.log('[Service Workers] activating...', event);
    event.waitUntil(
        caches.keys()
            .then(function (keyList) {
                return Promise.all(keyList.map(function (key) {
                    if (key !== STATIC_CACHE_NAME || key !== DYNAMIC_CACHE_NAME) {
                        console.log('[Service Workers] Removing cahce...');
                        return caches.delete(key);
                    }
                }));
            })
    );
});