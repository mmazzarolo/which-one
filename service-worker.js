"use strict";var precacheConfig=[["/which-one/index.html","8f4eda094895db7f241d3b40c14bef19"],["/which-one/static/css/main.8f5699b2.css","7fc195962112476ad2ea4e1cff5a9652"],["/which-one/static/js/main.9f92cd54.js","bb9ef21955d72d6c0a44c03ed65aec63"],["/which-one/static/media/flower-1.8e2e6b46.svg","8e2e6b46f0ffa8b92b07f901f087c632"],["/which-one/static/media/flower-2.7b760d8b.svg","7b760d8b414ff0c9db4fd5cd526d3453"],["/which-one/static/media/flower-3.4cee2b62.svg","4cee2b628903b734dc59a33b215ec5cb"],["/which-one/static/media/flower-4.ed2d144c.svg","ed2d144cd66d12db9e8846014ed7cf71"],["/which-one/static/media/game-start.208598ac.mp3","208598acc2bbeba4475edea4e8cb35d4"],["/which-one/static/media/new-record.bf2b0200.png","bf2b0200c962cdc1d619aef3c9d9fdb3"],["/which-one/static/media/pokemon-1.ca47e2c5.svg","ca47e2c5855a03a2c2b52975d9bc0c19"],["/which-one/static/media/pokemon-2.e89ef8b0.svg","e89ef8b006e2e3b09dd1623eb0b011e2"],["/which-one/static/media/pokemon-3.fc622ca1.svg","fc622ca1ca4a444833467eab0254fd96"],["/which-one/static/media/pokemon-4.ce3b7f1f.svg","ce3b7f1f43ebfbff9d81af6caaf03fcc"],["/which-one/static/media/swipe-failure.dbeee827.mp3","dbeee827959b763cbfd5720a2ffb618d"],["/which-one/static/media/swipe-success.ad46c438.mp3","ad46c438a6c11a6cc2ef3dcec0787825"],["/which-one/static/media/which-one-logo.982abb20.png","982abb20c19994be72f7bffd614d7ad4"]],cacheName="sw-precache-v3-sw-precache-webpack-plugin-"+(self.registration?self.registration.scope:""),ignoreUrlParametersMatching=[/^utm_/],addDirectoryIndex=function(e,t){var n=new URL(e);return"/"===n.pathname.slice(-1)&&(n.pathname+=t),n.toString()},cleanResponse=function(t){return t.redirected?("body"in t?Promise.resolve(t.body):t.blob()).then(function(e){return new Response(e,{headers:t.headers,status:t.status,statusText:t.statusText})}):Promise.resolve(t)},createCacheKey=function(e,t,n,c){var a=new URL(e);return c&&a.pathname.match(c)||(a.search+=(a.search?"&":"")+encodeURIComponent(t)+"="+encodeURIComponent(n)),a.toString()},isPathWhitelisted=function(e,t){if(0===e.length)return!0;var n=new URL(t).pathname;return e.some(function(e){return n.match(e)})},stripIgnoredUrlParameters=function(e,n){var t=new URL(e);return t.hash="",t.search=t.search.slice(1).split("&").map(function(e){return e.split("=")}).filter(function(t){return n.every(function(e){return!e.test(t[0])})}).map(function(e){return e.join("=")}).join("&"),t.toString()},hashParamName="_sw-precache",urlsToCacheKeys=new Map(precacheConfig.map(function(e){var t=e[0],n=e[1],c=new URL(t,self.location),a=createCacheKey(c,hashParamName,n,/\.\w{8}\./);return[c.toString(),a]}));function setOfCachedUrls(e){return e.keys().then(function(e){return e.map(function(e){return e.url})}).then(function(e){return new Set(e)})}self.addEventListener("install",function(e){e.waitUntil(caches.open(cacheName).then(function(c){return setOfCachedUrls(c).then(function(n){return Promise.all(Array.from(urlsToCacheKeys.values()).map(function(t){if(!n.has(t)){var e=new Request(t,{credentials:"same-origin"});return fetch(e).then(function(e){if(!e.ok)throw new Error("Request for "+t+" returned a response with status "+e.status);return cleanResponse(e).then(function(e){return c.put(t,e)})})}}))})}).then(function(){return self.skipWaiting()}))}),self.addEventListener("activate",function(e){var n=new Set(urlsToCacheKeys.values());e.waitUntil(caches.open(cacheName).then(function(t){return t.keys().then(function(e){return Promise.all(e.map(function(e){if(!n.has(e.url))return t.delete(e)}))})}).then(function(){return self.clients.claim()}))}),self.addEventListener("fetch",function(t){if("GET"===t.request.method){var e,n=stripIgnoredUrlParameters(t.request.url,ignoreUrlParametersMatching),c="index.html";(e=urlsToCacheKeys.has(n))||(n=addDirectoryIndex(n,c),e=urlsToCacheKeys.has(n));var a="/which-one/index.html";!e&&"navigate"===t.request.mode&&isPathWhitelisted(["^(?!\\/__).*"],t.request.url)&&(n=new URL(a,self.location).toString(),e=urlsToCacheKeys.has(n)),e&&t.respondWith(caches.open(cacheName).then(function(e){return e.match(urlsToCacheKeys.get(n)).then(function(e){if(e)return e;throw Error("The cached response that was expected is missing.")})}).catch(function(e){return console.warn('Couldn\'t serve response for "%s" from cache: %O',t.request.url,e),fetch(t.request)}))}});