import UseLocalStorage from './UseLocalStorage';
import { v4 as uuidv4 } from 'uuid';

const useTickers = (initTickers) => {
	const [
		tickers,
		setTickers
	] = UseLocalStorage('tickers', initTickers);

	return {
		// tickers,
		// addTicker    : (newTickerText) => {
		// 	setTickers([
		// 		...tickers,
		// 		{ id: uuidv4(), key: uuidv4(), ticker: newTickerText, pinned: false }
		// 	]);
		// },
		// //Filter out tickers and remove from storage
		// removeTicker : (tickerId) => {
		// 	const updatedTickers = tickers.filter((tickers) => tickers.id !== tickerId);
		// 	setTickers(updatedTickers);
		// },
		// //change the pinned state of ticker while mapping new tickerlist then set new state
		// pinTicker    : (tickerId) => {
		// 	const updatedTickers = tickers.map(
		// 		(ticker) => (ticker.id === tickerId ? { ...ticker, pinned: true } : ticker)
		// 	);
		// 	setTickers(updatedTickers);
		// },
		// //Open form for ticker, update, and setState
		// //Future call for an updated ticker
		// editTicker   : (tickerId, newTicker) => {
		// 	const updatedTickers = tickers.map(
		// 		(ticker) => (ticker.id === tickerId ? { ...ticker, ticker: newTicker } : ticker)
		// 	);
		// 	setTickers(updatedTickers);
		// }
	};
};

export default useTickers;
