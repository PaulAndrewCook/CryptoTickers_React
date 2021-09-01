import * as api from '../api/index';
import { v4 as uuidv4 } from 'uuid';

//Curry fns provider to enable subsequent fn calls to ticker dispatch
export const createTicker = (Ticker, user) => async (dispatch) => {
	const ticId = uuidv4();
	Ticker = { symbol: Ticker, ticId, updating: true };
	dispatch({ type: 'LOADING', payload: Ticker });
	const { data } = await api.createTicker(Ticker, user);
	const newTic = { ...data[0], ticId, updating: false };
	dispatch({ type: 'ADD', payload: newTic });
};

export const getTickers = () => async (dispatch) => {
	const { data } = await api.getTickers();
	console.log('in ticker action, get', data);
	dispatch({ type: 'GET', payload: data });
};

export const editTicker = (ticId, Ticker, userId) => async (dispatch) => {
	const ticObj = { symbol: Ticker, id: ticId, updating: true, userId: userId };
	dispatch({ type: 'EDIT', payload: ticObj });
	const { data } = await api.editTicker(ticId, Ticker, userId);
	const newTic = { ...data[0], updating: false };
	console.log('in ticker action, edit, newtic', data);
	dispatch({ type: 'EDIT', payload: newTic });
};

export const deleteTicker = (id, userId) => async (dispatch, userdispatch) => {
	const { data } = await api.deleteTicker(id, userId);
	console.log('in ticker action, delete', data);
	dispatch({ type: 'REMOVE', payload: data });
	userdispatch({ type: 'SET', payload: data });
};

//Update Tickers
export const updateTickers = (Tickers) => async (dispatch) => {
	console.log('in ticker action, update, to api, Tickers', Tickers);
	const { data } = await api.updateTickers(Tickers);
	console.log('in ticker action, update', data);
	dispatch({ type: 'GET', payload: data });
};
