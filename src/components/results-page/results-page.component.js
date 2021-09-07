import html from "./results-page.template.html";
import css from "./results-page.styles.css";
import {
  initShadowDOM,
  initCollectionsIntoDOM,
  handleCollectionClickWithPrefix,
} from "../../helpers";
import { Pages } from "../Pages";
import { fetchPhotos } from "../../services/unsplash-search.service";

export class ResultsPage extends HTMLElement {
  constructor() {
    super();
    initShadowDOM(this, html, css);
    this.fetchPhotos = fetchPhotos;
    const parent = this.getRootNode().host;
  }
  static get observedAttributes() {
    return ["photos"];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this.photos = JSON.parse(newValue);
  }

  connectedCallback() {

  }

  disconnectedCallback() {}

}
