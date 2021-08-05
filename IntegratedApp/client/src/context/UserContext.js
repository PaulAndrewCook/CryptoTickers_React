import React, { createContext } from 'react';
import { UseLocalStorageReducer } from '../reducers/UseLocalStorageReducer';
import UserReducer from '../reducers/UserReducer';
const DefaultUser = null;
export const UserContext = createContext();
export const UserDispatchContext = createContext();

export function UserProvider(props) {
	console.log('User context props:', props, 'children', props.children);
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
