(function () {
  const observers = Array.from(document.querySelectorAll('article .article__observer'));

  observers.forEach(x => {
    const observer = new IntersectionObserver(function (entries) {
      const entry = entries.pop();
      const { intersectionRatio: ratio, target, boundingClientRect } = entry;

      // For the time being, don't blur when the item leaves
      // the top of the viewport
      if (ratio >= 1 || boundingClientRect.y < 0) {
        setBlur(target, 0);
      } else if (ratio >= 0.9) {
        setBlur(target, 1);
      } else if (ratio >= 0.8) {
        setBlur(target, 2);
      } else if (ratio >= 0.7) {
        setBlur(target, 3);
      } else if (ratio >= 0.6) {
        setBlur(target, 4);
      } else if (ratio >= 0.5) {
        setBlur(target, 5);
      } else if (ratio >= 0.4) {
        setBlur(target, 6);
      } else if (ratio >= 0.3) {
        setBlur(target, 7);
      } else if (ratio >= 0.2) {
        setBlur(target, 8);
      } else if (ratio >= 0.1) {
        setBlur(target, 9);
      } else {
        setBlur(target, 10);
      }
    }, {
      root: null,
      rootMargin: '0px',
      threshold: buildThresholdList()
    });
    observer.observe(x);
  });

  function buildThresholdList() {
    let thresholds = [];
    let numSteps = 20;
  
    for (let i=1.0; i<=numSteps; i++) {
      let ratio = i/numSteps;
      thresholds.push(ratio);
    }
  
    thresholds.push(0);
    return thresholds;
  }

  /**
   * Set the blur intensity
   * @param {Element} target
   * @param {Number} val 
   */
  function setBlur(target, val) {
    target.parentElement.style = `--blur: ${val}px`;
  }
})();