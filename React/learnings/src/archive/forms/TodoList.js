import React, { Component } from 'react';
import TodoItem from './TodoItem';
import TodoForm from './TodoForm';
import { v4 as uuidv4 } from 'uuid';

class TodoList extends Component {
	//Keep track of all todos in an array
	//Keep track and update the state of item from click to generate form to update form
	state = {
		tasks : [
			{ task: 'Eat Lunch', id: '01', isEdit: false },
			{ task: 'Mow Lawn', id: '1', isEdit: false }
		],
		isNew : false
	};

	//Handle Add
	addTask = (task) => {
		let newItem = { ...task, id: uuidv4() };
		this.setState({
			tasks : [
				...this.state.tasks,
				newItem
			]
		});
	};

	//Handle AddClick
	handleAdd = () => {
		this.setState({
			isNew : true
		});
	};

	//Handle Edit
	editTask = (id, updatedTask) => {
		const updatedTasks = this.state.tasks.map((tsk) => {
			if (tsk.id === id) {
				return { ...tsk, task: updatedTask };
			}
			return tsk;
		});
		this.setState({ tasks: updatedTasks });
	};

	//Handle Delete
	remove = (id) => {
		this.setState({
			tasks : this.state.tasks.filter((tsk) => tsk.id !== id)
		});
	};

	toggleCompletion = (id) => {
		const updatedTasks = this.state.tasks.map((tsk) => {
			if (tsk.id === id) {
				return { ...tsk, completed: !tsk.completed };
			}
			return tsk;
		});
		this.setState({ tasks: updatedTasks });
	};

	render() {
		//Handle AddClick

		//map 3 functions into every todo item click, edit, and delete
		const tasks = this.state.tasks.map((tsk) => (
			<TodoItem
				task={tsk.task}
				id={tsk.id}
				key={tsk.id}
				completed={tsk.completed}
				toggleCompletion={this.toggleCompletion}
				edit={this.editTask}
				remove={this.remove}
				editTask={this.editTask}
			/>
		));
		return (
			<div>
				<h1>Todo App</h1>
				<h3>
					New Todo:<TodoForm addTask={this.addTask} />
				</h3>
				{tasks}
			</div>
		);
	}
}

export default TodoList;
