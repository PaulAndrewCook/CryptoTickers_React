import React, { useContext } from 'react';
// import { DispatchContext } from '../context/TickerContext';
// import UseInput from '../hooks/UseInput';
import AppBar from '@material-ui/core/AppBar';
import { NavLink } from 'react-router-dom';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
// import InputBase from '@material-ui/core/InputBase';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
// import MenuIcon from '@material-ui/icons/Menu';
// import SearchIcon from '@material-ui/icons/Search';
import { Switch, FormControlLabel } from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MoreIcon from '@material-ui/icons/MoreVert';
import { useStyles } from '../styles/AppBar';
import { ThemeContext } from '../context/ThemeContext';
import { UserContext } from '../context/UserContext';

//API call to create Ticker
// import DropdownCombobox from '../hooks/UseVirtualList';
// import Select from 'react-select';
import Searchbar from '../components/Searchbar';
import Login from '../components/Login';
// import { createTicker } from '../actions/ApiTickerFns';
// import TickerForm from '../hooks/TickerForm';

export default function PrimarySearchAppBar() {
	// const dispatch = useContext(DispatchContext);
	const classes = useStyles();
	const user = useContext(UserContext);
	console.log('in appbar, user', user);

	// const [
	// 	value,
	// 	handleChange,
	// 	reset
	// ] = UseInput('');
	const [
		anchorEl,
		setAnchorEl
	] = React.useState(null);
	const [
		mobileMoreAnchorEl,
		setMobileMoreAnchorEl
	] = React.useState(null);

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
			{/* <MenuItem>{user}</MenuItem> */}
			<MenuItem>
				<Login />
			</MenuItem>
			<MenuItem onClick={handleMenuClose}>My account</MenuItem>
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
				{/* <NavLink
					to="/login"
					exact
					activeClassName="activeLink"
					aria-label="Login to account"
					aria-controls="login-link"
					style={{ textDecoration: 'none' }}
				>
					Login
				</NavLink> */}
				<Login />
			</MenuItem>
		</Menu>
	);

	return (
		<div className={classes.grow}>
			<AppBar className={classes.appbar} color={isDarkMode ? 'default' : 'primary'}>
				<Toolbar className={classes.toolbar}>
					{/* <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="open drawer">
						<MenuIcon />
					</IconButton> */}
					<Typography className={classes.title} variant="h6" noWrap>
						CryptoTickers
					</Typography>
					<div className={classes.search}>
						<Searchbar />

						{/* <div className={classes.form}>
							<DropdownCombobox />
						</div>

						<div className={classes.searchIcon}>
							<SearchIcon />
						</div> */}

						{/* <Select options={options} /> */}

						{/* <TickerForm
							classes={{
								root  : classes.inputRoot,
								input : classes.inputInput
							}}
							inputProps={{ 'aria-label': 'search' }}
						/> */}
						{/* <form
							onSubmit={(data) => {
								data.preventDefault();
								console.log('form onsubmit called: data', value);
								createTicker(value)(dispatch);
								// dispatch({ type: 'ADD', ticker: value });
								reset();
							}}
						>
							<InputBase
								value={value}
								onChange={handleChange}
								placeholder="Search…"
								classes={{
									root  : classes.inputRoot,
									input : classes.inputInput
								}}
								inputProps={{ 'aria-label': 'search' }}
							/>
						</form> */}
					</div>

					{/* <div className={classes.grow} /> */}
					<div className={classes.sectionDesktop}>
						<IconButton
							edge="end"
							aria-label="account of current user"
							aria-controls={menuId}
							aria-haspopup="true"
							onClick={handleProfileMenuOpen}
							color="inherit"
						>
							<AccountCircle />
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
