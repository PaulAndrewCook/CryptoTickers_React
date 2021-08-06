const reducer = (state, action) => {
	var newSnack = action.payload;
	console.log('in snack reducer', newSnack, ' payload', action.payload);
	switch (action.type) {
		case 'LOGIN':
			console.log('in User LOGIN:', state, 'action.payload', action.payload);
			return (newSnack = `Welcome to CryptoTickers!`);
		case 'REGISTER':
			console.log('in reducer: REGISTER', newSnack, 'payload', action.payload);
			return (newSnack = `Welcome to CryptoTickers!`);
		case 'ADD':
			console.log('in reducer: Logout action.payload', action.payload);
			return (newSnack = `Ticker Added!`);
		case 'UPDATE':
			console.log('in reducer: Logout action.payload', action.payload);
			return (newSnack = `Ticker Updated!`);
		case 'DELETE':
			console.log('in reducer: SET action.payload', action.payload);
			return (newSnack = `Ticker Deleted!`);
		default:
			return state;
	}
};

export default reducer;
