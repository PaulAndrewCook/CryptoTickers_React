import InvestmentApp from './InvestmentApp';
import { ThemeProvider } from './context/ThemeContext';

import './App.css';

function App() {
	return (
		<ThemeProvider>
			<InvestmentApp />
		</ThemeProvider>
	);
}

export default App;
