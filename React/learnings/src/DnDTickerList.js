import React from 'react';
import Ticker from './DnDTickers';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';

const DnDTickerList = SortableContainer(({ tickers }) => {
	// const { ticker, symbol, value, change, rank, key } = tickers;

	const tickerList = tickers.map((t, i) => (
		<div className="Ticker">
			<Ticker
				ticker={t.ticker}
				symbol={t.symbol}
				value={t.value}
				change={t.change}
				rank={t.rank}
				key={t.id}
				index={i}
			/>
		</div>
	));
	return <div>{tickerList}</div>;

	// return <ul>{items.map((value, index) => <SortableItem key={`item-${value}`} index={index} value={value} />)}</ul>;
});

// class SortableComponent extends Component {
// 	state = {
// 		items : [
// 			'Item 1',
// 			'Item 2',
// 			'Item 3',
// 			'Item 4',
// 			'Item 5',
// 			'Item 6'
// 		]
// 	};

// 	render() {
// 		return <SortableList items={this.state.items} onSortEnd={this.onSortEnd} />;
// 	}
// }

export default DnDTickerList;
