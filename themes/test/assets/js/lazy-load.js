/**
 * Simple image lazy loader using Intersection observer
 * @param {String} selector 
 */
export function lazyLoad(selector) {
  const images = document.querySelectorAll(selector);

  if (!('IntersectionObserver' in window)) {
    images.forEach(function (img) {
      img.src = img.getAttribute('data-src');
    });
    return;
  }

  const observer = new IntersectionObserver(function (entries, observer) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        const image = entry.target;
        const prop = image.tagName.toLowerCase() === 'source'
          ? 'srcset'
          : 'src';
        image[prop] = image.getAttribute('data-src');
        image.classList.remove('lazy');
        observer.unobserve(image);
      }
    });
  });

  images.forEach(function (image) {
    observer.observe(image);
  });
}