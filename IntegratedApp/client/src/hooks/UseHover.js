import { useState } from 'react';

export default function useHover(initVal = false) {
	const [
		state,
		setState
	] = useState(initVal);
	const setIsHovering = (mouseHover) => {
		setState(mouseHover);
	};
	return [
		state,
		setIsHovering
	];
}
