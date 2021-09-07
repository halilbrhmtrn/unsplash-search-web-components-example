import html from "./page-router.html";
import css from "./page-router.css";
import { initShadowDOM } from "../../helpers";
import { Pages } from "../Pages";

export class PageRouter extends HTMLElement {
  constructor() {
    super();
    initShadowDOM(this, html, css);
    let _currentPage;
    let _defaultPage = Pages.Home;
    this.setCurrentPage = (currentPage) => {
      _currentPage = currentPage;
    };
    this.setDefaultPage = (defaultPage) => {
      _defaultPage = defaultPage;
    };
    this.getCurrentPage = () => {
      return _currentPage;
    };
    this.getDefaultPage = () => {
      return _defaultPage;
    };
  }

  connectedCallback() {
    const pageAccessedByReload =
      (window.performance.navigation &&
        window.performance.navigation.type === 1) ||
      window.performance
        .getEntriesByType("navigation")
        .map((nav) => nav.type)
        .includes("reload");
    if (pageAccessedByReload) window.location.href = "/";
    this.setCurrentPage(getCurrentPageFromUrl.bind(this)());
    renderCorrectPage.bind(this)();

    window.onerror = (message, file, line) => {
      console.log(
        "Unsplash Search Client :" +
          "An error occured at line " +
          line +
          " of " +
          file +
          ": " +
          message
      );
      Pages.Error.state.errorMsg = message;
      gotoNewPage.bind(this)(Pages.Error);
    };
    window.addEventListener("popstate", (event) => {
      if (event.state) {
        this.setCurrentPage(event.state);
      } else {
        this.setCurrentPage(this.getDefaultPage());
      }
      renderCorrectPage.bind(this)();
    });
    window.onclick = (event) => {
      if (
        document.querySelector("page-router") &&
        document.querySelector("page-router").shadowRoot &&
        document.querySelector("page-router").shadowRoot.children[1] &&
        document.querySelector("page-router").shadowRoot.children[1]
          .shadowRoot &&
        document.querySelector("page-router").shadowRoot.children[1].shadowRoot
          .children[2].shadowRoot
      ) {
        const parentRoot =
          document.querySelector("page-router").shadowRoot.children[1]
            .shadowRoot.children[2].shadowRoot;
        if (parentRoot) {
          const modalElement = parentRoot.querySelector("detail-modal");
          if (
            modalElement &&
            window.getComputedStyle(modalElement).display !== "none" &&
            !event.path.includes(modalElement)
          ) {
            parentRoot.removeChild(modalElement);
            document.body.cssText = "";
            parentRoot.host.parentNode.children[1].shadowRoot.querySelector(
              "div"
            ).style.cssText = "";
            parentRoot.host.shadowRoot.querySelector(
              ".masonry-container"
            ).style.cssText = "";
          }
        }
      }
    };
  }
}
function getCurrentPageFromUrl() {
  for (const current in Pages) {
    if (Pages[current].path === window.location.pathname) {
      return Pages[current];
    }
  }
  return this.getDefaultPage();
}
function gotoNewPage(newPage) {
  this.setCurrentPage(newPage);
  addCurrentPageToHistory.bind(this)();
  renderCorrectPage.bind(this)();
}

function addCurrentPageToHistory() {
  history.pushState(
    this.getCurrentPage(),
    this.getCurrentPage().title,
    window.location.origin + this.getCurrentPage().path
  );
}
function renderCorrectPage() {
  const elementId = "CurrentPage";
  const prevPage = this.shadowRoot.getElementById(elementId);
  if (prevPage) {
    this.shadowRoot.removeChild(prevPage);
  }

  const newPage = document.createElement(this.getCurrentPage().component);
  let { state } = this.getCurrentPage();
  if (state) {
    for (const key in state) {
      newPage.setAttribute(key, JSON.stringify(state[key]));
    }
  }
  newPage.id = elementId;
  newPage.addEventListener("ChangePage", (event) => {
    gotoNewPage.bind(this)(event.detail);
  });
  this.shadowRoot.appendChild(newPage);

  const title = this.getCurrentPage().title;
  document.title = title;
}
