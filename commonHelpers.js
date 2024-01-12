import{a as p,S as b,i as L}from"./assets/vendor-89feecc5.js";(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const c of o.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&i(c)}).observe(document,{childList:!0,subtree:!0});function r(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerpolicy&&(o.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?o.credentials="include":e.crossorigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function i(e){if(e.ep)return;e.ep=!0;const o=r(e);fetch(e.href,o)}})();const w="41495993-e4e29dd1119c53de35b82b765",E=document.getElementById("search-form"),v=document.getElementById("search-input"),f=document.getElementById("gallery"),h=document.getElementById("loader"),u=document.getElementById("load-more");let a=1,d="";E.addEventListener("submit",$);u.addEventListener("click",x);function $(t){t.preventDefault();const n=v.value.trim();n!==""&&(d=n,a=1,B(),y(),g(d,a).then(r=>{r.hits.length===0?l("No images found for your search. Please try again!"):(m(r.hits),I(),P())}).catch(r=>{l("Error fetching images. Please try again later."),console.error("Error fetching images:",r)}).finally(()=>{s()}))}async function g(t,n=1){const i=`https://pixabay.com/api/?key=${w}&q=${t}&image_type=photo&orientation=horizontal&safesearch=true&page=${n}&per_page=${40}`;try{return(await p.get(i)).data}catch(e){throw e}}function m(t){const n=t.map(r=>`
            <a href="${r.largeImageURL}" class="gallery-item" data-lightbox="gallery">
              <img src="${r.webformatURL}" alt="${r.tags}">
              <div class="info">
                <p>${r.likes} likes</p>
                <p>${r.views} views</p>
                <p>${r.comments} comments</p>
                <p>${r.downloads} downloads</p>
              </div>
            </a>
          `).join("");f.innerHTML+=n}function B(){f.innerHTML=""}function I(){new b(".gallery a").refresh()}function y(){h.style.display="block"}function s(){h.style.display="none"}function l(t){L.error({title:"Error",message:t,position:"topCenter",timeout:5e3})}function P(){u.style.display="block"}async function x(){y(),a++;try{const t=await g(d,a);t.hits.length>0?(m(t.hits),M()):(s(),u.style.display="none",l("No more images available for your search."))}catch(t){s(),l("Error fetching additional images. Please try again later."),console.error("Error fetching images:",t)}finally{s()}}function M(){const t=document.querySelector(".gallery-item").getBoundingClientRect().height;window.scrollBy({top:t*2,behavior:"smooth"})}
//# sourceMappingURL=commonHelpers.js.map