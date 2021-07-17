import * as api from '../api/index';

export const createTicker = (Ticker) => async (dispatch) => {
	console.log('apitickerfns createTicker called', Ticker);
	const { data } = await api.createTicker(Ticker);
	dispatch({ type: 'ADD', payload: data });
};

export const getTickers = () => async (dispatch) => {
	console.log('apitickerfns getTicker called');
	const { data } = await api.getTickers();
	console.log('apitickerfns getTicker returned', data);
	dispatch({ type: 'GET', payload: data });
};

export const updateTicker = (id, Ticker) => async (dispatch) => {
	const { data } = await api.updateTicker(id, Ticker);
	dispatch({ type: 'UPDATE', payload: data });
};
export const deleteTicker = (id) => async (dispatch) => {
	const { data } = await api.deleteTicker(id);
	dispatch({ type: 'DELETE', payload: data });
};
