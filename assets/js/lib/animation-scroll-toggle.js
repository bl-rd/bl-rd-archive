export function pauseAnimationWhenOffscreen() {
  // function that "pauses" any animations in an `animation__container` when the container goes off the screen
  const pausedClass = 'animation__container--paused';
  const container = document.querySelector('.animation__container');

  const observer = new IntersectionObserver(function (entries) {
    return entries.pop().isIntersecting
      ? container.classList.remove(pausedClass)
      : container.classList.add(pausedClass);
  });
  observer.observe(container);
}