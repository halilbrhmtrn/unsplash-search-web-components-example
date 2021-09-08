/* eslint-disable no-console */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-param-reassign */
/* eslint-disable no-use-before-define */
import Pages from './components/Pages'

export const initShadowDOM = (element, html, css) => {
    const shadow = element.attachShadow({ mode: 'open' })
    const template = document.createElement('template')
    template.innerHTML = `<style>@import "styles.css";${css}</style>${attachCallbacks(
        html,
        element
    )}`
    const templateContent = template.content
    shadow.appendChild(templateContent.cloneNode(true))
}

const attachCallbacks = (html, element) => {
    const lastId = Window.lastComponentId ? Window.lastComponentId : 0
    const componentId = lastId + 1
    Window.lastComponentId = componentId

    const componentName = `component${componentId}`
    Window[componentName] = element

    let returnedHTML = html.replaceAll('this.', `Window.${componentName}.`)

    // build a regex called 'regex2' that matches any string starts with 'Window.' then any number of any character and not ends with one of the following special characters: '>', '\', '/', '"', ''''
    const regex2 = new RegExp(/Window\.[^\s>\\\/\'\"]+/g)

    const matches = returnedHTML.match(regex2)
    if (matches) {
        // eslint-disable-next-line no-eval
        const evaledMatches = matches.map((match) => eval(match))
        returnedHTML = returnedHTML.replace(regex2, () => evaledMatches.shift())
    }
    return returnedHTML
}
const collections = [
    { name: 'Wallpapers', id: 1065976, value: 1 },
    { name: 'Nature', id: 327760, value: 2 },
    { name: 'Textures & Patterns', id: 3330445, value: 3 },
    { name: 'Architecture', id: 3348849, value: 4 },
]

const getCollectionsOptionsHTML = () => {
    let html = ''
    collections.forEach((collection) => {
        html += `<li id=${collection.id} value="${collection.value}">${collection.name}</li>`
    })
    return html
}

export const initCollectionsIntoDOM = (element) => {
    const collectionOptions = getCollectionsOptionsHTML()
    element.shadowRoot.querySelector('.collections').innerHTML =
        collectionOptions
}

export const handleCollectionClickWithPrefix = (element, prefix) => {
    try {
        const { shadowRoot } = element
        const find = shadowRoot.querySelector.bind(shadowRoot)
        const findAll = shadowRoot.querySelectorAll.bind(shadowRoot)
        const searchForm = find(`.${prefix}-search-form`)
        const listItems = findAll(`.${prefix}-dropdown-container li`)
        const selectedItemOnLabel = find(`.${prefix}-dropdown-container label`)
        const dropdownContainer = find(`.${prefix}-dropdown-container`)
        const dropdownContainerList = find(`.${prefix}-dropdown-container ul`)
        const collectionInput = find('#collection')
        let elmHided
        ;[].forEach.call(listItems, (item) => {
            item.addEventListener('click', () => {
                if (elmHided) {
                    elmHided.style.display = 'block'
                }
                if (find(`.${prefix}-dropdown-container .selected`))
                    find(
                        `.${prefix}-dropdown-container .selected`
                    ).classList.remove('selected')
                if (find(`.${prefix}-dropdown-container label .selected`))
                    find(
                        `.${prefix}-dropdown-container label .selected`
                    ).classList.remove('selected')
                selectedItemOnLabel.textContent = item.getAttribute('value')
                selectedItemOnLabel.classList.add('selected')
                item.classList.add('selected')
                elmHided = item
                item.style.display = 'none'
                dropdownContainerList.style.display = 'none'
                selectedItemOnLabel.textContent = item.textContent
                collectionInput.value = selectedItemOnLabel.textContent
            })
        })
        selectedItemOnLabel.addEventListener('click', () => {
            !(window.getComputedStyle(dropdownContainerList).display === 'none')
                ? (dropdownContainerList.style.display = 'none')
                : (dropdownContainerList.style.display = 'block')
            selectedItemOnLabel.textContent = 'Collections'
            selectedItemOnLabel.classList.remove('selected')
            if (elmHided) {
                elmHided.style.display = 'block'
            }
            if (dropdownContainer.classList.contains('add-after')) {
                dropdownContainer.classList.remove('add-after')
                dropdownContainer.classList.add('no-after')
            } else {
                dropdownContainer.classList.remove('no-after')
                dropdownContainer.classList.add('add-after')
            }
            collectionInput.value = selectedItemOnLabel.textContent
        })

        searchForm.onsubmit = (e) => {
            e.preventDefault()
            const urlParams = {
                ...serializeForm(new FormData(searchForm)),
                page: 1,
                per_page: 30,
            }
            addSpinner(element)
            element
                .fetchPhotos(urlParams)
                .then((res) => {
                    console.log(res)
                    return element.gotoResultsPage(res.results)
                })
                .catch((err) => {
                    console.log(err)
                })
        }
    } catch (err) {
        console.log(err)
        gotoErrorPage(element, err)
    }
}
export const gotoErrorPage = (element, errorMsg) => {
    Pages.Error.state = { errorMsg }
    const event = new CustomEvent('ChangePage', { detail: Pages.Error })
    return element.dispatchEvent(event)
}

const addSpinner = (element) => {
    try {
        element.shadowRoot.querySelector('.spinner').style.display = 'block'
        element.shadowRoot.querySelector('.spinner img').style.display = 'block'
        element.shadowRoot.querySelector('.spinner img').classList.add('spin')
        if (element.nextElementSibling)
            element.nextElementSibling.style.display = 'none'
    } catch (err) {
        console.log(err)
        gotoErrorPage(element, err)
    }
}
export function removeSpinner(element) {
    try {
        element.shadowRoot.querySelector('.spinner').style.display = 'none'
        element.shadowRoot.querySelector('.spinner img').style.display = 'none'
        if (element.nextElementSibling)
            element.nextElementSibling.style.display = 'block'
    } catch (err) {
        console.log(err)
        gotoErrorPage(element, err)
    }
}
const serializeForm = (data) => {
    const obj = {}
    // eslint-disable-next-line no-restricted-syntax
    for (const [key, value] of data) {
        if (obj[key] !== undefined) {
            if (!Array.isArray(obj[key])) {
                obj[key] = [obj[key]]
            }
            obj[key].push(value)
        } else {
            obj[key] = value
        }
    }
    return obj
}
