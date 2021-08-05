import * as user from '../api/user';

export const loginUser = (User) => async (userdispatch, dispatch) => {
	console.log('userAction LOGIN called');
	const { data } = await user.loginUser(User);
	console.log('userAction login returned', data);
	userdispatch({ type: 'LOGIN', payload: data });
	console.log('userAction userdispatch returned');
	dispatch({ type: 'SET', payload: data });
};

export const registerUser = (User) => async (userdispatch, dispatch) => {
	const { data } = await user.registerUser(User);
	console.log('userAction register returned', data);
	userdispatch({ type: 'REGISTER', payload: data });
	dispatch({ type: 'SET', payload: data });
};

export const logoutUser = (User) => async (userdispatch, dispatch) => {
	const { data } = await user.logoutUser(User);
	console.log('userAction logut returned', data);
	userdispatch({ type: 'LOGOUT', payload: data });
	dispatch({ type: 'SET', payload: data });
};
