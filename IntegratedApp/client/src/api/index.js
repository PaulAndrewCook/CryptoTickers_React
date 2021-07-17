import axios from 'axios';

// const url = 'http://localhost:8000/investments/';
const url = 'http://localhost:8000/investments/APIindex';

export const createTicker = (ticker) => axios.post(url, ticker);
export const getTickers = () => {
	console.log('axios call in index getTickers called: url', url);
	return axios.get(url);
};
export const updateTicker = (id, ticker) => axios.patch(`${url}/${id}`, ticker);
export const deleteTicker = (id) => axios.delete(`${url}/${id}`);
