import React, { useContext, createContext } from 'react';
import { UseLocalStorageReducer } from '../reducers/UseLocalStorageReducer';
import TickerReducer from '../reducers/TickerReducer';
import { UserContext } from '../context/UserContext';

const DefaultTickers = [
	{
		baseVolume  : 2786.41837401,
		change      : 455.2999999999993,
		close       : 31861.2,
		creator     : '606bdf2554204c4a7270a8bc',
		crypto      : true,
		date        : 'Jul 17, 2021',
		datetime    : '2021-07-17T19:55:46.259Z',
		doNotDelete : false,
		exchange    : 'binance',
		high        : 31967.1,
		last        : 31861.2,
		low         : 31175.2,
		open        : 31405.9,
		percentage  : -11.45,
		reviews     : [],
		symbol      : 'BTC/USDT',
		ticker      : 'Bitcoin',
		time        : '1:55:46 PM MDT',
		__v         : 0,
		_id         : '6100623f0f41c4279a3bb8fa',
		ticId       : '6100623f0f41c4279a3bb8fa',
		pinned      : true
	},
	{
		ticker      : 'Etherium',
		baseVolume  : 2786.41837401,
		change      : 455.2999999999993,
		close       : 31861.2,
		creator     : '606bdf2554204c4a7270a8bc',
		crypto      : true,
		date        : 'Jul 17, 2021',
		datetime    : '2021-07-17T19:55:46.259Z',
		doNotDelete : false,
		exchange    : 'binance',
		high        : 31967.1,
		last        : 31861.2,
		low         : 31175.2,
		open        : 31405.9,
		percentage  : -6.23,
		reviews     : [],
		symbol      : 'ETH/USDT',
		time        : '1:55:46 PM MDT',
		__v         : 0,
		_id         : '6100627c0f41c4279a3bb903',
		ticId       : '6100627c0f41c4279a3bb903',
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
		exchange    : 'binance',
		high        : 31967.1,
		last        : 31861.2,
		low         : 31175.2,
		open        : 31405.9,
		percentage  : -3.75,
		reviews     : [],
		symbol      : 'CELO/USDT',
		ticker      : 'Celo',
		time        : '1:55:46 PM MDT',
		__v         : 0,
		_id         : '607f40501dbc91a96d3b9a6e',
		ticId       : '607f40501dbc91a96d3b9a6e',
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
		exchange    : 'binance',
		high        : 31967.1,
		last        : 31861.2,
		low         : 31175.2,
		open        : 31405.9,
		percentage  : -3.75,
		reviews     : [],
		symbol      : 'DOGE/USDT',
		ticker      : 'Dodgecoin',
		time        : '1:55:46 PM MDT',
		__v         : 0,
		_id         : '610062cc0f41c4279a3bb915',
		ticId       : '610062cc0f41c4279a3bb915',
		pinned      : true
	}
];
export const TickerContext = createContext();
export const DispatchContext = createContext();

//API Chnage : switch local storage reducer for APIreducer

export function TickerProvider(props) {
	const user = useContext(UserContext);
	const defaultTics = user ? user.tickers : DefaultTickers;
	console.log('2. in context user:', user, 'children', user.tickers);
	const [
		tickers,
		dispatch
	] = UseLocalStorageReducer('tickers', defaultTics, TickerReducer);
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
