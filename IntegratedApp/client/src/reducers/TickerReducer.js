const reducer = (state, action) => {
	var newTic = action.payload;
	switch (action.type) {
		case 'LOADING':
			return [
				...state,
				action.payload
			];
		case 'ADD':
			return state.map((ticker) => (ticker._id === newTic.id ? newTic : ticker));
		case 'GET':
			const filtered = state.filter(Boolean);
			return filtered;
		// return action.payload;
		case 'UPDATE':
			console.log('in tickerReducer, UPDATE, incoming data', newTic, 'state', state);
			return action.payload;
		case 'SET':
			return action.payload.tickers;
		case 'REMOVE':
			const tickers = state.filter((ticker) => ticker._id !== newTic);
			console.log('in tickerReducer, incoming data', newTic, 'post delete tickers', tickers, 'state', state);
			return state.filter((ticker) => ticker._id !== newTic);
		case 'PINTICKER':
			return state.map((ticker) => (ticker._id === action.id ? { ...ticker, pinned: true } : ticker));
		case 'EDIT':
			return state.map((ticker) => (ticker._id === newTic.id ? newTic : ticker));

		case 'DATE':
			return state;
		default:
			return state;
	}
};

export default reducer;
