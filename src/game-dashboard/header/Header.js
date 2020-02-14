import React from 'react';
import Record from './Record.js';

class Header extends React.Component {

	render() {
		let response = this.props.response;

		let homeTeam = response['gameData']['teams']['home']['name'];
		let homeTeamId = response['gameData']['teams']['home']['id'];

		let awayTeam = response['gameData']['teams']['away']['name'];
		let awayTeamId = response['gameData']['teams']['away']['id'];

		return(
			<div className="row">
				<div className="col m5 s12 center-align">
					<h3>{homeTeam}</h3>
					<Record teamId={homeTeamId} />
				</div>

				<h3 className="col m2 s12 center-align">VS.</h3>

				<div className="col m5 s12 center-align">
					<h3>{awayTeam}</h3>
					<Record teamId={homeTeamId} />
				</div>
			</div>
		);
	}
}

export default Header;