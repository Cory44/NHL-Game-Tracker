import React from 'react';
import Goal from './Goal.js';

export default class Scoring extends React.Component {

	render() {

		const response = this.props.response;

		const plays = response['liveData']['plays']['scoringPlays'];
		const goals = [];

		for (let i = 0; i < plays.length; i++){
			let team = response['liveData']['plays']['allPlays'][plays[i]]['team']['triCode'];
			let period = response['liveData']['plays']['allPlays'][plays[i]]['about']['ordinalNum']
			let time = response['liveData']['plays']['allPlays'][plays[i]]['about']['periodTime'];
			let description = response['liveData']['plays']['allPlays'][plays[i]]['result']['description'];

			goals[i] = {team: team, period: period, time: time, desc: description};
		}

		const scoring = [];

		for (let i = 0; i < goals.length; i++) {
			scoring[i] = <Goal team={goals[i]['team']}
												 period={goals[i]['period']}
												 time={goals[i]['time']}
												 desc={goals[i]['desc']} />
		}

		if (goals.length === 0) {
			return (
				<div className="row">
					<h4>Scoring</h4>
					<h6>No scoring</h6>
				</div>
			);
		} else {
			return(
				<div className="row">
					<h4>Scoring</h4>
					<p className="col m1 s2"><strong>Team</strong></p>
					<p className="col m1 s2"><strong>Period</strong></p>
					<p className="col m1 s2"><strong>Time</strong></p>
					<p className="col m9 s6"><strong>Scorers</strong></p>
					{scoring}
				</div>
			);
		}
	}

}