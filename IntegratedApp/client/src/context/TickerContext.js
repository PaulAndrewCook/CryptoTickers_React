import React, { createContext } from 'react';
import { UseLocalStorageReducer } from '../reducers/UseLocalStorageReducer';
import TickerReducer from '../reducers/TickerReducer';
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
	},
	{
		baseVolume  : 2786.41837401,
		change      : 455.2999999999993,
		close       : 31861.2,
		creator     : '606bdf2554204c4a7270a8bc',
		crypto      : true,
		date        : 'Jul 17, 2021',
		datetime    : '2021-07-17T19:55:46.259Z',
		doNotDelete : false,
		exchange    : 'kraken',
		high        : 31967.1,
		last        : 31861.2,
		low         : 31175.2,
		open        : 31405.9,
		percentage  : null,
		reviews     : [],
		symbol      : 'BTC/USD',
		ticker      : 'Bitcoin',
		time        : '1:55:46 PM MDT',
		__v         : 0,
		_id         : '607a0941ca201219560f36d3',
		pinned      : true
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
