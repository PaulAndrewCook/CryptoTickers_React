import React, { createContext } from 'react';
import UseToggle from '../hooks/UseToggle';

export const ThemeContext = createContext();

export function ThemeProvider(props) {
	const [
		isDarkMode,
		toggleTheme
	] = UseToggle(false);

	return <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>{props.children}</ThemeContext.Provider>;
}
