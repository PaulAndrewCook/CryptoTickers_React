import React, { useContext, memo } from 'react';
import UseToggle from '../hooks/UseToggle';
import { UserDispatchContext, UserContext } from '../context/UserContext';
import { deleteTicker } from '../actions/ApiTickerFns';
import UseTickerForm from '../hooks/UseTickerForm';
import { DispatchContext } from '../context/TickerContext';
import { useStyles } from '../styles/Main';
import { ListItem, ListItemText, ListItemSecondaryAction, IconButton, Grid } from '@material-ui/core'; //ListItemIcon,
import { Clear, EditSharp } from '@material-ui/icons';

//Component to render each ticker
//Loads both information passed from investmentList and tickerContext
function Ticker({ _id, last, change, symbol, percentage, updating }) {
	const dispatch = useContext(DispatchContext);
	const userdispatch = useContext(UserDispatchContext);
	const classes = useStyles();
	const user = useContext(UserContext);

	//Toggle hook to open and close editing toolbar
	const [
		isEditing,
		toggle
	] = UseToggle(false);

	console.log('in ticker, user', user, 'user._id', user._id, 'id', _id);
	//Display ticker detials or edit form
	//Call delete ticker or edit form hooks as needed
	return (
		<ListItem button className={classes.ticker}>
			{isEditing ? (
				<UseTickerForm id={_id} symbol={symbol} toggleEditForm={toggle} />
			) : (
				<React.Fragment>
					<Grid container className={classes.tickerGrid}>
						<Grid item xs={3}>
							<ListItemText>{symbol}</ListItemText>
						</Grid>

						{updating ? (
							<Grid item xs={6} className="alignCenter">
								<ListItemText>{'Loading...'}</ListItemText>
							</Grid>
						) : (
							<React.Fragment>
								{last && last.toFixed(2) ? (
									<Grid item xs={2} className="alignRight">
										<ListItemText>{`$${last.toFixed(2)}`}</ListItemText>
									</Grid>
								) : (
									'Loading Error'
								)}
								{change && change.toFixed(2) ? (
									<Grid item xs={2} className="alignRight">
										<ListItemText>{`$${change.toFixed(2)}`}</ListItemText>
									</Grid>
								) : (
									''
								)}
								{percentage && percentage.toFixed(2) ? (
									<Grid item xs={2} className="alignRight">
										<ListItemText>{`${percentage.toFixed(2)}%`}</ListItemText>
									</Grid>
								) : (
									''
								)}
								<Grid item xs={2} className="alignRight">
									<ListItemSecondaryAction>
										<IconButton className="appearItem" onClick={toggle}>
											<EditSharp style={{ fontSize: 15 }} aria-label="edit ticker" />
										</IconButton>
										<IconButton
											className="appearItem"
											onClick={(e) => {
												e.stopPropagation();
												deleteTicker(_id, user._id)(dispatch, userdispatch);
												// dispatch({ type: 'REMOVE', id: _id });
											}}
										>
											<Clear aria-label="Filled Star Ticker Pinned: Delete" />
										</IconButton>
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
