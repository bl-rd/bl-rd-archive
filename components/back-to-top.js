class BackToTop extends HTMLElement {
    constructor() {
        super();
        let template = document.getElementById('back-to-top-template');
        this.attachShadow({ mode: 'open' }).appendChild(template.content.cloneNode(true));

        const link = document.createElement('style');
        link.textContent = style();
        this.shadowRoot.appendChild(link);
    }

    connectedCallback() {
        this.addEventListener('click', () => window.scrollTo({ top: 0 }));
    }
}

function style() {
    return String.raw`
    `;
}

if ('customElements' in window) {
    customElements.define('back-to-top', BackToTop);
}

export default BackToTop;