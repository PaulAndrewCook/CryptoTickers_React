import { useState, useEffect } from 'react';

export default function UseLocalStorage(key, initVal) {
	//Make piece of state based off of value in localstorage
	const [
		state,
		setState
	] = useState(() => {
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
			key,
			state
		]
	);
	return [
		state,
		setState
	];
}
