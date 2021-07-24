import React, { useContext, useEffect } from 'react';
import { TickerContext, DispatchContext } from './context/TickerContext';
import { updateTickers } from './actions/ApiTickerFns';
import Ticker from './components/Ticker';
import { List, Paper, Divider } from '@material-ui/core';

export default function InvestmentList() {
	const tickers = useContext(TickerContext);
	const dispatch = useContext(DispatchContext);

	//This uses the curry functionality coming from ApiTickerFns.
	useEffect(() => {
		// getTickers()(dispatch);
		updateTickers(tickers)(dispatch);
	}, []);

	console.log('in list, tickers', tickers);
	if (tickers)
		return (
			<Paper>
				<List aria-label="tickers" style={{ padding: 0 }}>
					{tickers.map((tic, i) => (
						<React.Fragment key={i}>
							<Ticker {...tic} key={tic._id} />
							{i < tickers.length - 1 && <Divider />}
						</React.Fragment>
					))}
				</List>
			</Paper>
		);
	return null;
}
