import React from 'react';
import GameInfo from './GameInfo.js';
import Roster from './Roster.js';

class Preview extends React.Component {
	constructor(props) {
		super(props);
		this.state = {

		};
	}

	render() {
		return (
			<div className="row">
				<GameInfo id={this.props.id} />
				<div className="col s6">
					<Roster id={this.props.homeTeamId} />
				</div>
				<div className="col s6">
					<Roster id={this.props.awayTeamId} />
				</div>
			</div>
		);
	}
}
export default Preview;