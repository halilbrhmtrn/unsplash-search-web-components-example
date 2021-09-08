/* eslint-disable no-param-reassign */
/* eslint-disable no-console */
/* eslint-disable no-plusplus */
import html from './masonry-grid.template.html'
import css from './masonry-grid.styles.css'
import { initShadowDOM, gotoErrorPage } from '../../../helpers'

export default class MasonryGrid extends HTMLElement {
    constructor() {
        super()
        const parent = this.getRootNode().host
        this.photos = parent.photos
        this.numberOfPhotos = this.photos.length
        this.numberPerPage = 9
        this.currentPage = 1
        this.numberOfPages = Math.ceil(this.numberOfPhotos / this.numberPerPage)
        this.images = []

        initShadowDOM(this, html, css)
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'photos') this.photos = JSON.parse(newValue)
    }

    connectedCallback() {
        try {
            const prevButton = this.shadowRoot.querySelector('.prev-btn')
            const nextButton = this.shadowRoot.querySelector('.next-btn')
            this.updateButtonState(prevButton, nextButton)
            this.render()

            prevButton.addEventListener('click', () => {
                if (this.currentPage > 1) {
                    this.currentPage--
                    this.updateButtonState(prevButton, nextButton)
                }
                this.render()
                this.images = this.shadowRoot.querySelectorAll('img')
            })
            nextButton.addEventListener('click', () => {
                if (this.currentPage < this.numberOfPages) {
                    this.currentPage++
                    this.updateButtonState(prevButton, nextButton)
                }
                this.render()
                this.images = this.shadowRoot.querySelectorAll('img')
            })
        } catch (error) {
            console.log(error)
            gotoErrorPage(this, error)
        }
    }

    updateButtonState(prevButton, nextButton) {
        if (this.currentPage > 1) {
            prevButton.disabled = false
            if (this.currentPage < this.numberOfPages)
                nextButton.disabled = false
            else nextButton.disabled = true
        } else {
            prevButton.disabled = true
            if (this.currentPage < this.numberOfPages)
                nextButton.disabled = false
            else nextButton.disabled = true
        }
    }

    render() {
        try {
            const figures = this.shadowRoot.querySelectorAll('figure')
            const photosHTML = this.paginate(this.currentPage)
            figures.forEach((figure, index) => {
                figure.innerHTML = photosHTML[index]
            })
            this.images = this.shadowRoot.querySelectorAll('img')
            ;[].forEach.call(this.images, (element) => {
                element.addEventListener(
                    'click',
                    (e) => {
                        this.handleClick(element)
                        e.stopPropagation()
                    },
                    true
                )
            })
        } catch (error) {
            console.log(error)
            gotoErrorPage(this, error)
        }
    }

    // eslint-disable-next-line consistent-return
    paginate(currentPage) {
        try {
            const startIndex = (currentPage - 1) * this.numberPerPage
            const endIndex = startIndex + this.numberPerPage

            const photos = this.photos.slice(startIndex, endIndex)
            const photosHTML = photos.map(
                (photo) => `
          <img src="${photo.urls.small}" alt="${photo.alt_description}">
        `
            )
            return photosHTML
        } catch (error) {
            console.log(error)
            gotoErrorPage(this, error)
        }
    }

    handleClick(photo) {
        try {
            const modalElement = document.createElement('detail-modal')
            modalElement.shadowRoot.querySelector(
                '.modal-container'
            ).style.display = 'block'
            modalElement.shadowRoot.querySelector('img').src = photo.src
            modalElement.shadowRoot.querySelector('img').alt = photo.alt
            this.shadowRoot.appendChild(modalElement)
            document.body.cssText =
                'background: #050417CC; filter: blur(2px); -webkit-filter: blur(2px);'
            this.shadowRoot.host.parentNode.children[1].shadowRoot.querySelector(
                'div'
            ).style.cssText =
                'background: #050417CC; filter: blur(2px); -webkit-filter: blur(2px);'
            this.shadowRoot.host.shadowRoot.querySelector(
                '.masonry-container'
            ).style.cssText =
                'background: #050417BB; filter: blur(4px); -webkit-filter: blur(4px);'
        } catch (error) {
            console.log(error)
            gotoErrorPage(this, error)
        }
    }
}
