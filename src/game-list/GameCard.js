import React from 'react';

class GameCard extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			homeTeam: '',
			awayTeam: ''
		};
	}

	componentDidMount() {
		this.getGameData();
	}

	getGameData() {
		const id = this.props.id;
		fetch('https://statsapi.web.nhl.com/api/v1/game/' + id + '/feed/live')
		.then(response => {
			return response.json();
		})
		.then(response => {
			let time;

			let awayScore = response['liveData']['linescore']['teams']['away']['goals']
			let homeScore = response['liveData']['linescore']['teams']['home']['goals']

			let awayTeam = response['gameData']['teams']['away']['name'];
			let homeTeam = response['gameData']['teams']['home']['name'];

			if (response['gameData']['status']['abstractGameState'] == 'Preview') {
					let offset = new Date().getTimezoneOffset();
					time = new Date(response['gameData']['datetime']['dateTime']).toLocaleTimeString([], {hour: 'numeric', minute:'2-digit'});
			} else {
				time = "Hello";
			}

			this.setState({
				homeTeam: homeTeam,
				homeScore: homeScore,
				awayTeam: awayTeam,
				awayScore: awayScore,
				time: time
			});
		});
	}

	componentWillUnmount() {

	}

	render() {
		return (
			<div className="game">
				<p>{this.state.homeTeam} - {this.state.homeScore}</p>
				<p>{this.state.awayTeam} - {this.state.awayScore}</p>
				<p>{this.state.time}</p>
			</div>
		);
	}
}

export default GameCard;
