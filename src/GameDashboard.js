import React from 'react';

class GameDashboard extends React.Component {
	constructor(props, match) {
		super(props);
	}

	render() {

		return (
			<div>
				<h1>Hello</h1>
				<h3>{this.props.match.params.id}</h3>
			</div>
		);
	}
}

export default GameDashboard;