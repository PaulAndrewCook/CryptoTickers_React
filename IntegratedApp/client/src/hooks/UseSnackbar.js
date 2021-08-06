import React, { useContext, useState } from 'react';
import { SnackContext } from '../context/SnackContext';
import { Snackbar, IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

//Material UI snackbar -> currently not working -> not a fn
//probably an issue with the context creation
export default function UseSnackbar() {
	const snacks = useContext(SnackContext);
	console.log('in snackbar, snacks', snacks);
	// Snackbar State
	const [
		open,
		setOpen
	] = useState(false);
	const [
		severity,
		setSeverity
	] = useState('info');
	const [
		message,
		setMessage
	] = useState('');

	const handleClose = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}
		setOpen(false);
	};
	return (
		<Snackbar
			anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
			autoHideDuration={3000}
			open={open}
			message={<span id="message-id">"snacks"</span>}
			ContentProps={{ 'aria-describedby': 'message-id' }}
			onClose={handleClose}
			action={[
				<IconButton onClick={handleClose} color="inherit" key="close" aria-label="close">
					<CloseIcon />
				</IconButton>
			]}
		/>
	);
}
