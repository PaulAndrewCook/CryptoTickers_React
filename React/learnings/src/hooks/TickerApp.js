import React from 'react';
import TickerList from './TickerList';
import TickerForm from './TickerForm';
import UseTickers from './UseTickers';

import { TickerProvider } from '../context/TickerContext';

import { Typography, Paper, AppBar, Toolbar, Grid } from '@material-ui/core';

export default function TickerApp() {
	return (
		<Paper style={{ padding: 0, margin: 0, height: '100vh', backgroundColor: '#fafafa' }} elevation={0}>
			<AppBar color="primary" position="static" style={{ height: '64' }}>
				<Toolbar>
					<Typography color="inherit"> My Investments</Typography>
				</Toolbar>
			</AppBar>
			<Grid container justify="center" style={{ marginTop: '1rem' }}>
				<Grid item xs={11} md={8} lg={4}>
					<TickerProvider>
						<TickerForm />
						<TickerList />
					</TickerProvider>
				</Grid>
			</Grid>
		</Paper>
	);
}
