(()=>{function d(){let{matchMedia:s}=window;if(!HTMLElement.prototype.animate||s&&s("(prefers-reduced-motion: reduce)").matches)return;let o=Array.from(document.querySelectorAll("strong")),a=Array.from(document.querySelectorAll("em")),c=[{transform:"rotate(-4deg)",offset:0},{transform:"rotate(4deg)",offset:1}],p=[{transform:"translateY(0)",offset:0},{transform:"translateY(0.05em)",offset:.33},{transform:"translateY(0)",offset:.66},{transform:"translateY(-0.05em)",offset:1}],l={iterations:Infinity,direction:"normal",easing:"cubic-bezier(0.9,-1,0.1,1)"};o.forEach(t=>{t.classList.add("vg-text-animation"),t.innerHTML=`
      <span class="vg-text-animation__word">
        ${t.textContent.trim().replace(/\s/ig,'</span><span class="vg-text-animation__word">$&')}`;let n=Array.from(t.querySelectorAll(".vg-text-animation__word"));n.forEach((e,i)=>{e.innerHTML=e.innerHTML.replace(/\s/g,""),e.innerHTML=e.textContent.replace(/\S/g,'<span class="vg-text-animation__letter vg-text-animation__letter--bold">$&</span>'),n.length>1&&i<n.length-1&&(e.innerHTML+="&nbsp;")})}),Array.from(document.querySelectorAll(".vg-text-animation__letter--bold")).forEach((t,n)=>{let e=t.animate(c,Object.assign(l,{delay:n*80,duration:200}));new IntersectionObserver(r=>{r.forEach(m=>{m.isIntersecting?e.play():e.cancel()})},{root:null,rootMargin:"0px"}).observe(t)});for(let t=0;t<a.length;t++){let n=a[t];if(n.parentElement.hasAttribute("data-footnote"))continue;let e=`
      <span class="vg-text-animation"><span class="vg-text-animation__word">
        ${n.textContent.trim().replace(/\s/ig,'</span><span class="vg-text-animation__word">$&')}
      </span>`;n.innerHTML=e;let i=Array.from(n.querySelectorAll(".vg-text-animation__word"));i.forEach((r,m)=>{r.innerHTML=r.innerHTML.replace(/\s/g,""),r.innerHTML=r.textContent.replace(/\S/g,'<span class="vg-text-animation__letter vg-text-animation__letter--emphasis">$&</span>'),i.length>1&&m<i.length-1&&(r.innerHTML+="&nbsp;")})}Array.from(document.querySelectorAll(".vg-text-animation__letter--emphasis")).forEach((t,n)=>{let e=t.animate(p,Object.assign(l,{delay:n*40,duration:700,easing:"ease-in"}));new IntersectionObserver(r=>{r.forEach(m=>{m.isIntersecting?e.play():e.cancel()})},{root:null,rootMargin:"0px"}).observe(t)})}function u(){let s="animation__container--paused",o=document.querySelector(".animation__container");new IntersectionObserver(function(c){return c.pop().isIntersecting?o.classList.remove(s):o.classList.add(s)}).observe(o)}var f=class extends HTMLElement{constructor(){super();let o=document.getElementById("back-to-top-template");this.attachShadow({mode:"open"}).appendChild(o.content.cloneNode(!0));let a=document.createElement("style");a.textContent=g(),this.shadowRoot.appendChild(a),this.observer=null}connectedCallback(){this.addEventListener("click",()=>window.scrollTo({top:0}));let o=this.shadowRoot.querySelector("button");this.observer=new IntersectionObserver(function(c){let{y:p}=c.pop().boundingClientRect,l="back-to-top--visible";p>1?o.classList.remove(l):o.classList.add(l)},{root:null,rootMargin:"0px"});let a=document.querySelector("div[data-button-observer]");this.observer.observe(a)}disconnectedCallback(){this.observer.disconnect()}};function g(){return String.raw`
        button {
            --btt-opacity: 0;
            --btt-margin-top: 4rem;
            background: none;
            outline: none;
            border: none;
            text-decoration: underline;
            cursor: pointer;
            margin-top: var(--btt-margin-top);
            padding-left: 0;
            transition: all 0.66s ease-out;
            opacity: var(--btt-opacity);
            font-family: var(--font-body);
            font-weight: bold;
            color: var(--app-colour-body);
        }

        .back-to-top--visible {
            --btt-opacity: 1;
            --btt-margin-top: 2rem;
        }
        
        button:hover {
            color: var(--highlight);
        }
        
        button:focus {
            outline-color: var(--highlight);
            outline-offset: .25ch;
            outline-style: solid;
            outline-width: .4ch;
        }
        
        button:active {
            outline: none;
            color: var(--white);
            background-color: var(--highlight);
            text-decoration: none;
        }

        @supports (position:sticky) {
            div {
                position: sticky;
                top: -1px;
            }
        }

        div {
            margin-top: 1ch;
        }

        div::before {
            content: '';
            display: block;
            position: absolute;
            left: 0;
            width: 100%;
            height: calc(var(--stripe-width) * 5);
            background-color: var(--app-colour-body);
            background: repeating-linear-gradient(
              -45deg,
              var(--gradient-colour),
              var(--gradient-colour) var(--stripe-width),
              #000 var(--stripe-width),
              #000 calc(var(--stripe-width) * 2)
            );
        }

        @media screen and
            (prefers-reduced-motion: reduce), 
            (update: slow) {
            * {
                transition-duration: 0.001ms !important;
                transition: none !important;
            }
        }
    `}"customElements"in window&&customElements.define("back-to-top",f);d();u();})();
