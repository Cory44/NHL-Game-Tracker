import React from 'react';
import Header from './header/Header.js';

class GameDashboard extends React.Component {
	constructor(props, match) {
		super(props);
	}

	render() {

		return (
			<Header id={this.props.match.params.id} />
		);
	}
}

export default GameDashboard;