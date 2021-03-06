import React from 'react';

export default class GameInfo extends React.Component {
	render() {
		const response = this.props.response;

		let awayScore = response['liveData']['linescore']['teams']['away']['goals'];
		let homeScore = response['liveData']['linescore']['teams']['home']['goals'];


		return (
			<div>
				<h3 className="center-align col m5 s12">{homeScore}</h3>
				<span className="col m2 s12"></span>
				<h3 className="center-align col m5 s12">{awayScore}</h3>
			</div>
		);
	}
}