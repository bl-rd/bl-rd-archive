class SlideMenu extends HTMLElement {
    constructor() {
        super();
        let template = document.getElementById('slide-menu-template');
        this.attachShadow({ mode: 'open'}).appendChild(template.content.cloneNode(true));
    }

    connectedCallback() {
        const menu = this.shadowRoot.querySelector('nav');
        this.initialiseNavStyles();
        document.addEventListener('menuclick', function handleMenuClick() {
            menu.classList.toggle('show');
        });
    }

    initialiseNavStyles() {
        const links = Array.from(this.shadowRoot.querySelectorAll('nav li a'));
        const { pathname } = location;
        links.forEach(l => {
          if (pathname === l.getAttribute('href')) {
            l.parentElement.classList.add('active');
          }
        });
      }
}

if ('customElements' in window) {
    customElements.define('slide-menu', SlideMenu);
}

export default SlideMenu;