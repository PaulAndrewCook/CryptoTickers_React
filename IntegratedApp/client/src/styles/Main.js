import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	main    : {
		padding    : 0,
		margin     : 0,
		height     : '100vh',
		width      : '100vw',
		background : 'primary',
		elevation  : 3
	},
	dark    : {
		padding    : 0,
		margin     : 0,
		height     : '100vh',
		width      : '100vw',
		background : 'black',
		elevation  : 3
	},
	form    : {
		margin  : '2rem 0',
		padding : '0 1rem'
	},
	tickers : {}
}));

export { useStyles };
