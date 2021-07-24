import React, { useState, useRef, useCallback, useContext } from 'react';
import { useCombobox } from 'downshift';
import { useVirtual } from 'react-virtual';
import { menuStyles, comboboxStyles } from '../utils/VirtualBoxItems';
import { DispatchContext } from '../context/TickerContext';
import { createTicker } from '../actions/ApiTickerFns';
import Symbols from '../utils/Symbols';

function getItems(search) {
	return Symbols.filter((n) => n.toLowerCase().includes(search));
}

export default function DropdownCombobox() {
	const dispatch = useContext(DispatchContext);
	const [
		inputValue,
		setInputValue
	] = useState('');
	const items = getItems(inputValue);
	const listRef = useRef();
	const rowVirtualizer = useVirtual({
		size         : items.length,
		parentRef    : listRef,
		estimateSize : useCallback(() => 20, []),
		overscan     : 2
	});
	const {
		getInputProps,
		getItemProps,
		getLabelProps,
		getMenuProps,
		highlightedIndex,
		selectedItem,
		getComboboxProps,
		isOpen
	} = useCombobox({
		items,
		inputValue,
		onInputValueChange       : ({ inputValue: newValue }) => setInputValue(newValue),
		scrollIntoView           : () => {},
		onHighlightedIndexChange : ({ highlightedIndex }) => rowVirtualizer.scrollToIndex(highlightedIndex)
	});
	return (
		<div>
			<div>
				<label {...getLabelProps()}>Add Investment:</label>
				<div {...getComboboxProps()} style={comboboxStyles}>
					<form
						onSubmit={(e) => {
							e.preventDefault();
							createTicker(inputValue)(dispatch);
							// dispatch({ type: 'ADD', ticker: value });
							setInputValue('');
						}}
					>
						<input {...getInputProps({ type: 'text' })} />
					</form>
				</div>
			</div>
			<ul
				{...getMenuProps({
					ref   : listRef,
					style : menuStyles
				})}
			>
				{isOpen && (
					<React.Fragment>
						<li key="total-size" style={{ height: rowVirtualizer.totalSize }} />
						{rowVirtualizer.virtualItems.map((virtualRow) => (
							<li
								key={items[virtualRow.index].id}
								{...getItemProps({
									index : virtualRow.index,
									item  : items[virtualRow.index],
									style : {
										backgroundColor : highlightedIndex === virtualRow.index ? '#757de8' : 'white',
										fontWeight      :
											selectedItem && selectedItem.id === items[virtualRow.index].id
												? 'bold'
												: 'normal',
										position        : 'absolute',
										top             : 0,
										left            : 0,
										width           : '100%',
										height          : virtualRow.size,
										transform       : `translateY(${virtualRow.start}px)`
									}
								})}
							>
								{items[virtualRow.index]}
							</li>
						))}
					</React.Fragment>
				)}
			</ul>
		</div>
	);
}
// return <DropdownCombobox />;
