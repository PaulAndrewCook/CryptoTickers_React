var msg = '';

class Machine extends React.Component {
	render() {
		const { s1, s2, s3 } = this.props;
		const equal = s1 === s2 && s2 === s3;
		return (
			<div className="Machine">
				<p>
					{this.props.s1} {this.props.s2} {this.props.s3}
				</p>
				<p> {equal ? 'You win' : 'You Lose'}</p>
			</div>
		);
	}
}
