(()=>{function u(){let{matchMedia:p}=window;if(!HTMLElement.prototype.animate||p&&p("(prefers-reduced-motion: reduce)").matches)return;let g=Array.from(document.querySelectorAll("strong")),t=Array.from(document.querySelectorAll("em")),s=[{transform:"rotate(-4deg)",offset:0},{transform:"rotate(4deg)",offset:1}],l=[{transform:"translateY(0)",offset:0},{transform:"translateY(0.05em)",offset:.33},{transform:"translateY(0)",offset:.66},{transform:"translateY(-0.05em)",offset:1}],i={iterations:Infinity,direction:"normal",easing:"cubic-bezier(0.9,-1,0.1,1)"};g.forEach(e=>{e.classList.add("vg-text-animation"),e.innerHTML=`
      <span class="vg-text-animation__word">
        ${e.textContent.trim().replace(/\s/ig,'</span><span class="vg-text-animation__word">$&')}`;let r=Array.from(e.querySelectorAll(".vg-text-animation__word"));r.forEach((n,c)=>{n.innerHTML=n.innerHTML.replace(/\s/g,""),n.innerHTML=n.textContent.replace(/\S/g,'<span class="vg-text-animation__letter vg-text-animation__letter--bold">$&</span>'),r.length>1&&c<r.length-1&&(n.innerHTML+="&nbsp;")})}),Array.from(document.querySelectorAll(".vg-text-animation__letter--bold")).forEach((e,r)=>{let n=e.animate(s,Object.assign(i,{delay:r*80,duration:200}));new IntersectionObserver(a=>{a.forEach(m=>{m.isIntersecting?n.play():n.cancel()})},{root:null,rootMargin:"0px"}).observe(e)});for(let e=0;e<t.length;e++){let r=t[e];if(r.parentElement.hasAttribute("data-footnote"))continue;let n=`
      <span class="vg-text-animation"><span class="vg-text-animation__word">
        ${r.textContent.trim().replace(/\s/ig,'</span><span class="vg-text-animation__word">$&')}
      </span>`;r.innerHTML=n;let c=Array.from(r.querySelectorAll(".vg-text-animation__word"));c.forEach((a,m)=>{a.innerHTML=a.innerHTML.replace(/\s/g,""),a.innerHTML=a.textContent.replace(/\S/g,'<span class="vg-text-animation__letter vg-text-animation__letter--emphasis">$&</span>'),c.length>1&&m<c.length-1&&(a.innerHTML+="&nbsp;")})}Array.from(document.querySelectorAll(".vg-text-animation__letter--emphasis")).forEach((e,r)=>{let n=e.animate(l,Object.assign(i,{delay:r*40,duration:700,easing:"ease-in"}));new IntersectionObserver(a=>{a.forEach(m=>{m.isIntersecting?n.play():n.cancel()})},{root:null,rootMargin:"0px"}).observe(e)})}function d(){Array.from(document.querySelectorAll("article .article__observer")).forEach(s=>{new IntersectionObserver(function(i){let f=i.pop(),{intersectionRatio:o,target:e,boundingClientRect:r}=f;o>=1||r.y<0?t(e,0):o>=.9?t(e,1):o>=.8?t(e,2):o>=.7?t(e,3):o>=.6?t(e,4):o>=.5?t(e,5):o>=.4?t(e,6):o>=.3?t(e,7):o>=.2?t(e,8):o>=.1?t(e,9):t(e,10)},{root:null,rootMargin:"0px",threshold:g()}).observe(s)});function g(){let s=[],l=20;for(let i=1;i<=l;i++){let f=i/l;s.push(f)}return s.push(0),s}function t(s,l){s.parentElement.style=`--blur: ${l}px`}}u();d();})();