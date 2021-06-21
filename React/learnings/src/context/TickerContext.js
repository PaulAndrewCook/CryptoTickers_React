import React, { createContext } from 'react';
import { UseLocalStorageReducer } from '../hooks/UseLocalStorageReducer';
import TickerReducer from '../reducers/TickerReducer';
import UseTickers from '../hooks/UseTickers';
import { v4 as uuidv4 } from 'uuid';
const DefaultTickers = [
	{
		ticker : 'Bitcoin',
		symbol : 'BTC',
		value  : 34000,
		change : -2500,
		rank   : 1,
		id     : uuidv4(),
		pinned : true
	},
	{
		ticker : 'Ether',
		symbol : 'ETH',
		value  : 2000,
		change : 500,
		rank   : 2,
		id     : uuidv4(),
		pinned : true
	}
];
export const TickerContext = createContext();
export const DispatchContext = createContext();

export function TickerProvider(props) {
	const [
		tickers,
		dispatch
	] = UseLocalStorageReducer('tickers', DefaultTickers, TickerReducer);
	return (
		<TickerContext.Provider value={tickers}>
			<DispatchContext.Provider value={dispatch}>{props.children}</DispatchContext.Provider>
		</TickerContext.Provider>
	);
}
