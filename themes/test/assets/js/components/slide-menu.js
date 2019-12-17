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
        // button state
        this.openSvg = this.shadowRoot.querySelector('#open-menu-icon');
        this.closeSvg = this.shadowRoot.querySelector('#close-menu-icon');
        this.button = this.shadowRoot.querySelector('button');
        this.button.addEventListener.apply(this.button, ['click', () => this.toggle()]);

        // menu state
        this.activeLinkIndex = 0;
        this.menu = this.shadowRoot.querySelector('nav div:nth-of-type(2)');
        this.links = Array.from(this.shadowRoot.querySelectorAll('nav li a'));

        this.initialiseNavStyles();
    }

    /**
     * Is the menu currently in the `open` state
     * @returns {Boolean}
     */
    get open() {
        return this.menu && this.menu.classList.contains('show');
    }

    /**
     * @returns {HTMLAnchorElement}
     */
    get activeLink() {
        return Array.isArray(this.links)
            ? this.links[this.activeLinkIndex]
            : null;
    }

    /**
     * Update all the attributes on the menu
     */
    attributeHandler() {
        const { menu, links, button } = this;
        if (this.open) {
            menu.removeAttribute('hidden');
            button.setAttribute('aria-expanded', 'true');

            // focus on the first element
            // ...or maybe not
            // links[0].focus();

            // make all the anchor elements focusable
            links.forEach(l => l.setAttribute('tabindex', '0'));

            // keep focus with the menu
            document.addEventListener.apply(this, ['keydown', this.keypressHandler]);
        } else {
            // this.menuButton.focus();
            button.setAttribute('aria-expanded', 'false');
            menu.setAttribute('hidden', 'true');

            // don't make the links focusable if the parent is hidden
            // https://www.w3.org/TR/using-aria/#fourth
            links.forEach(l => l.setAttribute('tabindex', '-1'));

            document.removeEventListener.apply(this, ['keydown', this.keypressHandler]);
        }
    }

    /**
     * Handle keypresses
     * @param {KeyboardEvent} e 
     */
    keypressHandler(e) {

        const { keyCode: key, shiftKey } = e;

        switch (key) {
        // ESC
        case 27:
            this.toggle();
            this.button.focus();
            break;
            // TAB
        case 9:
            e.preventDefault();
            this.updateActiveLinkIndex(shiftKey);
            break;
        }
    }

    /**
     * Flip the state of the menu
     */
    toggle() {
        this.openSvg.classList.toggle('active');
        this.closeSvg.classList.toggle('active');
        this.menu.classList.toggle('show');
        this.attributeHandler();
    }

    /**
     * Add the active class to the active route
     */
    initialiseNavStyles() {        
        const { pathname } = location;
        const { links } = this;

        links.forEach(l => {
            const href = l.getAttribute('href');
            // only add on the root if it matches exactly
            if (href === pathname) {
                l.parentElement.classList.add('active');
                return;
            }
            if (pathname.indexOf(href) > -1 && href !== '/') {
                l.parentElement.classList.add('active');
            }
        });
    }

    /**
     * Update which element should be focused next
     * @param {Boolean} shiftPressed
     */
    updateActiveLinkIndex(shiftPressed) {

        // check if the menu button is the currently focused element
        const onButton = this.shadowRoot.activeElement.nodeName.toLowerCase() === 'button';

        if (onButton) {
            this.activeLinkIndex = shiftPressed
                ? this.links.length - 1
                : 0;
            this.links[this.activeLinkIndex].focus();
            return;
        }

        // update the index up (or down, if shift is pressed)
        shiftPressed ? this.activeLinkIndex-- : this.activeLinkIndex++;

        // if at beginning or end of array the button should be focused to provide an exit!
        if (this.activeLinkIndex < 0 || this.activeLinkIndex >= this.links.length) {
            this.activeLinkIndex = 0;
            this.button.focus();
            return;
        }

        // focus on the new active link
        this.activeLink && this.activeLink.focus();
    }
}

function style() {
    return String.raw`
		nav ul {
            list-style: none;
            margin: 0 auto;
            min-width: var(--measure-width);
        }
        
        nav div:nth-of-type(2) {
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
            max-width: initial;
        }

		nav li {
			margin: 0 auto;
			text-align: right;
			transition: all 0.16s ease-out;
			background-color: initial;
			max-width: var(--measure-width);
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
			width: 1.5ch;
			height: 1.5ch;
			background-color: var(--highlight);
			position: absolute;
			left: .5ch;
            top: .5ch;
            transform: rotate(-30deg);
			transition: all 0.12s ease-out;
		}

		nav li.active a:hover::before,
		nav li.active a:focus::before {
			transform: translateX(-50%) rotate(0deg) scale(0.8);
		}

		nav div.show {
			transition: left 0.25s ease-out;
            left: 0;
		}

		nav div.show li {
			animation-name: list-appear;
			animation-fill-mode: forwards;
			animation-duration: 0.2s;
			animation-timing-function: ease-out;
		}

		nav div.show li:nth-child(1) {
			animation-delay: 0.2s;
		}

		nav div.show li:nth-child(2) {
            animation-delay: 0.3s;
		}

		nav div.show li:nth-child(3) {
			animation-delay: 0.4s;
        }

        nav div.show li:nth-child(4) {
			animation-delay: 0.5s;
        }

		@keyframes list-appear {
			0% {
					margin-right: -30vw;
					opacity: 0;
			}
			100% {
					margin-right: 0;
					opacity: 1;
			}
        }
        /* button styles */
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
        svg.active {
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
        button:focus {
            border: .5ch solid var(--highlight);
            outline: none;
        }
        button:focus > * {
            outline: none;
        }
        
        @media only screen and (max-width: 60rem) {
            button {
                top: initial;
                bottom: 1rem;
            }
        }

        [hidden] > ul {
            display: none;
        }
	`;
}

if ('customElements' in window) {
    customElements.define('slide-menu', SlideMenu);
}

export default SlideMenu;