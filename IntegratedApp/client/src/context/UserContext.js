import React, { createContext } from 'react';
import { UseLocalStorageReducer } from '../reducers/UseLocalStorageReducer';
import UserReducer from '../reducers/UserReducer';
const DefaultUser = {
	_id      : '606bdf2554204c4a7270a8bc',
	username : 'Guest',
	email    : null
};
export const UserContext = createContext();
export const UserDispatchContext = createContext();

export function UserProvider(props) {
	const [
		user,
		userdispatch
	] = UseLocalStorageReducer('user', DefaultUser, UserReducer);
	return (
		<UserContext.Provider value={user}>
			<UserDispatchContext.Provider value={userdispatch}>{props.children}</UserDispatchContext.Provider>
		</UserContext.Provider>
	);
}
