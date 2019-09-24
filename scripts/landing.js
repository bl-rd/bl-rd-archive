export function landingAnimation() {
    const elements = Array.from(document.querySelectorAll('.landing--large'));
    document.addEventListener('animationend', e => {
        if (e.target.classList.contains('landing__last')) {
            elements.forEach(elem => elem.classList.add('landing--shadow'));
        }
    });
}