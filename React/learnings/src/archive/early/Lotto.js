import React, { Component } from 'react';
import Balls from './Balls';

class Lotto extends Component {
	static defaultProps = {
		title    : 'Lotto',
		numBalls : 6,
		maxNum   : 40
	};

	state = { numArr: Array.from({ length: this.props.numBalls }) };

	randNum = (maxNum) => {
		let num = Math.floor(Math.random() * maxNum) + 1;
		return num;
	};

	generate = () => {
		this.setState((curState) => ({
			numArr : curState.numArr.map((n) => this.randNum(this.props.maxNum))
		}));
	};

	handleClick = () => {
		this.generate();
	};

	render() {
		return (
			<div>
				<div>{this.state.numArr.map((n) => <Balls num={n} />)}</div>
				<button onClick={this.handleClick}> Generate Lotto Numbers</button>
			</div>
		);
	}
}

export default Lotto;
