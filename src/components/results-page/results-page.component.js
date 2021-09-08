import html from './results-page.template.html'
import css from './results-page.styles.css'
import { initShadowDOM } from '../../helpers'
import { fetchPhotos } from '../../services/unsplash-search.service'

export default class ResultsPage extends HTMLElement {
    constructor() {
        super()
        initShadowDOM(this, html, css)
        this.fetchPhotos = fetchPhotos
    }

    static get observedAttributes() {
        return ['photos']
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'photos') this.photos = JSON.parse(newValue)
    }
}
