import React, { useContext, memo } from 'react';
import UseToggle from './UseToggle';
import EditTickerForm from './EditTickerForm';
import { DispatchContext } from '../context/TickerContext';
import { ListItem, ListItemText, ListItemSecondaryAction, IconButton } from '@material-ui/core';
import { StarBorderRounded, StarRounded, EditSharp } from '@material-ui/icons';

function Ticker({ ticker, id, pinned }) {
	const dispatch = useContext(DispatchContext);
	const [
		isEditing,
		toggle
	] = UseToggle(false);

	return (
		<ListItem style={{ height: '64px' }}>
			{isEditing ? (
				<EditTickerForm id={id} ticker={ticker} toggleEditForm={toggle} />
			) : (
				<React.Fragment>
					<ListItemText>{ticker}</ListItemText>
					<ListItemSecondaryAction>
						<IconButton onClick={toggle}>
							<EditSharp style={{ fontSize: 15 }} aria-label="edit ticker" />
						</IconButton>
						{pinned ? (
							<IconButton onClick={() => dispatch({ type: 'REMOVE', id: id })}>
								<StarRounded aria-label="Filled Star Ticker Pinned: Delete" />
							</IconButton>
						) : (
							<IconButton onClick={() => dispatch({ type: 'PINTICKER', id: id })}>
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
