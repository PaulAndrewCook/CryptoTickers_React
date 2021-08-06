import axios from 'axios';

//api endpoint
const url = 'http://localhost:8000/investments/api';

//export fns for CRUD heading to API endpoint via axios calls
export const createTicker = (ticker, user) => {
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
};

export const deleteTicker = (id, userId) => {
	return axios.delete(url, { params: { id, userId } });
};

export const updateTickers = (tickers) => {
	const url = 'http://localhost:8000/investments/APIupdateTics';
	return axios.get(url, { params: { tickers: tickers } });
};
