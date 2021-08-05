import React, { useContext, useState } from 'react';
import WindowedSelect from 'react-windowed-select';
import { Symbols } from '../utils/Symbols';
import { DispatchContext } from '../context/TickerContext';
import { UserContext } from '../context/UserContext';
import { ListItemSecondaryAction, IconButton } from '@material-ui/core';
import { NotInterestedSharp } from '@material-ui/icons';
import { editTicker } from '../actions/ApiTickerFns';

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
	option    : (provided, state) => ({
		...provided,
		color   : state.isSelected ? 'black' : '#cacbcf',
		padding : 15
	}),
	container : (provided, state) => ({
		...provided,
		fontFamily      : 'inherit',
		backgroundColor : 'inherit',
		display         : 'flex',
		marginLeft      : 0,
		paddingLeft     : 0,
		width           : '50%'
	}),
	control   : (provided, state) => ({
		...provided,
		backgroundColor : 'white',
		border          : 0,
		boxShadow       : 'none',
		display         : 'flex',
		marginLeft      : 0,
		paddingLeft     : 0,
		width           : '100%'
	}),
	input     : (provided, state) => ({
		...provided,
		color      : 'inherit',
		fontFamily : 'inherit'
	})
};

const formatGroupLabel = (data) => (
	<div style={groupStyles}>
		<span>{data.label}</span>
		<span style={groupBadgeStyles}>{data.options.length}</span>
	</div>
);

function UseTickerForm({ id, symbol, toggleEditForm }) {
	const dispatch = useContext(DispatchContext);
	const user = useContext(UserContext);
	console.log('in tickerform, user', symbol);

	const [
		value,
		setValue
	] = useState();

	const handleChange = (id, user, data) => {
		console.log('in usetickerform, user', user.user._id, 'data', data);
		if (data) {
			editTicker(id, data.value, user.user._id)(dispatch);
			setValue(null);
		}
		toggleEditForm();
	};

	const Placeholder = (symbol) => {
		return <div style={{ display: 'flex', marginLeft: '10px', alignItems: 'center' }}>{symbol.children}</div>;
	};

	return (
		<React.Fragment>
			<WindowedSelect
				styles={customStyles}
				value={value}
				options={Symbols}
				components={{ Placeholder }}
				placeholder={symbol}
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
				onChange={(data, evt) => handleChange(id, user, data, evt)}
			/>
			<ListItemSecondaryAction>
				<IconButton onClick={() => toggleEditForm()}>
					<NotInterestedSharp aria-label="Do not edit, close" />
				</IconButton>
			</ListItemSecondaryAction>
		</React.Fragment>
	);
}

export default UseTickerForm;
