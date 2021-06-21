import React, { Component } from 'react';
import Box from './Box';
import Form from './Form';
import { v4 as uuidv4 } from 'uuid';

class BoxList extends Component {
	state = {
		boxes : [
			{ width: 25, height: 25, color: 'purple', id: uuidv4() }
		]
	};

	addItem = (item) => {
		let newItem = { ...item, id: uuidv4() };
		this.setState({
			boxes : [
				...this.state.boxes,
				newItem
			]
		});
	};

	remove = (id) => {
		this.setState({
			boxes : this.state.boxes.filter((box) => box.id !== id)
		});
	};

	render() {
		const boxes = this.state.boxes.map((box) => (
			<Box
				key={box.id}
				id={box.id}
				height={box.height}
				width={box.width}
				color={box.color}
				remove={this.remove}
			/>
		));
		return (
			<div>
				<h1> Box List</h1>
				<div>
					<h3> {this.state.color} </h3>
					{console.log('boxes', boxes)}
					<Form addItem={this.addItem} />
				</div>
				{boxes}
			</div>
		);
	}
}

export default BoxList;
