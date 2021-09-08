import html from './modal.template.html'
import css from './modal.styles.css'
import { initShadowDOM } from '../../../helpers'

export default class Modal extends HTMLElement {
    constructor() {
        super()
        initShadowDOM(this, html, css)
    }
}
