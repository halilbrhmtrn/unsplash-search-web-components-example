import PageRouter from './components/page-router/page-router'
import HomePage from './components/home-page/home-page.component'
import ErrorPage from './components/error-page/error-page.component'
import Modal from './components/results-page/modal/modal.component'
import MasonryGrid from './components/results-page/masonry-grid/masonry-grid.component'
import ResultsPage from './components/results-page/results-page.component'
import Navbar from './components/navbar/navbar.component'

customElements.define('page-router', PageRouter)
customElements.define('home-page', HomePage)
customElements.define('error-page', ErrorPage)
customElements.define('detail-modal', Modal)
customElements.define('masonry-grid', MasonryGrid)
customElements.define('search-results-page', ResultsPage)
customElements.define('sticky-navbar', Navbar)
