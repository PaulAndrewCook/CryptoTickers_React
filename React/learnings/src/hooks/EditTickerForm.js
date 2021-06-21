import React, { useContext } from 'react';
import UseInput from './UseInput';
import { DispatchContext } from '../context/TickerContext';
import { TextField, ListItemSecondaryAction, IconButton } from '@material-ui/core';
import { NotInterestedSharp } from '@material-ui/icons';

function EditTickerForm({ id, ticker, toggleEditForm }) {
	const dispatch = useContext(DispatchContext);
	const [
		value,
		handleChange,
		reset
	] = UseInput(ticker);
	return (
		<form
			onSubmit={(e) => {
				e.preventDefault();
				dispatch({ type: 'EDIT', id: id, newTicker: value });
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
