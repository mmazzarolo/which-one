"use strict";var precacheConfig=[["/which-one/index.html","1475ad2dcb9e0cb7b260c507952bd280"],["/which-one/static/css/main.ac5fc407.css","7a6fb1db3b406d71ab0780ff92e73eb3"],["/which-one/static/js/main.6a640209.js","e38bc074995e27085e3c3883890faf26"],["/which-one/static/media/flower-1.8e2e6b46.svg","8e2e6b46f0ffa8b92b07f901f087c632"],["/which-one/static/media/flower-2.7b760d8b.svg","7b760d8b414ff0c9db4fd5cd526d3453"],["/which-one/static/media/flower-3.4cee2b62.svg","4cee2b628903b734dc59a33b215ec5cb"],["/which-one/static/media/flower-4.ed2d144c.svg","ed2d144cd66d12db9e8846014ed7cf71"],["/which-one/static/media/game-start.208598ac.mp3","208598acc2bbeba4475edea4e8cb35d4"],["/which-one/static/media/new-record.1348aca4.png","1348aca4bc58db7203807189819b05b1"],["/which-one/static/media/pokemon-1.ca47e2c5.svg","ca47e2c5855a03a2c2b52975d9bc0c19"],["/which-one/static/media/pokemon-2.e89ef8b0.svg","e89ef8b006e2e3b09dd1623eb0b011e2"],["/which-one/static/media/pokemon-3.fc622ca1.svg","fc622ca1ca4a444833467eab0254fd96"],["/which-one/static/media/pokemon-4.ce3b7f1f.svg","ce3b7f1f43ebfbff9d81af6caaf03fcc"],["/which-one/static/media/swipe-failure.dbeee827.mp3","dbeee827959b763cbfd5720a2ffb618d"],["/which-one/static/media/swipe-success.ad46c438.mp3","ad46c438a6c11a6cc2ef3dcec0787825"],["/which-one/static/media/which-one-logo.bdb1dee4.png","bdb1dee4da64cf954ebf757e90d2b90f"]],cacheName="sw-precache-v3-sw-precache-webpack-plugin-"+(self.registration?self.registration.scope:""),ignoreUrlParametersMatching=[/^utm_/],addDirectoryIndex=function(e,t){var n=new URL(e);return"/"===n.pathname.slice(-1)&&(n.pathname+=t),n.toString()},cleanResponse=function(t){return t.redirected?("body"in t?Promise.resolve(t.body):t.blob()).then(function(e){return new Response(e,{headers:t.headers,status:t.status,statusText:t.statusText})}):Promise.resolve(t)},createCacheKey=function(e,t,n,a){var c=new URL(e);return a&&c.pathname.match(a)||(c.search+=(c.search?"&":"")+encodeURIComponent(t)+"="+encodeURIComponent(n)),c.toString()},isPathWhitelisted=function(e,t){if(0===e.length)return!0;var n=new URL(t).pathname;return e.some(function(e){return n.match(e)})},stripIgnoredUrlParameters=function(e,n){var t=new URL(e);return t.hash="",t.search=t.search.slice(1).split("&").map(function(e){return e.split("=")}).filter(function(t){return n.every(function(e){return!e.test(t[0])})}).map(function(e){return e.join("=")}).join("&"),t.toString()},hashParamName="_sw-precache",urlsToCacheKeys=new Map(precacheConfig.map(function(e){var t=e[0],n=e[1],a=new URL(t,self.location),c=createCacheKey(a,hashParamName,n,/\.\w{8}\./);return[a.toString(),c]}));function setOfCachedUrls(e){return e.keys().then(function(e){return e.map(function(e){return e.url})}).then(function(e){return new Set(e)})}self.addEventListener("install",function(e){e.waitUntil(caches.open(cacheName).then(function(a){return setOfCachedUrls(a).then(function(n){return Promise.all(Array.from(urlsToCacheKeys.values()).map(function(t){if(!n.has(t)){var e=new Request(t,{credentials:"same-origin"});return fetch(e).then(function(e){if(!e.ok)throw new Error("Request for "+t+" returned a response with status "+e.status);return cleanResponse(e).then(function(e){return a.put(t,e)})})}}))})}).then(function(){return self.skipWaiting()}))}),self.addEventListener("activate",function(e){var n=new Set(urlsToCacheKeys.values());e.waitUntil(caches.open(cacheName).then(function(t){return t.keys().then(function(e){return Promise.all(e.map(function(e){if(!n.has(e.url))return t.delete(e)}))})}).then(function(){return self.clients.claim()}))}),self.addEventListener("fetch",function(t){if("GET"===t.request.method){var e,n=stripIgnoredUrlParameters(t.request.url,ignoreUrlParametersMatching),a="index.html";(e=urlsToCacheKeys.has(n))||(n=addDirectoryIndex(n,a),e=urlsToCacheKeys.has(n));var c="/which-one/index.html";!e&&"navigate"===t.request.mode&&isPathWhitelisted(["^(?!\\/__).*"],t.request.url)&&(n=new URL(c,self.location).toString(),e=urlsToCacheKeys.has(n)),e&&t.respondWith(caches.open(cacheName).then(function(e){return e.match(urlsToCacheKeys.get(n)).then(function(e){if(e)return e;throw Error("The cached response that was expected is missing.")})}).catch(function(e){return console.warn('Couldn\'t serve response for "%s" from cache: %O',t.request.url,e),fetch(t.request)}))}});