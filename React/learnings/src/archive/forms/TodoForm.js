import React, { Component } from 'react';

class TodoForm extends Component {
	state = {
		task : ''
	};

	// editForm = (tsk) => {
	// 	this.setState({ task: tsk });
	// };

	handleSubmit = (evt) => {
		evt.preventDefault();
		this.props.addTask({ ...this.state, completed: false });
		this.setState({ task: '' });
	};

	handleChange = (evt) => {
		this.setState({
			[evt.target.name]: evt.target.value
		});
	};

	render() {
		return (
			<div>
				<form onSubmit={this.handleSubmit}>
					<label htmlFor="todoform" />
					<input type="text" id="todoform" name="task" value={this.state.task} onChange={this.handleChange} />
					<button>+</button>
				</form>
			</div>
		);
	}
}

export default TodoForm;
// {editForm};
