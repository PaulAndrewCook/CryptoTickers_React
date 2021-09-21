import React, { useState, useContext } from 'react';
import { AppBar, Grid, Toolbar, IconButton, Typography, MenuItem, Menu } from '@material-ui/core';
import { Switch, FormControlLabel, Divider } from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MoreIcon from '@material-ui/icons/MoreVert';

//Components for searching and logging in
import Searchbar from '../components/Searchbar';
import Login from '../components/Login';
import { useStyles } from '../styles/AppBar';
import { ThemeContext } from '../context/ThemeContext';
import { UserContext } from '../context/UserContext';

const intials = (user) => {
	return user.user.user.username.charAt(0).toUpperCase();
};

export default function PrimarySearchAppBar() {
	const classes = useStyles();
	const user = useContext(UserContext); // get user via context
	var username = 'Welcome!'; // set default welcome
	var email = 'Anonymous';

	console.log('in appbar, user', user);
	//Test if user is logged in or not then set username and email
	if (Boolean(user.user)) {
		username = user.user.username;
		email = user.user.email;
	}

	const [
		anchorEl,
		setAnchorEl
	] = useState(null);
	const [
		mobileMoreAnchorEl,
		setMobileMoreAnchorEl
	] = useState(null);

	const { isDarkMode, toggleTheme } = useContext(ThemeContext);

	const isMenuOpen = Boolean(anchorEl);
	const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

	const handleProfileMenuOpen = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleMobileMenuClose = () => {
		setMobileMoreAnchorEl(null);
	};

	const handleMenuClose = () => {
		setAnchorEl(null);
		handleMobileMenuClose();
	};

	const handleMobileMenuOpen = (event) => {
		setMobileMoreAnchorEl(event.currentTarget);
	};

	const menuId = 'primary-search-account-menu';
	const renderMenu = (
		<Menu
			anchorEl={anchorEl}
			anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
			id={menuId}
			keepMounted
			transformOrigin={{ vertical: 'top', horizontal: 'right' }}
			open={isMenuOpen}
			onClose={handleMenuClose}
		>
			<div className={classes.menuUserInfo}>
				<MenuItem>{username}</MenuItem>
				{(email = 'Anonymous' ? '' : <MenuItem>{email}</MenuItem>)}
			</div>
			<Divider />
			<MenuItem className={classes.menuItem}>
				<Login className={classes.menuButton} />
			</MenuItem>
			<FormControlLabel
				control={
					<Switch
						onChange={toggleTheme}
						name="darkMode"
						inputProps={{ 'aria-labelledby': 'switch-list-label-darkmode' }}
					/>
				}
				label="Dark Mode"
				labelPlacement="start"
				edge="end"
				className={classes.menuItemPadding}
			/>
		</Menu>
	);

	const mobileMenuId = 'primary-search-account-menu-mobile';
	const renderMobileMenu = (
		<Menu
			anchorEl={mobileMoreAnchorEl}
			anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
			id={mobileMenuId}
			keepMounted
			transformOrigin={{ vertical: 'top', horizontal: 'right' }}
			open={isMobileMenuOpen}
			onClose={handleMobileMenuClose}
		>
			<div className={classes.menuUserInfo}>
				<MenuItem>{username}</MenuItem>
			</div>
			<Divider />
			<MenuItem className={classes.menuItem}>
				<Login
					className={classes.menuButton}
					aria-label="Login to account"
					aria-controls="account-login"
					aria-haspopup="true"
					color="inherit"
				/>
			</MenuItem>
			<FormControlLabel
				control={
					<Switch
						onChange={toggleTheme}
						name="darkMode"
						inputProps={{ 'aria-labelledby': 'switch-list-label-darkmode' }}
					/>
				}
				label="Dark Mode"
				labelPlacement="start"
				edge="end"
				className={classes.menuItemPadding}
			/>
			{/* <MenuItem onClick={handleProfileMenuOpen}>
				<IconButton
					aria-label="Login to account"
					aria-controls="account-login"
					aria-haspopup="true"
					color="inherit"
				>
					<AccountCircle />
				</IconButton>
				<Login />
			</MenuItem> */}
		</Menu>
	);

	return (
		<div className={classes.grow}>
			<AppBar className={classes.appbar}>
				<Toolbar className={classes.toolbar}>
					<Grid container spacing={1} className={classes.grid}>
						<Grid item xs={12} sm={3}>
							<Typography className={classes.title} variant="h6" noWrap>
								CryptoTickers
							</Typography>
						</Grid>
						<Grid item xs={10} sm={7} md={8} className={classes.search}>
							<Searchbar />
						</Grid>
						<div className={classes.sectionDesktop}>
							<IconButton
								edge="end"
								aria-label="account of current user"
								aria-controls={menuId}
								aria-haspopup="true"
								onClick={handleProfileMenuOpen}
								color="inherit"
							>
								{Boolean(user.user) === true ? (
									<div className={classes.dataInitials}>{intials({ user })}</div>
								) : (
									<AccountCircle />
								)}
							</IconButton>
						</div>
						<div className={classes.sectionMobile}>
							<IconButton
								aria-label="show more"
								aria-controls={mobileMenuId}
								aria-haspopup="true"
								onClick={handleMobileMenuOpen}
								color="inherit"
								className={classes.mobileMenuButton}
							>
								<MoreIcon />
							</IconButton>
						</div>
					</Grid>
				</Toolbar>
			</AppBar>
			{renderMobileMenu}
			{renderMenu}
		</div>
	);
}
