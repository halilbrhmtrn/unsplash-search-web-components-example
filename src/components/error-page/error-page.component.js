import html from './error-page.template.html';
import css from './error-page.styles.css';
import { initShadowDOM, initCollectionsIntoDOM, handleCollectionClickWithPrefix } from '../../helpers';
import { Pages } from '../Pages';


export class ErrorPage extends HTMLElement {
    constructor() {
        super();
        initShadowDOM(this, html, css);
        const parent = this.getRootNode().host;
        this.errorMsg = parent.errorMsg || '';
    }
    
    static get observedAttributes() {
        return ["errorMsg"];
    }

    connectedCallback() {
        this.shadowRoot.querySelector('.error-page span').textContent = this.errorMsg;
    }

    disconnectedCallback() {
    }

    attributeChangedCallback(name, oldValue, newValue) {
        this.errorMsg = newValue;
    }

}