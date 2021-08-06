import React, { createContext } from 'react';
import { UseLocalStorageReducer } from '../reducers/UseLocalStorageReducer';
import SnackReducer from '../reducers/SnackReducer';
const DefaultSnack = 'Welcome!';
export const SnackContext = createContext();
export const SnackDispatchContext = createContext();

export function SnackProvider(props) {
	console.log('Snack context props:', props, 'children', props.children);
	const [
		snack,
		snackdispatch
	] = UseLocalStorageReducer('snack', DefaultSnack, SnackReducer);
	return (
		<SnackContext.Provider value={snack}>
			<SnackDispatchContext.Provider value={snackdispatch}>{props.children}</SnackDispatchContext.Provider>
		</SnackContext.Provider>
	);
}
