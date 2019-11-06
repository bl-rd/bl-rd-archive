class BackToTop extends HTMLElement {
    constructor() {
        super();
        let template = document.getElementById('back-to-top-template');
        this.attachShadow({ mode: 'open' }).appendChild(template.content.cloneNode(true));

        const link = document.createElement('style');
        link.textContent = style();
        this.shadowRoot.appendChild(link);

        this.observer = null;
    }

    connectedCallback() {
        this.addEventListener('click', () => window.scrollTo({ top: 0 }));

        // add an intersection observer listener for the transition styles
        let element = this.shadowRoot.querySelector('button');
        this.observer = new IntersectionObserver(function(entries) {
            const { isIntersecting } = entries.pop();
            const visiblityClass = 'back-to-top--visible';
            
            if (isIntersecting) {
                element.classList.remove(visiblityClass);
            } else {
                element.classList.add(visiblityClass);
            }
        }, {
            root: null,
            rootMargin: '0px'
        });

        const target = document.querySelector('.supplementary aside');
        this.observer.observe(target);
    }

    disconnectedCallback() {
        this.observer.disconnect();
    }

    
}

function style() {
    return String.raw`
        button {
            --btt-opacity: 0;
            --btt-margin-top: 4rem;
            background: none;
            outline: none;
            border: none;
            text-decoration: underline;
            cursor: pointer;
            margin-top: var(--btt-margin-top);
            padding-left: 0;
            transition: all 0.66s ease-out;
            opacity: var(--btt-opacity);
        }

        .back-to-top--visible {
            --btt-opacity: 1;
            --btt-margin-top: 2rem;
        }
        
        button:hover {
            color: var(--highlight);
        }
        
        button:focus {
            outline-color: var(--highlight);
            outline-offset: .25ch;
            outline-style: solid;
            outline-width: .4ch;
        }
        
        button:active {
            outline: none;
            color: var(--white);
            background-color: var(--highlight);
            text-decoration: none;
        }

        @supports (position:sticky) {
            div {
                position: sticky;
                top: -1px;
            }
        }

        div::before {
            content: '';
            display: block;
            position: absolute;
            left: 0;
            width: 100%;
            height: calc(var(--stripe-width) * 5);
            background-color: var(--app-colour-body);
            background: repeating-linear-gradient(
              -45deg,
              rgba(0, 0, 0, 0),
              rgba(0, 0, 0, 0) var(--stripe-width),
              #000 var(--stripe-width),
              #000 calc(var(--stripe-width) * 2)
            );
          }
    `;
}

if ('customElements' in window) {
    customElements.define('back-to-top', BackToTop);
}

export default BackToTop;