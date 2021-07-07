import React, { useContext } from 'react';
import InvestmentList from './InvestmentList';
import PrimarySearchAppBar from './components/Appbar';
import { TickerProvider } from './context/TickerContext';
import TickerForm from './TickerForm';
import { Paper, Grid } from '@material-ui/core';
import { useStyles } from './styles/Main';
import { ThemeContext } from './context/ThemeContext';

export default function InvestmentApp() {
	const { isDarkMode } = useContext(ThemeContext);
	const classes = useStyles();
	return (
		<Paper className={isDarkMode ? classes.dark : classes.main}>
			<PrimarySearchAppBar />
			<TickerProvider>
				<Grid container justify="center">
					<Grid item xs={11} md={8} lg={4} className={classes.form}>
						<TickerForm />
					</Grid>
					<Grid item xs={11} md={8} lg={4} className={classes.tickers}>
						<InvestmentList />
					</Grid>
				</Grid>
			</TickerProvider>
		</Paper>
	);
}
