const reducer = (state, action) => {
	const newTic = action.payload;
	switch (action.type) {
		case 'LOADING':
			console.log('in reducer: Loading state:', state, 'action.payload', action.payload);
			return [
				...state,
				action.payload
			];
		case 'ADD':
			console.log('in reducer: ADD newtics', newTic, 'payload', action.payload);
			return state.map((ticker) => (ticker._id === newTic.id ? newTic : ticker));
		case 'GET':
			console.log('in reducer: GET action.payload', action.payload);
			return action.payload;
		case 'REMOVE':
			console.log('in reducer: Remove id', action.id);
			return state.filter((ticker) => ticker._id !== action.id);
		case 'PINTICKER':
			return state.map((ticker) => (ticker._id === action.id ? { ...ticker, pinned: true } : ticker));
		case 'EDIT':
			console.log('in reducer: EDIT newtics', newTic, 'id', newTic.id, 'payload', action.payload, 'state', state);
			return state.map((ticker) => (ticker._id === newTic.id ? newTic : ticker));
		// return state.map(
		// 	(ticker) =>
		// 		ticker.id === action.id ? { ...ticker, ticker: action.newTicker, updating: false } : ticker
		// );
		case 'DATE':
			console.log('in reducer, event', action.range);
			return state;
		default:
			return state;
	}
};

export default reducer;
