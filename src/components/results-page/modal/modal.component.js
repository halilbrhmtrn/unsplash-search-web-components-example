import html from './modal.template.html';
import css from './modal.styles.css';
import { initShadowDOM, initCollectionsIntoDOM, handleCollectionClickWithPrefix } from '../../../helpers';
import { Pages } from '../../Pages';


export class Modal extends HTMLElement {
    constructor() {
        super();
        initShadowDOM(this, html, css);
        
    }

    connectedCallback() {
        
    }

    disconnectedCallback() {
    }

    attributeChangedCallback(name, oldValue, newValue) {
    }

    
}