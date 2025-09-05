self.addEventListener("install", event => {
  event.waitUntil(
    caches.open("nano-cache").then(cache => {
      return cache.addAll([
        "/",
        "/nano offline.html"
      ]);
    })
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    fetch(event.request).catch(() => {
      return caches.match(event.request).then(response => {
        return response || caches.match("/nano offline.html");
      });
    })
  );
});
