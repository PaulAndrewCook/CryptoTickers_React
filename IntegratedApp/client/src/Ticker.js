import React, { useContext, memo } from 'react';
import UseToggle from './hooks/UseToggle';
import EditTickerForm from './hooks/EditTickerForm';
import { DispatchContext } from './context/TickerContext';
import { ListItem, ListItemText, ListItemSecondaryAction, IconButton, ListItemIcon } from '@material-ui/core';
import { StarBorderRounded, StarRounded, EditSharp } from '@material-ui/icons';

function Ticker({ ticker, ticId, pinned, value, change, symbol }) {
	const dispatch = useContext(DispatchContext);

	const [
		isEditing,
		toggle
	] = UseToggle(false);

	return (
		<ListItem button style={{ height: '64px' }}>
			{isEditing ? (
				<EditTickerForm ticId={ticId} ticker={ticker} toggleEditForm={toggle} />
			) : (
				<React.Fragment>
					<ListItemIcon>{symbol}</ListItemIcon>
					<ListItemText>{ticker}</ListItemText>
					<ListItemText>{value}</ListItemText>
					<ListItemText>{change}</ListItemText>
					<ListItemSecondaryAction>
						<IconButton onClick={toggle}>
							<EditSharp style={{ fontSize: 15 }} aria-label="edit ticker" />
						</IconButton>
						{pinned ? (
							<IconButton onClick={() => dispatch({ type: 'REMOVE', ticId: ticId })}>
								<StarRounded aria-label="Filled Star Ticker Pinned: Delete" />
							</IconButton>
						) : (
							<IconButton onClick={() => dispatch({ type: 'PINTICKER', ticId: ticId })}>
								<StarBorderRounded aria-label="Open Star Pin Ticker" />
							</IconButton>
						)}
					</ListItemSecondaryAction>
				</React.Fragment>
			)}
		</ListItem>
	);
}

export default memo(Ticker);
