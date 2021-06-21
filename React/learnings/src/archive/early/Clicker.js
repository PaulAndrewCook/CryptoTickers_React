import React, { Component } from 'react';

class Clicker extends Component {
	state = {
		displayBtn : true,
		num        : 1
	};

	genNew = (e) => {
		let rand = Math.floor(Math.random() * 10) + 1;
		rand === 7 ? this.setState({ displayBtn: false }) : this.setState({ displayBtn: true });
		this.setState({ num: rand });
	};

	render() {
		return (
			<div>
				<h1>Your Random Number is:{this.state.num}</h1>
				{this.state.displayBtn ? <button onClick={this.genNew}> Click Me!</button> : <h2>You Win!</h2>}
			</div>
		);
	}
}

export default Clicker;
