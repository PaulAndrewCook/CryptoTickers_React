//Reducer function to set snackbar message
const reducer = (state, action) => {
	var newSnack = action.payload;
	switch (action.type) {
		case 'LOGIN':
			return (newSnack = `Welcome to CryptoTickers!`);
		case 'REGISTER':
			return (newSnack = `Welcome to CryptoTickers!`);
		case 'ADD':
			return (newSnack = `Ticker Added!`);
		case 'UPDATE':
			return (newSnack = `Ticker Updated!`);
		case 'DELETE':
			return (newSnack = `Ticker Deleted!`);
		default:
			return state;
	}
};

export default reducer;
