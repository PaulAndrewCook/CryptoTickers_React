import { v4 as uuidv4 } from 'uuid';

const reducer = (state, action) => {
	console.log('3. in reducer:', state);
	switch (action.type) {
		case 'ADD':
			return [
				...state,
				{ ticId: uuidv4(), key: uuidv4(), id: state.length + 1, ticker: action.ticker, pinned: false }
			];
		case 'REMOVE':
			return state.filter((ticker) => ticker.ticId !== action.ticId);
		case 'PINTICKER':
			return state.map((ticker) => (ticker.ticId === action.ticId ? { ...ticker, pinned: true } : ticker));
		case 'EDIT':
			return state.map(
				(ticker) => (ticker.ticId === action.ticId ? { ...ticker, ticker: action.newTicker } : ticker)
			);
		default:
			return state;
	}
};

export default reducer;
