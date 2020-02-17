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

		const response = this.props.response;
		const homeTeamId = response['gameData']['teams']['home']['id'];
		const awayTeamId = response['gameData']['teams']['away']['id'];

		return (
			<div className="row">
				<hr />
				<div className="col m12 l6">
					<Roster id={homeTeamId} />
				</div>
				<div className="col m12 l6">
					<Roster id={awayTeamId} />
				</div>
			</div>
		);
	}
}
export default Preview;
