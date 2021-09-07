import html from "./home-page.template.html"
import css from './home-page.styles.css'
import { initShadowDOM, initCollectionsIntoDOM, handleCollectionClickWithPrefix, removeSpinner } from '../../helpers';
import { fetchPhotos } from "../../services/unsplash-search.service";
import { Pages } from '../Pages';


export class HomePage extends HTMLElement {

	constructor() {
		super();
		initShadowDOM(this, html, css);
		initCollectionsIntoDOM(this);
		this.fetchPhotos = fetchPhotos;
	}

	connectedCallback()  {
		super.connectedCallback && super.connectedCallback();
		handleCollectionClickWithPrefix(this, 'home-page');
	}

	disconnectedCallback() {
		
	}

	gotoResultsPage(data) {
		window.setTimeout(() => {removeSpinner(this);}, 17500);
		Pages.Results.state = {photos: data};
		const event = new CustomEvent('ChangePage', {detail: Pages.Results});
		return this.dispatchEvent(event);
	}
}


