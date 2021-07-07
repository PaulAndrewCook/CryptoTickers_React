import React, { useContext } from 'react';
import UseInput from './hooks/UseInput';
import { DispatchContext } from './context/TickerContext';
import { Paper, TextField } from '@material-ui/core';

export default function TickerForm() {
	const dispatch = useContext(DispatchContext);
	const [
		value,
		handleChange,
		reset
	] = UseInput('');
	return (
		<Paper style={{ padding: '0 1rem', margin: '1rem 0', backgroundColor: '#fafafa' }} elevation={0}>
			<form
				onSubmit={(e) => {
					e.preventDefault();
					dispatch({ type: 'ADD', ticker: value });
					reset();
				}}
			>
				<TextField value={value} onChange={handleChange} margin="normal" label="Add New Invstment" fullWidth />
			</form>
		</Paper>
	);
}
