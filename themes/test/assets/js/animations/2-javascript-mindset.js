(function () {
  if (!HTMLElement.prototype.animate) {
    return;
  }
  const circles = Array.from(document.querySelectorAll('circle'));
  const rect = document.querySelector('rect');

  const {
    matchMedia: mm
  } = window;
  const noAnim = mm && mm('(prefers-reduced-motion: reduce)').matches;

  const frames = [
    { transform: 'translate(50%, 100%) scale(0)', offset: 0 },
    { transform: 'translate(0%, 0%) scale(1)', offset: 1 }
  ];

  const rectFrames = [
    { transform: 'translate(50%, 100%) scale(0.1)', offset: 0 },
    { transform: 'translate(0%, 0%) scale(1)', offset: 1 },
  ];

  const rectFrames2 = [
    { transform: 'rotate(0deg)', offset: 0 },
    { transform: 'rotate(1deg)', offset: 0.1 },
    { transform: 'rotate(-1deg)', offset: 0.2 },
    { transform: 'rotate(1deg)', offset: 0.3 },
    { transform: 'rotate(-1deg)', offset: 0.4 },
    { transform: 'rotate(1deg)', offset: 0.5 },
    { transform: 'rotate(-1deg)', offset: 0.6 },
    { transform: 'rotate(1deg)', offset: 0.7 },
    { transform: 'rotate(-1deg)', offset: 0.8 },
    { transform: 'rotate(0deg)', offset: 1 }
  ];


  const timings = {
    iterations: 1,
    direction: 'normal',
    easing: 'cubic-bezier(0.9,-1,0.1,1)',
    fill: 'forwards'
  };

  circles.forEach((circle, idx) => {
    circle.animate(frames, Object.assign(timings, {
      delay: noAnim ? 0 : idx * (100 + (idx * 2)),
      duration: noAnim ? 0 : 2000//(idx + 2) * 200
    }));
  });

  let r = rect.animate(rectFrames, Object.assign(timings, {
    delay: noAnim ? 0 : circles.length * (100 + (circles.length * 2)),
  }));

  r.onfinish = function() {
    rect.animate(rectFrames2, Object.assign(timings, {
      delay: 0,
      duration: noAnim ? 0 : 400,
      easing: 'cubic-bezier(.64,-0.5,.26,1.28)'
    }));
  };
})();