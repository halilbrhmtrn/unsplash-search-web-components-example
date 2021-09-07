

import { gotoErrorPage } from '../helpers';
const API_ACCESS_KEY = '0PlNJTj3SnbQl2V-dvYA63oszk5jU1b0Di9V1jIijZk';

async function search(urlParams) {
	urlParams.query = urlParams.query === 'query' ? '': urlParams.query;
	const serializedUrlParams = new URLSearchParams(urlParams);
	const endpoint = `https://api.unsplash.com/search/photos?query=${serializedUrlParams}&client_id=${API_ACCESS_KEY}`; 
	const response = await fetch(endpoint);
	if (!response.ok) {
		throw Error(response.statusText);
	}
	const json = await response.json();
	localStorage.setItem(
		JSON.stringify(urlParams),
		JSON.stringify(json)
	);
	return json;
}

function fetchFromCache(urlParams) {
	let resp = localStorage.getItem(JSON.stringify(urlParams));
	if (resp) {
		resp = JSON.parse(resp);
		console.log('cached value returned!');
		return resp;
	} else {
		console.log('No cached value');
		return null;
	}
};

export async function fetchPhotos(urlParams) {
		try {
			const cachedResults = fetchFromCache(urlParams);
			if(cachedResults)
				return cachedResults;
			const results = await search(urlParams);

			return results;
		} catch(err) {
			console.log(err);
			gotoErrorPage(error);
		}
	}


