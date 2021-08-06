import { alpha, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	grow           : {
		flexGrow : 1
	},
	appbar         : {
		display        : 'flex',
		position       : 'static',
		justifyContent : 'space-between',
		flexWrap       : 'nowrap'
	},
	title          : {
		display                      : 'none',
		[theme.breakpoints.up('sm')]: {
			display : 'block'
		}
	},
	menuItem       : {
		paddingTop    : '10px',
		paddingBottom : '0px'
	},
	search         : {
		color                        : 'inherit',
		display                      : 'flex',
		flexGrow                     : 2,
		align                        : 'center',
		borderRadius                 : theme.shape.borderRadius,
		backgroundColor              : alpha(theme.palette.common.white, 0.05),
		'&:hover'                    : {
			backgroundColor : alpha(theme.palette.common.white, 0.15)
		},
		// marginRight                  : theme.spacing(2),
		// marginLeft                   : 0,
		maxWidth                     : '500px',
		[theme.breakpoints.up('sm')]: {
			marginLeft : theme.spacing(-11)
		}
	},
	searchIcon     : {
		padding        : theme.spacing(0, 2),
		height         : '100%',
		position       : 'absolute',
		pointerEvents  : 'none',
		display        : 'flex',
		alignItems     : 'center',
		justifyContent : 'center'
	},
	inputRoot      : {
		color : 'inherit'
	},
	//this is controlling the location of the search bar
	inputInput     : {
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
	sectionDesktop : {
		display                      : 'none',
		[theme.breakpoints.up('md')]: {
			display : 'flex'
		}
	},
	sectionMobile  : {
		display                      : 'flex',
		[theme.breakpoints.up('md')]: {
			display : 'none'
		}
	},
	toolbar        : {
		justifyContent : 'space-between'
	},
	menuNavLink    : {
		textDecoration : 'none'
	},
	activeLink     : {
		borderBottom : '1px solid grey'
	},
	dataInitials   : {
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
	}
}));

export { useStyles };
