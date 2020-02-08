import React from 'react';
import Goal from './Goal.js';

export default class Scoring extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			goals: [],
		};
	}

	componentDidMount() {
		this.getScoring();
	}

	getScoring() {
		const id = this.props.id;

		fetch('https://statsapi.web.nhl.com/api/v1/game/' + id + '/feed/live')
		.then(response => {
			return response.json();
		})
		.then(response => {

			let plays = response['liveData']['plays']['scoringPlays'];
			let goals = [];

			for (let i = 0; i < plays.length; i++){
				let team = response['liveData']['plays']['allPlays'][plays[i]]['team']['triCode'];
				let period = response['liveData']['plays']['allPlays'][plays[i]]['about']['ordinalNum']

				// if (period === 1)
				// 	period = period + "st";
				// else if (period === 2)
				// 	period = period + "nd";
				// else if (period === 3)
				// 	period = period + "rd";

				let time = response['liveData']['plays']['allPlays'][plays[i]]['about']['periodTime'];
				let description = response['liveData']['plays']['allPlays'][plays[i]]['result']['description'];

				goals[i] = {team: team, period: period, time: time, desc: description};
			}

			this.setState({
				goals: goals,
			});
		});
	}

	render() {
		const goals = [];
		const goal = this.state.goals;

		for (let i = 0; i < goal.length; i++) {
			goals[i] = <Goal team={goal[i]['team']}
												period={goal[i]['period']}
												time={goal[i]['time']}
												desc={goal[i]['desc']} />
		}

		if (goal.length === 0) {
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
					{goals}
				</div>
			);
		}
	}

}