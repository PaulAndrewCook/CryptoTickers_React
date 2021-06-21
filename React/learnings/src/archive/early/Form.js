import React, { Component } from 'react';
import { v4 as uuidv4 } from 'uuid';

class Form extends Component {
	state = { width: '', height: '', color: '' };

	handleChange = (evt) => {
		this.setState({ [evt.target.name]: evt.target.value });
	};

	handleSubmit = (evt) => {
		evt.preventDefault();
		const newState = { ...this.state, id: uuidv4() };
		this.props.addItem(newState);
		this.setState({ width: '', height: '', color: '' });
	};

	render() {
		return (
			<form onSubmit={this.handleSubmit}>
				<div>
					<label htmlFor="color">Color</label>
					<input type="text" name="color" id="color" value={this.state.color} onChange={this.handleChange} />
				</div>
				<div>
					<label htmlFor="width">Width</label>
					<input type="text" name="width" id="Width" value={this.state.width} onChange={this.handleChange} />
				</div>
				<div>
					<label htmlFor="height">Height</label>
					<input
						type="text"
						name="height"
						id="height"
						value={this.state.height}
						onChange={this.handleChange}
					/>
				</div>
				<button>Make Box</button>
			</form>
		);
	}
}

export default Form;
