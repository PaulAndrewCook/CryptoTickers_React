import React from 'react';
import { SortableElement } from 'react-sortable-hoc';

function Ticker(props) {
	const Ticker = SortableElement((props) => {
		const { ticker, symbol, value, change, rank, index, key, id } = this.props;

		return (
			<div>
				<div className="Ticker">
					<Ticker
						ticker={ticker}
						symbol={symbol}
						value={value}
						change={change}
						rank={rank}
						key={key}
						index={index}
						id={id}
					/>
				</div>
			</div>
		);
	});
}

export default Ticker;
