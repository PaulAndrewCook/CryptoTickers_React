import React, { useState, useContext } from 'react';
import UseToggle from '../hooks/UseToggle';
import { UserDispatchContext, UserContext } from '../context/UserContext';
import { DispatchContext } from '../context/TickerContext';
import { loginUser, registerUser, logoutUser } from '../actions/UserActions';
import {
	Button,
	TextField,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle
} from '@material-ui/core';

export default function Login() {
	const userdispatch = useContext(UserDispatchContext);
	const dispatch = useContext(DispatchContext);
	const user = useContext(UserContext);
	const [
		open,
		setOpen
	] = useState(false);
	const [
		isLoggingIn,
		toggle
	] = UseToggle(true);

	const handleClickOpen = (e) => {
		e.preventDefault();
		setOpen(true);
	};
	const handleRegisterOpen = (e) => {
		e.preventDefault();
		setOpen(true);
		toggle(false);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleLogin = (event) => {
		event.preventDefault();
		const data = new FormData(event.target);
		console.log('in login: data', data, 'username', data.get('username'), data.get('password'));
		loginUser({ username: data.get('username'), password: data.get('password') })(userdispatch, dispatch);
		handleClose();
	};

	const handleRegister = (event) => {
		event.preventDefault();
		const data = new FormData(event.target);
		registerUser({ username: data.get('username'), email: data.get('email'), password: data.get('password') })(
			userdispatch,
			dispatch
		);
		handleClose();
	};
	const handleLogout = (user, event) => {
		event.preventDefault();
		console.log('in login / logout, user', user);
		logoutUser({ username: user.username })(userdispatch, dispatch);
		handleClose();
	};

	return (
		<div>
			{!user ? (
				<React.Fragment>
					<Button
						color="inherit"
						onClick={handleClickOpen}
						aria-label="Login to account"
						aria-controls="login-link"
					>
						Login
					</Button>

					<Button
						color="inherit"
						onClick={handleRegisterOpen}
						aria-label="Register"
						aria-controls="Register-link"
					>
						Register
					</Button>
				</React.Fragment>
			) : (
				<Button
					color="inherit"
					onClick={(evt) => handleLogout(user, evt)}
					aria-label="Loutout"
					aria-controls="Logout-link"
				>
					Logout
				</Button>
			)}
			{isLoggingIn ? (
				<Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
					<DialogTitle id="form-dialog-title">Please Login</DialogTitle>
					<DialogContent>
						<DialogContentText>Create your own personal Tickers!</DialogContentText>
						<form
							onSubmit={(e) => {
								handleLogin(e);
							}}
							id="loginForm"
						>
							<TextField
								autoFocus
								required
								margin="dense"
								id="name"
								name="username"
								label="User Name"
								type="standard-required"
								fullWidth
							/>
							<TextField
								required
								margin="dense"
								id="password"
								name="password"
								label="Password"
								type="password"
								fullWidth
							/>
							<Button type="submit" form="loginForm" size="large" color="primary">
								Login
							</Button>
						</form>
					</DialogContent>

					<DialogActions>
						<Button onClick={handleClose} color="secondary">
							Cancel
						</Button>
						<Button onClick={toggle} color="default">
							Register
						</Button>
					</DialogActions>
				</Dialog>
			) : (
				<Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
					<DialogTitle id="form-dialog-title">Please Register</DialogTitle>
					<DialogContent>
						<DialogContentText>Create your own personal Tickers!</DialogContentText>
						<form
							onSubmit={(e) => {
								handleRegister(e);
							}}
							id="registerForm"
						>
							<TextField
								autoFocus
								required
								margin="dense"
								id="Email"
								name="email"
								label="Email"
								type="email"
								fullWidth
							/>
							<TextField
								required
								margin="dense"
								id="name"
								name="username"
								label="User Name"
								type="standard-required"
								fullWidth
							/>
							<TextField
								required
								margin="dense"
								id="password"
								name="password"
								label="Password"
								type="password"
								fullWidth
							/>
							<Button type="submit" form="registerForm" size="large" color="primary">
								Register
							</Button>
						</form>
					</DialogContent>

					<DialogActions>
						<Button onClick={handleClose} color="secondary">
							Cancel
						</Button>
						<Button onClick={toggle} color="default">
							Login
						</Button>
					</DialogActions>
				</Dialog>
			)}
		</div>
	);
}
