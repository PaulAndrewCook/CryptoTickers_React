import axios from 'axios';

// const url = 'http://localhost:8000/investments/';
const url = 'http://localhost:8000/investments/api';

//if adding in the console.log make sure to include the return call

export const createTicker = (ticker, user) => {
	console.log('axios post: url', url, 'ticker', ticker, 'user', user);
	return axios.post(
		url,
		{ headers: { 'Content-Type': 'application/json' } },
		{ params: { ticker: ticker, user: user } }
	);
};
export const getTickers = () => {
	console.log('axios get: url', url);
	return axios.get(url);
};
export const editTicker = (id, ticker) => {
	return axios.patch(url, { headers: { 'Content-Type': 'application/json' } }, { params: { id, ticker } });
	// export const editTicker = (id, ticker) => axios.patch(`${url}/${id}`, ticker);
};

export const deleteTicker = (id, userId) => {
	return axios.delete(url, { params: { id, userId } });
};

export const updateTickers = (tickers) => {
	const url = 'http://localhost:8000/investments/APIupdateTics';
	console.log('axios get: url', url, 'tickers', tickers);
	return axios.get(url, { params: { tickers: tickers } });
};
