/**
 * Have to extend HTMLElement (instead of HTMLButtonElement) as
 * `attachShadow` is only supported on custom autonomous components, not
 * custom built-in elements
 */
class MenuButton extends HTMLElement {
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
    div {
        --menu-button-size: 60px;
        --menu-button-offset: calc(var(--menu-button-size) * 3);
        max-width: calc(var(--measure-width) + 5vw + var(--menu-button-offset));
        margin: 0 auto;
        padding-top: 1em;
        display: flex;
        justify-content: flex-end;
    }
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
        background-color: var(--app-colour-background);
        border: none;
        width: var(--menu-button-size);
        height: var(--menu-button-size);
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
    customElements.define('menu-button', MenuButton);
}

export default MenuButton;