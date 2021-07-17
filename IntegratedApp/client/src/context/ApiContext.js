import React, { createContext } from 'react';
import { UseLocalStorageReducer } from '../_reducers/UseLocalStorageReducer';
import TickerReducer from '../_reducers/TickerReducer';
import { v4 as uuidv4 } from 'uuid';
const DefaultTickers = [
	{
		ticker  : 'Bitcoin',
		symbol  : 'BTC',
		value   : 34000,
		change  : -2500,
		percent : -2.56,
		index   : 1,
		ticId   : uuidv4(),
		id      : 2,
		pinned  : true
	},
	{
		ticker  : 'Ether',
		symbol  : 'ETH',
		value   : 2000,
		change  : 500,
		percent : 25.81,
		index   : 2,
		ticId   : uuidv4(),
		id      : 1,
		pinned  : true
	}
];
export const TickerContext = createContext();
export const DispatchContext = createContext();

export function TickerProvider(props) {
	console.log('2. in context props:', props, 'children', props.children);
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
