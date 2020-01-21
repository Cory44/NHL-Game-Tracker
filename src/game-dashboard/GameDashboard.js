import React from 'react';
import Header from './header/Header.js';
import Preview from './preview/Preview.js';
import LiveView from './live/Live.js';

class GameDashboard extends React.Component {
	constructor(props) {
		super(props);
		this.state = { homeTeamId: 0};
	}

	componentDidMount() {
		this.getGameData();
	}	

	getGameData() {
		const id = this.props.match.params.id;

		fetch('https://statsapi.web.nhl.com/api/v1/game/' + id + '/feed/live')
		.then(response => {
			return response.json();
		})
		.then(response => {
			let status = response['gameData']['status']['abstractGameState'];

			let homeTeamId = response['gameData']['teams']['home']['id'];
			let homeTeam = response['gameData']['teams']['home']['name'];

			let awayTeam = response['gameData']['teams']['away']['name'];
			let awayTeamId = response['gameData']['teams']['away']['id'];

			// let time = new Date(response['gameData']['datetime']['dateTime']).toLocaleTimeString([], {hour: 'numeric', minute:'2-digit'});

			this.setState({
				homeTeamId: homeTeamId,
				homeTeam: homeTeam,
				awayTeamId: awayTeamId,
				awayTeam: awayTeam,
				status: status
				// time: time
			});
		});
	}

	render() {
		let header = '';

		if (this.state.homeTeamId !== 0){
			header = <Header 
					homeTeamId={this.state.homeTeamId}
					homeTeam={this.state.homeTeam}
					awayTeamId={this.state.awayTeamId}
					awayTeam={this.state.awayTeam} 
				/>;
		} else {
			return <p>Loading...</p>;
		}

		if (this.state.status === 'Preview') {
			return (
				<div>
					{header}
					<hr></hr>
					<Preview 
						id={this.props.match.params.id} 
						homeTeamId={this.state.homeTeamId}
						awayTeamId={this.state.awayTeamId}
					/>
				</div>
			);
		} else if (this.state.status === 'Live') {
			return (
				<div>
					{header}
					<LiveView />
				</div>
			);
		} else {
			return (
				<div>
					{header}
					<h3>Final</h3>
				</div>
			);
		}
	}
}

export default GameDashboard;