import React, { useContext } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { DispatchContext } from '../context/TickerContext';
import { useStyles } from '../styles/TimeButtons';
import { ButtonGroup } from '@material-ui/core';
import Button from '@material-ui/core/Button';

export default function TimeButtons(props) {
	const dispatch = useContext(DispatchContext);
	const classes = useStyles();
	const defaultProps = {
		timeframe : [
			'1D',
			'5D',
			'1M',
			'6M',
			'YTD',
			'1Y',
			'5Y',
			'MAX'
		],
		minutes   : [
			'1m',
			'5m',
			'10m',
			'30m',
			'60m',
			'1D'
		]
	};

	// const buttons = defaultProps.timeframe.map((t) => (
	// 	<button
	// 		type="button"
	// 		className="TimeFrame"
	// 		id={`${props.activeTimeFrame === t ? 'active' : ''}`}
	// 		onClick={props.changeDateRange}
	// 		key={uuidv4()}
	// 		name={t}
	// 	>
	// 		{t}
	// 	</button>
	// ));
	return (
		<div>
			<ButtonGroup className={classes.btn} variant="text" color="primary" aria-label="text primary button group">
				{defaultProps.timeframe.map((t) => (
					<Button
						type="button"
						className="TimeFrame"
						id={`${props.activeTimeFrame === t ? 'active' : ''}`}
						key={uuidv4()}
						value={t}
						aria-label={`button date range ${t}`}
						onClick={(e) => dispatch({ type: 'DATE', range: e.target.innerHTML })}
					>
						{t}
					</Button>
				))};
			</ButtonGroup>
		</div>
	);
}
