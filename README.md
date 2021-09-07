# unsplash-search-web-components-example
basic unsplash search implementation with web components using vanillaJS + css bundled with webpack
the idea behinds the web components are encapsulation which done by Shadow DOM. Due to aim of the project was design, i break encapsulation some of the time when accessing shadow dom elements.
Here is the latest information about browser support for Shadow DOM API: 
![Screenshot from 2021-09-07 12-19-42](https://user-images.githubusercontent.com/31393588/132321340-e30c7f87-7707-44cd-ae18-7746e10383c9.png)

## Install
you should have node something v14-15 and git installed in your computer.
- clone the repo
- I didn't remove my unsplash api key you can use it or paste yours inside code https://github.com/halilbrhmtrn/unsplash-search-web-components-example/blob/5ad335e948e02e17dfcd397bb470657f94bf04b0/src/services/unsplash-search.service.js#L4.
- run npm i in order to install dependencies.
- run npm run dev and app should be served at localhost:3000
