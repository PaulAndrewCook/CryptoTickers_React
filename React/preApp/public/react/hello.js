class Hello extends React.Component {
	render() {
		let bangs = '!'.repeat(this.props.num);
		return (
			<div>
				<h1>
					Hi there {this.props.data}
					{bangs}
				</h1>
				<h3>
					from {this.props.num}
					{bangs}
				</h3>
			</div>
		);
	}
}
