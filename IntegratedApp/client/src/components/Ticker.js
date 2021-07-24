import React, { useContext, memo } from 'react';
import UseToggle from '../hooks/UseToggle';
import EditTickerForm from '../hooks/EditTickerForm';
import { DispatchContext } from '../context/TickerContext';
import { useStyles } from '../styles/Main';
import { ListItem, ListItemText, ListItemSecondaryAction, IconButton, Grid } from '@material-ui/core'; //ListItemIcon,
import { Clear, EditSharp } from '@material-ui/icons';

function Ticker({ ticker, _id, pinned, last, change, symbol, percentage, updating }) {
	const dispatch = useContext(DispatchContext);
	const classes = useStyles();

	const [
		isEditing,
		toggle
	] = UseToggle(false);

	return (
		<ListItem button className={classes.ticker}>
			{isEditing ? (
				<EditTickerForm id={_id} symbol={symbol} toggleEditForm={toggle} />
			) : (
				<React.Fragment>
					<Grid container className={classes.tickerGrid}>
						{/* <Grid item xs={1}>
							<ListItemIcon>{symbol}</ListItemIcon>
						</Grid> */}

						<Grid item xs={3}>
							<ListItemText>{symbol}</ListItemText>
						</Grid>

						{updating ? (
							<Grid item xs={6} className="alignCenter">
								<ListItemText>{'Loading...'}</ListItemText>
							</Grid>
						) : (
							<React.Fragment>
								<Grid item xs={2} className="alignRight">
									<ListItemText>{`$${last.toFixed(2)}`}</ListItemText>
								</Grid>

								<Grid item xs={2} className="alignRight">
									<ListItemText>{`$${change.toFixed(2)}`}</ListItemText>
								</Grid>

								<Grid item xs={2} className="alignRight">
									<ListItemText>{`${percentage.toFixed(2)}%`}</ListItemText>
								</Grid>

								<Grid item xs={2} className="alignRight">
									<ListItemSecondaryAction>
										<IconButton className="appearItem" onClick={toggle}>
											<EditSharp style={{ fontSize: 15 }} aria-label="edit ticker" />
										</IconButton>
										<IconButton
											className="appearItem"
											onClick={(e) => {
												e.stopPropagation();
												dispatch({ type: 'REMOVE', id: _id });
											}}
										>
											<Clear aria-label="Filled Star Ticker Pinned: Delete" />
										</IconButton>
										{/* {pinned ? (
											<IconButton
												className="appearItem"
												onClick={() => dispatch({ type: 'REMOVE', _id: _id })}
											>
												<StarRounded aria-label="Filled Star Ticker Pinned: Delete" />
											</IconButton>
										) : (
											<IconButton
												className="appearItem"
												onClick={() => dispatch({ type: 'PINTICKER', _id: _id })}
											>
												<StarBorderRounded aria-label="Open Star Pin Ticker" />
											</IconButton>
										)} */}
									</ListItemSecondaryAction>
								</Grid>
							</React.Fragment>
						)}
					</Grid>
				</React.Fragment>
			)}
		</ListItem>
	);
}

export default memo(Ticker);
