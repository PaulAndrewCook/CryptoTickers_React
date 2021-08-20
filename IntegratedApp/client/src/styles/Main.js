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
		background : 'black'
	},
	form        : {
		margin         : '2rem 0 0 0',
		padding        : '0 1rem',
		justifyContent : 'center'
	},

	ticker      : {
		display               : 'flex',
		height                : '64px',
		flexWrap              : 'nowrap',
		flexGrow              : 1,
		'& .appearItem'       : {
			display : 'none'
		},
		'&:hover .appearItem' : {
			display : 'inline-block'
		},
		'& .dark'             : {
			background : 'black'
		}
	},
	tickerGrid  : {
		direction       : 'row',
		justifyContent  : 'space-between',
		alignItems      : 'center',
		'& .alignRight' : {
			textAlign : 'right'
		}
	},
	darkTickers : {
		'& .MuiPaper-root' : {
			backgroundColor : 'purple'
		}
	}
}));

export { useStyles };
