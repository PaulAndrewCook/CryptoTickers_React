import React, { useState, useContext } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { Switch, FormControlLabel, Divider } from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MoreIcon from '@material-ui/icons/MoreVert';
import { useStyles } from '../styles/AppBar';
import { ThemeContext } from '../context/ThemeContext';
import { UserContext } from '../context/UserContext';

//Components for searching and logging in
import Searchbar from '../components/Searchbar';
import Login from '../components/Login';

const intials = (user) => {
	console.log('in appbar iniital, user:', user, 'usrname', user.user.username);
	return user.user.user.username.charAt(0).toUpperCase();
};

export default function PrimarySearchAppBar() {
	const classes = useStyles();
	const user = useContext(UserContext); // get user via context
	var username = 'Welcome'; // set default welcome
	var email = null;

	//Test if user is logged in or not then set username and email
	if (Boolean(user.user) === true) {
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
				<MenuItem>{email}</MenuItem>
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
			<MenuItem onClick={handleProfileMenuOpen}>
				<IconButton
					aria-label="Login to account"
					aria-controls="account-login"
					aria-haspopup="true"
					color="inherit"
				>
					<AccountCircle />
				</IconButton>
				<Login />
			</MenuItem>
		</Menu>
	);

	return (
		<div className={classes.grow}>
			<AppBar className={classes.appbar} color={isDarkMode ? 'default' : 'primary'}>
				<Toolbar className={classes.toolbar}>
					<Typography className={classes.title} variant="h6" noWrap>
						CryptoTickers
					</Typography>
					<div className={classes.search}>
						<Searchbar />
					</div>
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
						>
							<MoreIcon />
						</IconButton>
					</div>
				</Toolbar>
			</AppBar>
			{renderMobileMenu}
			{renderMenu}
		</div>
	);
}
