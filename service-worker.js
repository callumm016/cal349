self.addEventListener('install', (e) => {
  console.log('Service Worker installed');
});

self.addEventListener('fetch', (e) => {
  // you can cache requests later if needed
});
