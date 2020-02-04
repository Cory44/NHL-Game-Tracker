import React from 'react';

export default class GameInfo extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			homeScore: 0,
			awayScore: 0
		};
	}

	componentDidMount() {
		this.getGameInfo();
	}

	getGameInfo() {
		const id = this.props.id;

		fetch('https://statsapi.web.nhl.com/api/v1/game/' + id + '/feed/live')
		.then(response => {
			return response.json();
		})
		.then(response => {
			let homeScore = response['liveData']['linescore']['teams']['home']['goals']
			let awayScore = response['liveData']['linescore']['teams']['away']['goals']

			this.setState({
				homeScore: homeScore,
				awayScore: awayScore
			});
		});
	}

	render() {
		return (
			<>
				<h4 className="center-align col s12">Final</h4>
				<h3 className="center-align col m5 s12">{this.state.homeScore}</h3>
				<span className="col m2 s12"></span>
				<h3 className="center-align col m5 s12">{this.state.awayScore}</h3>
			</>
		);
	}


}