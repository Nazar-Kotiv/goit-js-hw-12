import{a as b,S as L,i as w}from"./assets/vendor-89feecc5.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))i(t);new MutationObserver(t=>{for(const n of t)if(n.type==="childList")for(const a of n.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function o(t){const n={};return t.integrity&&(n.integrity=t.integrity),t.referrerpolicy&&(n.referrerPolicy=t.referrerpolicy),t.crossorigin==="use-credentials"?n.credentials="include":t.crossorigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function i(t){if(t.ep)return;t.ep=!0;const n=o(t);fetch(t.href,n)}})();const E="41495993-e4e29dd1119c53de35b82b765",$=document.getElementById("search-form"),v=document.getElementById("search-input"),f=document.getElementById("gallery"),h=document.getElementById("loader"),l=document.getElementById("load-more");let s=1,c="";$.addEventListener("submit",I);l.addEventListener("click",B);function I(e){e.preventDefault();const r=v.value.trim();r!==""&&(c=r,s=1,M(),g(),y(c,s).then(o=>{o.hits.length===0?u("No images found for your search. Please try again!"):(p(o.hits),S(),k())}).catch(o=>m(o)).finally(()=>d()))}function B(){s===1?(d(),l.style.display="none"):g(),s++,y(c,s).then(e=>{e.hits.length>0?(p(e.hits),x()):(l.style.display="none",u("No more images available for your search."))}).catch(e=>m(e)).finally(()=>d())}function m(e){u(`Error: ${e.message}`),console.error("Error:",e)}function x(){const e=document.querySelector(".gallery-item");if(e){const r=e.getBoundingClientRect().height;window.scrollBy({top:r*2,behavior:"smooth"})}}async function y(e,r=1){const i=`https://pixabay.com/api/?key=${E}&q=${e}&image_type=photo&orientation=horizontal&safesearch=true&page=${r}&per_page=${40}`;try{return(await b.get(i)).data}catch(t){throw new Error(`Error fetching images: ${t.message}`)}}function p(e){const r=e.map(o=>`
            <a href="${o.largeImageURL}" class="gallery-item" data-lightbox="gallery">
              <img src="${o.webformatURL}" alt="${o.tags}">
              <div class="info">
                <p>${o.likes} likes</p>
                <p>${o.views} views</p>
                <p>${o.comments} comments</p>
                <p>${o.downloads} downloads</p>
              </div>
            </a>
          `).join("");f.innerHTML+=r}function M(){f.innerHTML=""}function S(){new L(".gallery a").refresh()}function g(){h.style.display="block"}function d(){h.style.display="none"}function u(e){w.error({title:"Error",message:e,position:"topCenter",timeout:5e3})}function k(){l.style.display="block"}
//# sourceMappingURL=commonHelpers.js.map