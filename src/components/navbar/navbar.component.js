import { initShadowDOM, initCollectionsIntoDOM, handleCollectionClickWithPrefix, removeSpinner } from '../../helpers';
import html from './navbar.template.html';
import css from './navbar.styles.css';
import { Pages } from '../Pages';
import { fetchPhotos } from "../../services/unsplash-search.service";



export class Navbar extends HTMLElement {

    constructor() {
        super();
        initShadowDOM(this, html, css);
        initCollectionsIntoDOM(this);
        this.fetchPhotos = fetchPhotos;
        this.parent = this.getRootNode().host;
    }

    connectedCallback() {
        super.connectedCallback && super.connectedCallback();
		handleCollectionClickWithPrefix(this, 'navbar');
    }

    disconnectedCallback() {

    }

    gotoResultsPage(data) {
		window.setTimeout(() => {removeSpinner(this);}, 17500);
		Pages.Results.state = {photos: data};
		const event = new CustomEvent('ChangePage', {detail: Pages.Results });
		return this.parent.dispatchEvent(event);
	}

}