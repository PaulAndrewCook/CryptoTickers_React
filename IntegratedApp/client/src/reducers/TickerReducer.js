import { v4 as uuidv4 } from 'uuid';

const reducer = (state, action, payload) => {
	console.log('3. in reducer: payload', action.payload.ticker, 'action', action.type);
	switch (action.type) {
		case 'ADD':
			return [
				...state,
				{
					ticId  : uuidv4(),
					key    : uuidv4(),
					id     : state.length + 1,
					ticker : action.ticker,
					symbol : action.symbol,
					crypto : action.crypto,
					pinned : false
				}
			];
		case 'GET':
			return action.payload.ticker;
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
