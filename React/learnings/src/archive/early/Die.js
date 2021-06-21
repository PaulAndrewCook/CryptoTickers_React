import React, { Component } from 'react';
import './Die.css';

class Die extends Component {
	render() {
		return (
			<div>
				<h1>Connected Dice</h1>
				<h2>Your Dice sir: </h2>

				<i className={`Die fas fa-dice-${this.props.dieNum1} ${this.props.rolling && 'shaking'}`} />
				<i className={`Die fas fa-dice-${this.props.dieNum2} ${this.props.rolling && 'shaking'}`} />
				<p>
					{this.props.dieNum1} {this.props.dieNum2}
				</p>
			</div>
		);
	}
}

export default Die;
