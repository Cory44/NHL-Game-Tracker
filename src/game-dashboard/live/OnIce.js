import React from 'react';
import Player from './Player.js';

class OnIce extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			players: []
		};
	}

	componentDidMount() {
		this.getOnIceData();
	}

	getOnIceData() {
		const id = this.props.id;

		fetch('https://statsapi.web.nhl.com/api/v1/game/' + id + '/feed/live')
		.then(response => {
			return response.json();
		})
		.then(response => {
			let team = this.props.team;
			let onIce = response['liveData']['boxscore']['teams'][team]['onIce'];
			let triCode = response['gameData']['teams'][team]['triCode']
			const players = []
			
			for (let i = 0; i < onIce.length; i++) {
				let player = "ID" + onIce[i];
			 	let name = response['liveData']['boxscore']['teams'][team]['players'][player]['person']['fullName'];
			 	let position = response['liveData']['boxscore']['teams'][team]['players'][player]['position']['abbreviation'];

			 	let goals, assists, stats, shots = 0;

			 	if (position !== 'G') {
			 		goals = response['liveData']['boxscore']['teams'][team]['players'][player]['stats']['skaterStats']['goals'];
			 		assists = response['liveData']['boxscore']['teams'][team]['players'][player]['stats']['skaterStats']['assists'];
			 		stats = goals + "-" + assists + "-" + (goals + assists);
			 		shots = response['liveData']['boxscore']['teams'][team]['players'][player]['stats']['skaterStats']['shots'];
			 	}

			 	players[i] = {id: onIce[i], name: name, position: position, stats: stats, shots: shots};
			}

			this.setState({
				players: players,
				triCode: triCode,
			});
		});
	}

	render() {
		const players = [];
		const onIcePlayers = this.state.players;

		for (var i = 0; i < onIcePlayers.length; i++) {

			if (onIcePlayers[i]['position'] !== 'G')
				players[i] = <Player key={onIcePlayers[i]['id']}
														 name={onIcePlayers[i]['name']}
														 position={onIcePlayers[i]['position']}
														 stats={onIcePlayers[i]['stats']}
														 shots={onIcePlayers[i]['shots']} />;
		}

		if (this.state.players === []) {
			return <p>Loading...</p>;
		} else {
			return (
				<>
					<h5>{this.state.triCode}</h5>
					<table style={{fontSize: 12}}>
						<thead>
							<tr>
								<th>Position</th>
								<th>Player</th>
								<th>Stats</th>
								<th>Shots</th>
							</tr>
						</thead>
						<tbody>
							{players}
						</tbody>
					</table>	
				</>
			);
		}
	}
}

export default OnIce;