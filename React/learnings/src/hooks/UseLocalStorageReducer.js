import { useReducer, useEffect } from 'react';

function UseLocalStorageReducer(key, initVal, reducer) {
	//Make piece of state based off of value in localstorage
	const [
		state,
		dispatch
	] = useReducer(reducer, initVal, () => {
		let val;
		try {
			val = JSON.parse(window.localStorage.getItem(key) || String(initVal));
		} catch (e) {
			val = initVal;
		}
		return val;
	});
	//UseEffect to update local storage when local storage is changed
	useEffect(
		() => {
			window.localStorage.setItem(key, JSON.stringify(state));
		},
		[
			state
		]
	);
	return [
		state,
		dispatch
	];
}

export { UseLocalStorageReducer };
