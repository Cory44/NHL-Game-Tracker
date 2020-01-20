import React from 'react';
import Time from './Time.js';
import './GameCard.css';

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

			let status = response['gameData']['status']['abstractGameState'];

			let awayScore = response['liveData']['linescore']['teams']['away']['goals']
			let homeScore = response['liveData']['linescore']['teams']['home']['goals']

			let awayTeam = response['gameData']['teams']['away']['name'];
			let homeTeam = response['gameData']['teams']['home']['name'];

			if (status === 'Preview') {
	  		time = new Date(response['gameData']['datetime']['dateTime']).toLocaleTimeString([], {hour: 'numeric', minute:'2-digit'});
	  	} else if (status === 'Live') {
	  		time = <Time id={id} />;
	  	} else {
	  		time = 'Final';	
	  	}

			this.setState({
				homeTeam: homeTeam,
				homeScore: homeScore,
				awayTeam: awayTeam,
				awayScore: awayScore,
				time: time,
			});
		});
	}

	componentWillUnmount() {

	}

	render() {
		return (
			<div className="col s12 m4">
				<div className="card game">
					<div className="row">
						<p className="col l10 left-align">{this.state.homeTeam}</p>
						<p className="col l2 right-align">{this.state.homeScore}</p>
					</div>

					<div className="row">
						<p className="col s10 left-align">{this.state.awayTeam}</p>
						<p className="col s2 right-align">{this.state.awayScore}</p>
					</div>

					<div className="row">
						<p className="col s12">{this.state.time}</p>
					</div>
				</div>
			</div>
		);
	}
}

export default GameCard;
