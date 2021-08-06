import React from 'react';
import InvestmentApp from './InvestmentApp';
import { ThemeProvider } from './context/ThemeContext';
// import { Route, Switch } from 'react-router-dom';
// import './App.css';

//Provide the theme to entire app
function App() {
	return (
		<ThemeProvider>
			<InvestmentApp />
		</ThemeProvider>
	);
}

export default App;
