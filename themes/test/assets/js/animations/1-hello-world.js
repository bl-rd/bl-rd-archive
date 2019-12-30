const timings = {
    iterations: 1,
    direction: 'normal',
    fill: 'forwards',
    easing: 'cubic-bezier(0.9,-1,0.1,1)'
};
const initialDelay = 100;
const divs = Array.from(document.querySelectorAll('.animation__fragment'));
  
const frames1 = [
    { transform: 'scale(1)', offset: 0 },
    { transform: 'translateY(50%) rotate(90deg) scale(1, 1.66)', offset: 1 }
];
  
const frames2 = [
    { transform: 'scale(1)', offset: 0 },
    { transform: 'rotate(-47deg)', offset: 0.8 },
    { transform: 'rotate(-49deg)', offset: 0.9 },
    { transform: 'rotate(-45deg)', offset: 1 }
];
  
const frames3 = [
    { transform: 'scale(1)', offset: 0 },
    { transform: 'rotate(47deg)', offset: 0.8 },
    { transform: 'rotate(49deg)', offset: 0.9 },
    { transform: 'rotate(45deg)', offset: 1 }
];
  
// anims contain the secondary animation
let anims = [];
anims.push(divs[0].animate( frames1, Object.assign(timings, {
    delay: initialDelay + 500,
    duration: 600
})));
anims.push(divs[1].animate(frames2, Object.assign(timings, {
    delay: initialDelay + 1000,
    duration: 500
})));
anims.push(divs[2].animate(frames3, Object.assign(timings, {
    delay: initialDelay + 1000,
    duration: 500
})));