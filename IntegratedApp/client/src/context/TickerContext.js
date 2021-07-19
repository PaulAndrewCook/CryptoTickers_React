import React, { createContext } from 'react';
import { UseLocalStorageReducer } from '../reducers/UseLocalStorageReducer';
import TickerReducer from '../reducers/TickerReducer';
const DefaultTickers = [
	{
		baseVolume  : 2786.41,
		change      : 455.29,
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
		symbol      : 'DOGE/USD',
		ticker      : 'Dodgecoin',
		time        : '1:55:46 PM MDT',
		__v         : 0,
		_id         : '607a0f5ecf0ac71a285f6c44',
		pinned      : true
	},
	{
		baseVolume  : 2786.41,
		change      : 455.29,
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
		symbol      : 'CELO/USDT',
		ticker      : 'Celo',
		time        : '1:55:46 PM MDT',
		__v         : 0,
		_id         : '607a09d0ca201219560f36d7',
		pinned      : true
	},
	{
		ticker      : 'Ether',
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
		symbol      : 'ETH/USD',
		time        : '1:55:46 PM MDT',
		__v         : 0,
		_id         : '607a0993ca201219560f36d5',
		pinned      : true
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

//API Chnage : switch local storage reducer for APIreducer

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
// export function TickerProvider(props) {
// 	console.log('2. in context props:', props, 'children', props.children);
// 	const [
// 		tickers,
// 		dispatch
// 	] = UseLocalStorageReducer('tickers', DefaultTickers, TickerReducer);
// 	return (
// 		<TickerContext.Provider value={tickers}>
// 			<DispatchContext.Provider value={dispatch}>{props.children}</DispatchContext.Provider>
// 		</TickerContext.Provider>
// 	);
// }
