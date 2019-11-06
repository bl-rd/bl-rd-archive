class MenuButton extends HTMLButtonElement {
    constructor() {
        super();
        let template = document.getElementById('menu-button-template');
        this.attachShadow({ mode: 'open'}).appendChild(template.content.cloneNode(true));

        const link = document.createElement('style');
        link.textContent = style();
        this.shadowRoot.appendChild(link);
    }

    connectedCallback() {
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

function style() {
    return String.raw`
    p {
        position: absolute;
        left: -9999px;
    }
    svg {
        display: none;
        visibility: hidden;
        stroke: var(--app-colour-body);
    }
    .active {
        display: inline-block;
        visibility: visible;
    }
    button {
        position: fixed;
        z-index: 10000;
        right: 1rem;
        top: 1rem;
        background-color: var(--app-colour-background);
        border: none;
        width: 60px;
        height: 60px;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
    }
    
    @media only screen and (max-width: 60rem) {
        button {
            top: initial;
            bottom: 1rem;
        }
    }
    `;
}

if ('customElements' in window) {
    customElements.define('menu-button', MenuButton, { extends: 'button'});
}

export default MenuButton;