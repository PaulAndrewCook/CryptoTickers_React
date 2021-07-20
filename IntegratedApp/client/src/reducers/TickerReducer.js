const reducer = (state, action) => {
	const newTics = action.payload;
	console.log('in reducer: payload', action.payload, 'newTics', newTics);

	switch (action.type) {
		case 'ADD':
			return [
				...state,
				newTics
			];
		case 'GET':
			return action.payload;
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
