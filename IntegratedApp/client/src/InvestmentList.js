import React, { useContext } from 'react';
import { TickerContext, DispatchContext } from './context/TickerContext';
import { getTickers } from './actions/ApiTickerFns';
import Ticker from './Ticker';
import { List, Paper, Divider } from '@material-ui/core';

export default function InvestmentList() {
	const tickers = useContext(TickerContext);
	const dispatch = useContext(DispatchContext);

	//This should use the curry functionality.
	const tempTics = getTickers()(dispatch);

	console.log('in list, tickers', tempTics);
	if (tickers)
		return (
			<Paper>
				<List aria-label="tickers" style={{ padding: 0 }}>
					{tickers.map((tic, i) => (
						<React.Fragment key={i}>
							<Ticker {...tic} key={tic.ticId} />
							{i < tickers.length - 1 && <Divider />}
						</React.Fragment>
					))}
				</List>
			</Paper>
		);
	return null;
}
