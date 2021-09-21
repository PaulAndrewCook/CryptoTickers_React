import { alpha, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	grow             : {
		flexGrow : 1
	},
	appbar           : {
		display          : 'flex',
		position         : 'static',
		justifyContent   : 'space-between',
		flexWrap         : 'nowrap',
		'& .appbarDark'  : {
			color : 'back'
		},
		'& .appbarLight' : {
			color : 'primary'
		}
	},
	toolbar          : {
		justifyContent : 'space-between',
		display        : 'flex'
	},
	grid             : {
		alignItems                   : 'center',
		[theme.breakpoints.up('sm')]: {
			justifyContent : 'space-between'
		}
	},
	title            : {
		display                        : 'flex',
		flexShrink                     : 1,
		overflow                       : 'hidden',
		whiteSpace                     : 'nowrap',
		[theme.breakpoints.up('sm')]: {
			display : 'block'
		},
		[theme.breakpoints.only('xs')]: {
			justifyContent : 'center',
			marginTop      : '10px',
			fontSize       : '150%'
		}
	},
	menuItem         : {
		paddingTop    : '10px',
		paddingBottom : '0px'
	},
	search           : {
		color                        : 'inherit',
		display                      : 'flex',
		flexGrow                     : 2,
		align                        : 'center',
		maxWidth                     : '500px',
		minWidth                     : '50%',
		borderRadius                 : theme.shape.borderRadius,
		backgroundColor              : alpha(theme.palette.common.white, 0.05),
		// overflow                     : 'hidden',
		// textOverflow                 : 'ellipsis',
		// whiteSpace                   : 'nowrap',
		justifyContent               : 'center',
		marginBottom                 : '10px',
		'&:hover'                    : {
			backgroundColor : alpha(theme.palette.common.white, 0.15)
		},
		[theme.breakpoints.up('sm')]: {
			marginBottom : '0px',
			position     : 'absolute',
			left         : '50%',
			top          : '50%',
			transform    : 'translate(-50%, -50%)'
		}
	},
	searchIcon       : {
		padding        : theme.spacing(0, 2),
		height         : '100%',
		position       : 'absolute',
		pointerEvents  : 'none',
		display        : 'flex',
		alignItems     : 'center',
		justifyContent : 'center'
	},
	inputRoot        : {
		color : 'inherit'
	},
	//this is controlling the location of the search bar
	inputInput       : {
		padding                      : theme.spacing(1, 1, 1, 0),
		// vertical padding + font size from searchIcon
		paddingLeft                  : `calc(1em + ${theme.spacing(4)}px)`,
		transition                   : theme.transitions.create('width'),
		width                        : '100%',
		[theme.breakpoints.up('md')]: {
			width : '20ch'
		},
		'&:focus'                    : {
			width : '30ch'
		},
		textAlign                    : 'center'
	},
	sectionDesktop   : {
		display                      : 'none',
		[theme.breakpoints.up('md')]: {
			display : 'flex'
		}
	},
	sectionMobile    : {
		display                      : 'flex',
		[theme.breakpoints.up('md')]: {
			display : 'none'
		}
	},
	menuNavLink      : {
		textDecoration : 'none'
	},
	activeLink       : {
		borderBottom : '1px solid grey'
	},
	dataInitials     : {
		background    : '#303f9f',
		color         : 'white',
		opacity       : 1,
		display       : 'inline-block',
		fontWeight    : 'bold',
		borderRadius  : '50%',
		verticalAlign : 'middle',
		marginRight   : '0.5em',
		width         : '50px',
		height        : '50px',
		lineHeight    : '50px',
		textAlign     : 'center'
	},
	mobileMenuButton : {
		justifyContent                 : 'flex-end',
		[theme.breakpoints.down('sm')]: {
			padding : '0 0 10px 10px'
		}
	},
	menuItemPadding  : {
		padding : '0 10px 0 0'
	}
}));

export { useStyles };
