class SlideMenu extends HTMLElement {
    constructor() {
        super();
        let template = document.getElementById('slide-menu-template');
        this.attachShadow({ mode: 'open'}).appendChild(template.content.cloneNode(true));

        const link = document.createElement('style');
        link.textContent = style();
        this.shadowRoot.appendChild(link);
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

function style() {
  return String.raw`
    nav {
      position: fixed;
      right: 2rem;
      top: 2rem;
      right: initial;
      top: 0;
      left: 150vw;
      z-index: 999;
      transition: left 0.25s ease-out;
      background-color: var(--app-colour-body);
      width: 100vw;
      height: 100vh;
    }

    nav ul {
      list-style: none;
    }

    nav li {
      margin: 1rem;
      text-align: right;
      transition: all 0.16s ease-out;
      background-color: initial;
      max-width: initial;
      margin-right: -30vw;
      opacity: 0;
    }

    nav li a {
      display: inline-block;
      transition: all 0.12s ease-in;
    }

    nav li a:hover,
    nav li a:focus {
      transform: scale(1.3);
    }

    nav li a {
      color: var(--app-colour-background);
      display: inline-block;
      padding: 0.66rem 1.5ch;
      text-transform: uppercase;
      text-decoration: none;
      padding-right: 0.7ch;
      font-size: var(--s3);
      font-family: var(--font-heading);
      text-shadow: -0.2ch 0 0 var(--app-colour-body);
      position: relative;
    }

    nav li.active a::before {
      content: '';
      display: block;
      z-index: -1;
      width: 1ch;
      height: 1ch;
      background-color: var(--highlight);
      position: absolute;
      left: -.15ch;
      top: .5ch;
      transition: all 0.12s ease-out;
    }

    nav li.active a:hover::before,
    nav li.active a:focus::before {
      transform: translate(100%) rotate(-30deg) scale(1.2);
    }

    nav.show {
      transition: left 0.25s ease-out;
      left: 0;
    }

    nav.show li {
      animation-name: list-appear;
      animation-fill-mode: forwards;
      animation-duration: 0.2s;
      animation-timing-function: ease-out;
    }

    nav.show li:nth-child(1) {
      animation-delay: 0.2s;
    }

    nav.show li:nth-child(2) {
          animation-delay: 0.3s;
    }

    nav.show li:nth-child(3) {
      animation-delay: 0.4s;
    }

    @keyframes list-appear {
      0% {
          margin-right: -30vw;
          opacity: 0;
      }
      100% {
          margin-right: 20vmin;
          opacity: 1;
      }
    }
  `;
};

if ('customElements' in window) {
    customElements.define('slide-menu', SlideMenu);
}

export default SlideMenu;