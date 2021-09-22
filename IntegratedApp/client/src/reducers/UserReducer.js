const reducer = (state, action) => {
	const newUser = action.payload.user;
	console.log('in user reducer, state', state, ' user', newUser);
	switch (action.type) {
		case 'LOGIN':
			console.log('in User LOGIN:', state, 'action.payload', action.payload);
			return newUser;
		case 'REGISTER':
			console.log('in reducer: REGISTER', newUser, 'payload', action.payload);
			return newUser;
		case 'LOGOUT':
			console.log('in reducer: Logout action.payload', action.payload);
			return newUser;
		case 'SET':
			console.log('in reducer: SET action.payload', action.payload);
			return newUser;
		default:
			return state;
	}
};

export default reducer;
