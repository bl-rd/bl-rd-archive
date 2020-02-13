function anim() {

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

    // get the elements from the DOM
    const bold = Array.from(document.querySelectorAll('strong'));
    const emph = Array.from(document.querySelectorAll('em'));

    // the animation frames for the bold text
    const boldFrames = [{
        transform: 'rotate(-4deg)',
        offset: 0
    },
    {
        transform: 'rotate(4deg)',
        offset: 1
    }
    ];

    // the animation frames for the em text
    const emphFrames = [{
        transform: 'translateY(0)',
        offset: 0
    },
    {
        transform: 'translateY(0.05em)',
        offset: 0.33
    },
    {
        transform: 'translateY(0)',
        offset: 0.66
    },
    {
        transform: 'translateY(-0.05em)',
        offset: 1
    }
    ];

    // the base settings for the timing options
    const timings = {
        iterations: Infinity,
        direction: 'normal',
        easing: 'cubic-bezier(0.9,-1,0.1,1)'
    };

    // trick from https://tobiasahlin.com/moving-letters/
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

    // animate the individual letters
    const letters = Array.from(document.querySelectorAll('.vg-text-animation__letter--bold'));
    letters.forEach((l, idx) => {
        let anim = l.animate(boldFrames, Object.assign(timings, {
            delay: idx * 80,
            duration: 200
        }));

        let observer = new IntersectionObserver(entries => {
            entries.forEach(e => {
                if (e.isIntersecting) {
                    anim.play();
                } else {
                    anim.cancel();
                }
            });
        }, {
            root: null,
            rootMargin: '0px'
        });
        observer.observe(l);
    });

    // don't use `forEach` as it can't be escaped
    for (let i = 0; i < emph.length; i++) {
        let e = emph[i];
        if (e.parentElement.hasAttribute('data-footnote')) {
            continue;
        }

        const mod = `
      <span class="vg-text-animation"><span class="vg-text-animation__word">
        ${e.textContent.trim().replace(/\s/ig,'</span><span class="vg-text-animation__word">$&')}
      </span>`;
        e.innerHTML = mod;

        const words = Array.from(e.querySelectorAll('.vg-text-animation__word'));
        words.forEach((word, index) => {
            word.innerHTML = word.innerHTML.replace(/\s/g, '');
            word.innerHTML = word.textContent.replace(/\S/g, '<span class="vg-text-animation__letter vg-text-animation__letter--emphasis">$&</span>');
            if (words.length > 1 && index < words.length - 1) {
                word.innerHTML += '&nbsp;';
            }
        });
    }

    // animate the individual letters
    const emphLetters = Array.from(document.querySelectorAll('.vg-text-animation__letter--emphasis'));
    emphLetters.forEach((l, idx) => {
        let anim = l.animate(emphFrames, Object.assign(timings, {
            delay: idx * 40,
            duration: 700,
            easing: 'ease-in'
        }));

        let observer = new IntersectionObserver(entries => {
            entries.forEach(e => {
                if (e.isIntersecting) {
                    anim.play();
                } else {
                    anim.cancel();
                }
            });
        }, {
            root: null,
            rootMargin: '0px'
        });
        observer.observe(l);
    });
}

anim();