import React from 'react';
import Record from './Record.js';
import Time from '../../game-list/Time.js';
import GameInfo from '../preview/GameInfo.js';

export default class Header extends React.Component {

	render() {
		let response = this.props.response;

		let homeTeam = response['gameData']['teams']['home']['name'];
		let homeTeamId = response['gameData']['teams']['home']['id'];

		let awayTeam = response['gameData']['teams']['away']['name'];
		let awayTeamId = response['gameData']['teams']['away']['id'];
		const status = response['gameData']['status']['abstractGameState'];
		let time;

		if (status === 'Preview') {
	    time = <GameInfo response={response} />
  	} else if (status === 'Live') {
	    // time = <Time id={this.props.id} />;
	    time = "Now";
    } else {
	    time = 'Final';	
    }

		return(
			<div className="row">
				<div className="col m5 s12 center-align">
					<h3>{homeTeam}</h3>
					<Record teamId={homeTeamId} />
				</div>

				<h3 className="col m2 s12 center-align">VS.</h3>

				<div className="col m5 s12 center-align">
					<h3>{awayTeam}</h3>
					<Record teamId={awayTeamId} />
				</div>
				<div className="col s12 center-align">{time}</div>
			</div>
		);
	}
}
