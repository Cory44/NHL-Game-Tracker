import React from 'react';
import Record from './Record.js';

class Header extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			homeTeam: '',
			homeTeamId: 0,
			awayTeam: '',
			awayTeamId: 0
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
			let homeTeamId = response['gameData']['teams']['home']['id'];
			let homeTeam = response['gameData']['teams']['home']['name'];

			let awayTeam = response['gameData']['teams']['away']['name'];
			let awayTeamId = response['gameData']['teams']['away']['id'];

			let time = new Date(response['gameData']['datetime']['dateTime']).toLocaleTimeString([], {hour: 'numeric', minute:'2-digit'});

			this.setState({
				homeTeamId: homeTeamId,
				homeTeam: homeTeam,
				awayTeamId: awayTeamId,
				awayTeam: awayTeam,
				time: time
			});
		});
	}

	render() {
		if (this.state.homeTeamId !== 0 && this.state.awayTeamId !== 0) {
			return(
				<div className="row">
					<div className="col m5 s12 center-align">
						<h3>{this.state.homeTeam}</h3>
						<Record teamId={this.state.homeTeamId} />
					</div>

					<h3 className="col m2 s12 center-align">VS.</h3>

					<div className="col m5 s12 center-align">
						<h3>{this.state.awayTeam}</h3>
						<Record teamId={this.state.awayTeamId} />
					</div>
				</div>
			);
		} else {
			return <p>Loading...</p>;
		}
	}
}

export default Header;