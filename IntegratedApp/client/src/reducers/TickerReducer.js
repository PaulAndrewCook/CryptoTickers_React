import { v4 as uuidv4 } from 'uuid';

const reducer = (state, action) => {
	const newTics = action.payload.ticker;
	console.log('3. in reducer: payload', action.payload.ticker, 'newTics', newTics);

	switch (action.type) {
		case 'ADD':
			return [
				...state, newTics];
				state.map((tic) => (
					{key    : uuidv4(),
					id     : state.length + 1,
					ticker : action.ticker,
					symbol : action.symbol,
					crypto : action.crypto,
					pinned : false
					})
			];
		case 'GET':
			return (state = action.payload.ticker);
		case 'REMOVE':
			return state.filter((ticker) => ticker.ticId !== action.ticId);
		case 'PINTICKER':
			return state.map((ticker) => (ticker.ticId === action.ticId ? { ...ticker, pinned: true } : ticker));
		case 'EDIT':
			return state.map(
				(ticker) => (ticker.ticId === action.ticId ? { ...ticker, ticker: action.newTicker } : ticker)
			);
		case 'DATE':
			console.log('in reducer, event', action.range);
			return state;
		default:
			return state;
	}
};

export default reducer;
