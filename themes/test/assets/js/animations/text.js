function anim() {

    // feature-sniff for the web animations api
    if (!HTMLElement.prototype.animate) {
        return;
    }

    // get the elements from the DOM
    const bold = Array.from(document.querySelectorAll('strong'));
    const emph = Array.from(document.querySelectorAll('em'));

    // the animation frames for the bold text
    const boldFrames = [
        { transform: 'rotate(-4deg)', offset: 0 },
        { transform: 'rotate(4deg)', offset: 1 }
    ];

    // the animation frames for the em text
    const emphFrames = [
        { transform: 'translateY(0)', offset: 0 },
        { transform: 'translateY(0.05em)', offset: 0.33 },
        { transform: 'translateY(-0.05em)', offset: 0.66 },
        { transform: 'translateY(0)', offset: 1 }
    ];

    // the base settings for the timing options
    const timings = {
        iterations: Infinity,
        direction: 'normal',
        easing: 'cubic-bezier(0.9,-1,0.1,1)'
    };

    // trick from https://tobiasahlin.com/moving-letters/
    bold.forEach(b => {
        b.classList.add('animation-word');        
        b.innerHTML = b.innerHTML.replace(/\s/g, '&nbsp;');
        b.innerHTML = b.textContent.replace(/\S/g, '<span class="animation-word__letter animation-word__letter--bold">$&</span>');
    });

    // animate the individual letters
    const letters = Array.from(document.querySelectorAll('.animation-word__letter--bold'));
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
        e.classList.add('animation-word');
        e.innerHTML = e.innerHTML.replace(/\s/g, '&nbsp;');
        e.innerHTML = e.textContent.replace(/\S/g, '<span class="animation-word__letter animation-word__letter--emphasis">$&</span>');
    }

    // animate the individual letters
    const emphLetters = Array.from(document.querySelectorAll('.animation-word__letter--emphasis'));
    emphLetters.forEach((l, idx) => {
        let anim = l.animate(emphFrames, Object.assign(timings, {
            delay: idx * 20,
            duration: 1000
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