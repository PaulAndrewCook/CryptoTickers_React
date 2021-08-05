import React, { useContext, useState } from 'react';
import WindowedSelect from 'react-windowed-select';
import { Symbols } from '../utils/Symbols';
import { createTicker } from '../actions/ApiTickerFns';
import { DispatchContext } from '../context/TickerContext';
import { UserContext } from '../context/UserContext';
import SearchIcon from '@material-ui/icons/Search';

const groupStyles = {
	display        : 'flex',
	alignItems     : 'center',
	justifyContent : 'space-between'
};

const groupBadgeStyles = {
	backgroundColor : '#EBECF0',
	borderRadius    : '2em',
	color           : '#172B4D',
	display         : 'inline-block',
	fontSize        : 12,
	fontWeight      : 'normal',
	lineHeight      : '1',
	minWidth        : 2,
	maxWidth        : 30,
	padding         : '0.16666666666667em 0.5em',
	textAlign       : 'center'
};

const customStyles = {
	option      : (provided, state) => ({
		...provided,
		color   : state.isSelected ? 'black' : '#cacbcf',
		padding : 15
	}),
	container   : (provided, state) => ({
		...provided,
		fontFamily      : 'inherit',
		backgroundColor : 'inherit',
		fontWeight      : 'bold',
		display         : 'flex',
		width           : '100%',
		minWidth        : 200
	}),
	control     : (provided, state) => ({
		...provided,
		fontFamily      : 'inherit',
		backgroundColor : 'inherit',
		fontWeight      : 'bold',
		display         : 'flex',
		width           : '100%',
		minWidth        : 200
	}),
	placeholder : (provided, state) => ({
		...provided,
		color      : 'white',
		fontFamily : 'inherit'
	}),
	input       : (provided, state) => ({
		...provided,
		color      : 'white',
		fontFamily : 'inherit',
		fontWeight : 'bold'
	})
};

const formatGroupLabel = (data) => (
	<div style={groupStyles}>
		<span>{data.label}</span>
		<span style={groupBadgeStyles}>{data.options.length}</span>
	</div>
);

const Placeholder = (props) => {
	return (
		<div style={{ display: 'flex', marginLeft: '10px', alignItems: 'center' }}>
			<SearchIcon style={{ marginRight: '10px' }} />
			{props.children}
		</div>
	);
};

export default function Searchbar() {
	const dispatch = useContext(DispatchContext);
	const user = useContext(UserContext);
	console.log('in searchbar, user', user);

	const [
		value,
		setValue
	] = useState();

	const handleChange = (user, data) => {
		console.log('in onchange, user', user);
		if (data) {
			createTicker(data.value, user)(dispatch);
			setValue(null);
		}
	};

	return (
		<WindowedSelect
			styles={customStyles}
			components={{ Placeholder }}
			placeholder={'Add Investment'}
			value={value}
			options={Symbols}
			formatGroupLabel={formatGroupLabel}
			isClearable={true}
			isSearchable={true}
			theme={(theme) => ({
				...theme,
				colors : {
					...theme.colors,
					primary25 : '#757de8',
					primary   : '#757de8'
				}
			})}
			onChange={(evt) => handleChange(user, evt)}
		/>
	);
}
