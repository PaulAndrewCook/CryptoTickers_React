import { v4 as uuidv4 } from 'uuid';

const reducer = (state, action) => {
	switch (action.type) {
		case 'ADD':
			return [
				...state,
				{ id: uuidv4(), key: uuidv4(), ticker: action.ticker, pinned: false }
			];
		case 'REMOVE':
			return state.filter((tickers) => tickers.id !== action.id);
		case 'PINTICKER':
			return state.map((ticker) => (ticker.id === action.id ? { ...ticker, pinned: true } : ticker));
		case 'EDIT':
			return state.map((ticker) => (ticker.id === action.id ? { ...ticker, ticker: action.newTicker } : ticker));
		default:
			return state;
	}
};

export default reducer;

// tickers,
// addTicker: newTickerText => {
//     setTickers([
//         ...tickers,
//         { id: uuidv4(), key: uuidv4(), ticker: newTickerText, pinned: false }
//     ]);
// },

// //Filter out tickers and remove from storage
// removeTicker : (tickerId) => {
//     const updatedTickers = tickers.filter((tickers) => tickers.id !== tickerId);
//     setTickers(updatedTickers);
// },
// //change the pinned state of ticker while mapping new tickerlist then set new state
// pinTicker    : (tickerId) => {
//     const updatedTickers = tickers.map(
//         (ticker) => (ticker.id === tickerId ? { ...ticker, pinned: true } : ticker)
//     );
//     setTickers(updatedTickers);
// },
// //Open form for ticker, update, and setState
// //Future call for an updated ticker
// editTicker   : (tickerId, newTicker) => {
//     const updatedTickers = tickers.map(
//         (ticker) => (ticker.id === tickerId ? { ...ticker, ticker: newTicker } : ticker)
//     );
//     setTickers(updatedTickers);
// }
