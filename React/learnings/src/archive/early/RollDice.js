import React, { Component } from 'react';
import Die from './Die';
import './RollDice.css';

class RollDice extends Component {
	state = {
		inProcess : false,
		dieNum1   : 'one',
		dieNum2   : 'one'
	};

	genDice = () => {
		let dieNum = [];
		const regulars = {
			1 : 'one',
			2 : 'two',
			3 : 'three',
			4 : 'four',
			5 : 'five',
			6 : 'six'
		};
		for (let i = 0; i < 2; i++) {
			let rand = Math.floor(Math.random() * 6) + 1;
			let temp = dieNum.push(regulars[rand]);
		}
		this.setState({ dieNum1: dieNum[0], dieNum2: dieNum[1], inProcess: true });

		setTimeout(() => {
			this.setState({ inProcess: false });
		}, 1000);
	};

	render() {
		return (
			<div className="RollDice">
				<Die dieNum1={this.state.dieNum1} dieNum2={this.state.dieNum2} rolling={this.state.inProcess} />
				<button onClick={this.genDice} disabled={this.state.inProcess}>
					{this.state.inProcess ? 'Rolling...' : 'Roll Dice'}
				</button>
			</div>
		);
	}
}

export default RollDice;
