const reducer = (state, action) => {
	var newTic = action.payload;
	console.log('in ticker reducer, incoming data', newTic, 'Remove', newTic._id, 'state', state);
	switch (action.type) {
		case 'LOADING':
			return [
				...state,
				action.payload
			];
		case 'ADD':
			return state.map((ticker) => (ticker._id === newTic.id ? newTic : ticker));
		case 'GET':
			const filtered = newTic.filter(Boolean);
			console.log('in ticker reducer, Get, filtered', filtered);
			return filtered;
		// return action.payload;
		case 'SET':
			return action.payload.tickers;
		case 'REMOVE':
			const removeTic = action.payload;
			return state.filter((ticker) => ticker._id !== removeTic);
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
