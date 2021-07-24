import React, { useContext } from 'react';
import UseInput from './UseInput';
import { DispatchContext } from '../context/TickerContext';
import { TextField, ListItemSecondaryAction, IconButton } from '@material-ui/core';
import { NotInterestedSharp } from '@material-ui/icons';
import { editTicker } from '../actions/ApiTickerFns';

function EditTickerForm({ id, symbol, toggleEditForm }) {
	const dispatch = useContext(DispatchContext);
	const [
		value,
		handleChange,
		reset
	] = UseInput(symbol);
	return (
		<form
			onSubmit={(e) => {
				e.preventDefault();
				editTicker(id, value)(dispatch);
				// dispatch({ type: 'EDIT', ticId: ticId, newTicker: value });
				reset();
				toggleEditForm();
			}}
			style={{ marginLeft: '1rem', width: '50%' }}
		>
			<TextField margin="normal" value={value} onChange={handleChange} fullWidth autoFocus />
			<ListItemSecondaryAction>
				<IconButton onClick={() => toggleEditForm()}>
					<NotInterestedSharp aria-label="Do not edit, close" />
				</IconButton>
			</ListItemSecondaryAction>
		</form>
	);
}

export default EditTickerForm;
