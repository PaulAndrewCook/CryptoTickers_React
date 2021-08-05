import React from 'react';
import InvestmentApp from './InvestmentApp';
import { ThemeProvider } from './context/ThemeContext';
// import { Route, Switch } from 'react-router-dom';
import './App.css';

// const login = () => <h1>Login Here</h1>;

function App() {
	return (
		<ThemeProvider>
			<InvestmentApp />
			{/* <Switch>
				<Route exact path="/" render={() => <InvestmentApp />} />
				<Route exact path="/login" component={login} />
				<Route exact path="/user" render={() => <InvestmentApp />} />
			</Switch>  */}
		</ThemeProvider>
	);
}

export default App;
