class MenuButton extends HTMLButtonElement {
    constructor() {
        super();
        let template = document.getElementById('menu-button-template');
        this.attachShadow({ mode: 'open'}).appendChild(template.content.cloneNode(true));
    }

    connectedCallback() {
        const style = document.createElement('link');
        style.setAttribute('rel', 'stylesheet');
        style.setAttribute('href', '/components/menu-button/menu-button.css');
        this.shadowRoot.appendChild(style);

        this.open = false;
        this.openSvg = this.shadowRoot.querySelector('#open-menu-icon');
        this.closeSvg = this.shadowRoot.querySelector('#close-menu-icon');

        this.addEventListener('click', this.clickHandler);
    }

    clickHandler() {
        this.open = !this.open;
        this.toggle();

        const event = new CustomEvent('menuclick', {
            detail: {
                open: this.open
            },
            bubbles: true,
            composed: true
        });
        this.dispatchEvent(event);
    }

    toggle() {
        this.openSvg.classList.toggle('active');
        this.closeSvg.classList.toggle('active');
    }
}

if ('customElements' in window) {
    customElements.define('menu-button', MenuButton, { extends: 'button'});
}

export default MenuButton;