import React, { Component } from 'react';
import './TodoItem.css';

class TodoItem extends Component {
	state = {
		task      : this.props.task,
		isEditing : false
	};

	toggleForm = () => {
		this.setState({ isEditing: !this.state.isEditing });
	};

	handelRemove = () => {
		this.props.remove(this.props.id);
	};

	handleSubmit = (evt) => {
		evt.preventDefault();
		this.props.editTask(this.props.id, this.state.task);
		this.toggleForm();
	};

	handleChange = (evt) => {
		this.setState({
			[evt.target.name]: evt.target.value
		});
	};

	handleToggle = (evt) => {
		this.props.toggleCompletion(this.props.id);
	};

	render() {
		let result = [];
		if (this.state.isEditing) {
			result = (
				<div className="TodoList">
					<form onSubmit={this.handleSubmit}>
						<input type="text" value={this.state.task} name="task" onChange={this.handleChange} />
						<button>Save</button>
					</form>
				</div>
			);
		} else {
			result = (
				<div className="TodoList">
					<h3 className={this.props.completed ? 'completed' : ''} onClick={this.handleToggle}>
						{this.props.task}
					</h3>
					<button onClick={this.toggleForm}>Edit</button>
					<button onClick={this.handelRemove}>Remove</button>
				</div>
			);
		}
		return result;
	}
}

export default TodoItem;
