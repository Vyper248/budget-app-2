if(!self.define){let e,i={};const n=(n,o)=>(n=new URL(n+".js",o).href,i[n]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=n,e.onload=i,document.head.appendChild(e)}else e=n,importScripts(n),i()})).then((()=>{let e=i[n];if(!e)throw new Error(`Module ${n} didn’t register its module`);return e})));self.define=(o,r)=>{const s=e||("document"in self?document.currentScript.src:"")||location.href;if(i[s])return;let d={};const c=e=>n(e,s),t={module:{uri:s},exports:d,require:c};i[s]=Promise.all(o.map((e=>t[e]||c(e)))).then((e=>(r(...e),d)))}}define(["./workbox-fa446783"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"assets/index-2f156d2e.js",revision:null},{url:"assets/index-809fd412.css",revision:null},{url:"assets/qr-scanner-worker.min-5f44a019.js",revision:null},{url:"assets/workbox-window.prod.es5-a7b12eab.js",revision:null},{url:"index.html",revision:"fdaea0e69a00d2f15a7cee1ac280de40"},{url:"manifest.webmanifest",revision:"bb81d85d1248dcae1fe6252ba096ab72"},{url:"touch-icon-ipad-retina.png",revision:"46b4de4826f2cf96496b5e9592df210b"},{url:"touch-icon-ipad.png",revision:"cfbd2580f497c853898a060e062bb17b"},{url:"touch-icon-iphone-retina.png",revision:"595df695b23c0e1436f5321575de8025"},{url:"touch-icon-iphone.png",revision:"31c97de25cd0ed141a897cd9b7830fd9"},{url:"vite.svg",revision:"8e3a10e157f75ada21ab742c022d5430"},{url:"touch-icon-ipad-retina.png",revision:"46b4de4826f2cf96496b5e9592df210b"},{url:"touch-icon-ipad.png",revision:"cfbd2580f497c853898a060e062bb17b"},{url:"touch-icon-iphone-retina.png",revision:"595df695b23c0e1436f5321575de8025"},{url:"touch-icon-iphone.png",revision:"31c97de25cd0ed141a897cd9b7830fd9"},{url:"vite.svg",revision:"8e3a10e157f75ada21ab742c022d5430"},{url:"manifest.webmanifest",revision:"bb81d85d1248dcae1fe6252ba096ab72"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));
