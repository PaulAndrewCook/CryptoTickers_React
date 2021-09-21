import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	main        : {
		padding    : 0,
		margin     : 0,
		height     : '100vh',
		width      : '100vw',
		background : 'primary',
		elevation  : 3
	},
	container   : {
		justifyContent : 'center',
		alignItems     : 'center',
		textAlign      : 'center'
	},
	dark        : {
		padding    : 0,
		margin     : 0,
		height     : '100vh',
		width      : '100vw',
		background : 'black',
		elevation  : 3
	},
	form        : {
		margin         : '2rem 0 0 0',
		padding        : '0 1rem',
		justifyContent : 'center'
	},

	ticker      : {
		// display               : 'flex',
		height                : '64px',
		flexWrap              : 'nowrap',
		flexGrow              : 1,
		curson                : 'pointer',
		'& .appearItem'       : {
			display : 'none'
		},
		'&:hover .appearItem' : {
			[theme.breakpoints.up('sm')]: {
				display : 'inline-block'
			}
		},
		'& .noXsDisplay'      : {
			[theme.breakpoints.only('xs')]: {
				display : 'none'
			}
		},
		'& .disabledXs'       : {
			[theme.breakpoints.only('xs')]: {
				disable : 'true',
				display : 'none'
			}
		},
		'& .enabledXs'        : {
			[theme.breakpoints.only('xs')]: {
				display      : 'inline-block',
				paddingRight : '0',
				color        : '#BEBEBE',
				width        : '75%',
				height       : '75%'
			}
		}
	},
	tickerGrid  : {
		direction                      : 'row',
		justifyContent                 : 'space-between',
		alignItems                     : 'center',
		'& .alignRight'                : {
			textAlign : 'right'
		},
		[theme.breakpoints.only('xs')]: {
			paddingRight : '10px'
		}
	},
	darkTickers : {
		'& .MuiPaper-root' : {
			backgroundColor : '#757de8'
		},
		'& .noXsDisplay'   : {
			[theme.breakpoints.only('xs')]: {
				display : 'none'
			}
		}
	}
}));

export { useStyles };
