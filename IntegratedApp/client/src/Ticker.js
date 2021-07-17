import React, { useContext, memo } from 'react';
import UseToggle from './hooks/UseToggle';
import EditTickerForm from './hooks/EditTickerForm';
import { DispatchContext } from './context/TickerContext';
import { useStyles } from './styles/Main';
import { ListItem, ListItemText, ListItemSecondaryAction, IconButton, ListItemIcon, Grid } from '@material-ui/core';
import { StarBorderRounded, StarRounded, EditSharp } from '@material-ui/icons';

function Ticker({ ticker, ticId, pinned, value, change, symbol, percent }) {
	const dispatch = useContext(DispatchContext);
	const classes = useStyles();

	const [
		isEditing,
		toggle
	] = UseToggle(false);

	return (
		<ListItem button className={classes.ticker}>
			{isEditing ? (
				<EditTickerForm ticId={ticId} ticker={ticker} toggleEditForm={toggle} />
			) : (
				<React.Fragment>
					<Grid container className={classes.tickerGrid}>
						<Grid item xs={1}>
							<ListItemIcon>{symbol}</ListItemIcon>
						</Grid>
						<Grid item xs={3}>
							<ListItemText>{ticker}</ListItemText>
						</Grid>
						<Grid item xs={2} className="alignRight">
							<ListItemText>{`$${value}`}</ListItemText>
						</Grid>
						<Grid item xs={2} className="alignRight">
							<ListItemText>{`$${change}`}</ListItemText>
						</Grid>
						<Grid item xs={2} className="alignRight">
							<ListItemText>{`${percent}%`}</ListItemText>
						</Grid>
						<Grid item xs={2} className="alignRight">
							<ListItemSecondaryAction>
								<IconButton className="appearItem" onClick={toggle}>
									<EditSharp style={{ fontSize: 15 }} aria-label="edit ticker" />
								</IconButton>
								{pinned ? (
									<IconButton
										className="appearItem"
										onClick={() => dispatch({ type: 'REMOVE', ticId: ticId })}
									>
										<StarRounded aria-label="Filled Star Ticker Pinned: Delete" />
									</IconButton>
								) : (
									<IconButton
										className="appearItem"
										onClick={() => dispatch({ type: 'PINTICKER', ticId: ticId })}
									>
										<StarBorderRounded aria-label="Open Star Pin Ticker" />
									</IconButton>
								)}
							</ListItemSecondaryAction>
						</Grid>
					</Grid>
				</React.Fragment>
			)}
		</ListItem>
	);
}

export default memo(Ticker);
