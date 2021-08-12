import React, { useContext } from 'react';
import InvestmentList from './InvestmentList';
import PrimarySearchAppBar from './components/Appbar';
import { TickerProvider } from './context/TickerContext';
import { UserProvider } from './context/UserContext';
import TimeButtons from './components/TimeButtons';
import { Paper, Grid } from '@material-ui/core';
import { useStyles } from './styles/Main';
import { ThemeContext } from './context/ThemeContext';

//Timebuttons and dark/light mode -> currently not working

//Main page format for app -> user providers to pass info to components
export default function InvestmentApp() {
	//Set dark or light more -> currently not working
	const { isDarkMode } = useContext(ThemeContext);

	const classes = useStyles();
	return (
		<Paper className={isDarkMode ? classes.dark : classes.main}>
			<UserProvider>
				<TickerProvider>
					<PrimarySearchAppBar />
					<Grid container className={classes.container}>
						<Grid item xs={11} md={8} lg={8}>
							<TimeButtons />
						</Grid>
						<Grid item xs={11} md={8} lg={8} className={classes.tickers}>
							<InvestmentList />
						</Grid>
					</Grid>
				</TickerProvider>
			</UserProvider>
		</Paper>
	);
}
