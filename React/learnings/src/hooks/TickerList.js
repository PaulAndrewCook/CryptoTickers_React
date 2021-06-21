import React, { useContext } from 'react';
import Ticker from './Ticker';
import { TickerContext } from '../context/TickerContext';
import { Paper, List, Divider } from '@material-ui/core';

export default function TickerList() {
	const tickers = useContext(TickerContext);
	if (tickers.length)
		return (
			<Paper>
				<List>
					{tickers.map((tic, i) => (
						<React.Fragment>
							<Ticker {...tic} key={tic.id} />
							{i < tickers.length - 1 && <Divider />}
						</React.Fragment>
					))}
				</List>
			</Paper>
		);
	return null;
}
