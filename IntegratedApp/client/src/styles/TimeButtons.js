import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	btn       : {
		justifyContent : 'center',
		'& #active'    : {
			border          : '24px',
			backgroundColor : '#e8f0fe',
			color           : '#1967d2',
			fontWeight      : '500',
			letterSpacing   : '.3px',
			textTransform   : 'uppercase',
			disabled        : true
		},
		'& .TimeFrame' : {
			transition : 'all 0.5s ease-in-out',
			border     : 'none'
		}
	},
	TimeFrame : {
		'&:hover' : {
			backgroundColor : '#e8f0fe'
		}
	}
}));

export { useStyles };
