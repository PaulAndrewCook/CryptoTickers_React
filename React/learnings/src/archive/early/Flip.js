import React, { Component } from 'react';
import Coin from './Coin';

class Flip extends Component {
	state = {
		head    : true,
		headCnt : 0,
		tailCnt : 0,
		flips   : 0
	};

	rand = () => {
		let num = Math.floor(Math.random() * 2) + 1;
		return num;
	};

	handleClick = () => {
		let newHead = this.rand() === 1 ? true : false;
		this.setState((curState) => {
			return {
				head    : newHead,
				flips   : curState.flips + 1,
				headCnt : curState.headCnt + (newHead === true ? 1 : 0),
				tailCnt : curState.tailCnt + (newHead === false ? 1 : 0)
			};
		});
	};

	render() {
		return (
			<div>
				<Coin head={this.state.head} />

				<h2>
					There have been {this.state.flips} flips! Resulting in {this.state.headCnt} heads and{' '}
					{this.state.tailCnt} tails!
				</h2>

				<button onClick={this.handleClick}>Flip Coin</button>
			</div>
		);
	}
}

export default Flip;
