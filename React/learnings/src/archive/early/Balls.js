import React, { Component } from 'react';
import './Balls.css';

class Balls extends Component {
	render() {
		return (
			<div className="Balls">
				<h1>{this.props.title}</h1>
				<ul>
					<li>{this.props.num}</li>
				</ul>
			</div>
		);
	}
}

export default Balls;
