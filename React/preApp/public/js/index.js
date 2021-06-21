class App extends React.Component {
	render() {
		return (
			<div>
				<Machine s1="X" s2="Y" s3="Z" />
				<Machine s1="X" s2="X" s3="X" />
				<Machine s1="Y" s2="Y" s3="Z" />
			</div>
		);
	}
}

ReactDOM.render(<App />, document.getElementById('root'));
