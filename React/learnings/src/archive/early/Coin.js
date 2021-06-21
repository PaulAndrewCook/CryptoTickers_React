import React, { Component } from 'react';
import './Coin.css';

class Coin extends Component {
	render() {
		return (
			<div>
				<h1> Flip a Coin!</h1>
				<div className="Coin">
					{console.log('head', this.props.head)}
					{this.props.head ? (
						<img src="https://tinyurl.com/react-coin-heads-jpg" alt="heads" />
					) : (
						<img src="https://tinyurl.com/react-coin-heads-jpg" alt="heads" />
					)}
				</div>
			</div>
		);
	}
}

export default Coin;
