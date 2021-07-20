import axios from 'axios';

// const url = 'http://localhost:8000/investments/';
const url = 'http://localhost:8000/investments/api';

//if adding in the console.log make sure to include the return call

export const createTicker = (ticker) => {
	console.log('axios get: url', url);
	return axios.post(url, ticker);
};
export const getTickers = () => {
	console.log('axios get: url', url);
	return axios.get(url);
};
export const editTicker = (id, ticker) => axios.patch(`${url}/${id}`, ticker);
export const deleteTicker = (id) => axios.delete(`${url}/${id}`);

export const updateTickers = (tickers) => {
	const url = 'http://localhost:8000/investments/APIupdateTics';
	console.log('axios get: url', url, 'tickers', tickers);
	return axios.get(url, { params: { tickers: tickers } });
};
