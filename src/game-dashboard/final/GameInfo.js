import React from 'react';

export default class GameInfo extends React.Component {

	render() {
		const response = this.props.response;
		const homeScore = response['liveData']['linescore']['teams']['home']['goals'];
		const awayScore = response['liveData']['linescore']['teams']['away']['goals'];

		return (
			<>
				<h3 className="center-align col m5 s12">{homeScore}</h3>
				<span className="col m2 s12"></span>
				<h3 className="center-align col m5 s12">{awayScore}</h3>
			</>
		);
	}
}