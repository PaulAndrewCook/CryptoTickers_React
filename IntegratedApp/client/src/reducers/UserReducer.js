const reducer = (state, action) => {
	const newUser = action.payload;
	switch (action.type) {
		case 'LOGIN':
			console.log('in User LOGIN:', state, 'action.payload', action.payload);
			return newUser;
		case 'REGISTER':
			console.log('in reducer: REGISTER', newUser, 'payload', action.payload);
			return newUser;
		case 'LOGOUT':
			console.log('in user reducer: Logout action.payload', action.payload);
			return newUser;
		case 'SET':
			console.log('in user reducer: SET action.payload', action.payload, 'state', state);
			return newUser;
		default:
			return state;
	}
};

export default reducer;
