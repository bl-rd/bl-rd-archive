---
title: "Video Game Anim 1"
date: 2020-02-07T16:43:42Z
description: ""
---

{{<rawHtml>}}
<style>
main {
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  padding: 2rem;
}

p {
  text-align: center;
}

.vg-text-animation__word {
  display: inline-block;
}

.vg-text-animation__letter--bold {
  position: relative;
  display: inline-block;
}
</style>
{{</rawHtml>}}

> Throughout human history, we have been dependent on **machines** to survive. Fate, it seems, is not without a **sense of irony**.
>
> &mdash; {{<rawHtml>}}<cite>Morpheus</cite>{{</rawHtml>}}

{{<rawHtml>}}
<script>
  (function () {
    const {
      matchMedia: mm
    } = window;

    // feature-sniff for the web animations api
    if (!HTMLElement.prototype.animate) {
      return;
    }

    // accessibility checks
    if (mm && mm('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const frames = [
      { transform: 'rotate(-4deg)', offset: 0 },
      { transform: 'rotate(4deg)', offset: 1 }
    ];

    // get the elements from the DOM
    const bold = Array.from(document.querySelectorAll('strong'));

    bold.forEach(b => {
      b.classList.add('vg-text-animation');
      b.innerHTML = `
        <span class="vg-text-animation__word">
          ${b.textContent.trim().replace(/\s/ig,'</span><span class="vg-text-animation__word">$&')}`;     

      const words = Array.from(b.querySelectorAll('.vg-text-animation__word'));
      words.forEach((word, index) => {
        word.innerHTML = word.innerHTML.replace(/\s/g, '');
        word.innerHTML = word.textContent.replace(/\S/g, '<span class="vg-text-animation__letter vg-text-animation__letter--bold">$&</span>');
        if (words.length > 1 && index < words.length - 1) {
          word.innerHTML += '&nbsp;';
        }
      });
    });

    const letters = document.querySelectorAll('.vg-text-animation__letter--bold');
    letters.forEach((l, idx) => {
      l.animate(frames, {
        iterations: Infinity,
        direction: 'normal',
        easing: 'cubic-bezier(0.9,-1,0.1,1)',
        duration: 200,
        delay: idx * 80
      });
    });
  })();
</script>
{{</rawHtml>}}