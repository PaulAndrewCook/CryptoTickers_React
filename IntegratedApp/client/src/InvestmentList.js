import React, { useContext } from 'react';
import { TickerContext } from './context/TickerContext';
import Ticker from './Ticker';
import { List, Paper, Divider } from '@material-ui/core';
import { FixedSizeList } from 'react-window';

export default function InvestmentList() {
	const tickers = useContext(TickerContext);
	console.log('in list, tickers', tickers);
	if (tickers)
		return (
			<Paper>
				<FixedSizeList component="nav" aria-label="tickers" itemSize={46} itemCount={200}>
					{tickers.map((tic, i) => (
						<React.Fragment key={i}>
							<Ticker {...tic} key={tic.ticId} />
							{i < tickers.length - 1 && <Divider />}
						</React.Fragment>
					))}
				</FixedSizeList>
			</Paper>
		);
	return null;
}
