import React from 'react';
import Player from './Player.js';

export default class OnIce extends React.Component {

	render() {
		let team = this.props.team;
		let response = this.props.response;
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

		const onIcePlayers = [];

		for (var i = 0; i < players.length; i++) {

			if (players[i]['position'] !== 'G')
				onIcePlayers[i] = <Player key={players[i]['id']}
														 name={players[i]['name']}
														 position={players[i]['position']}
														 stats={players[i]['stats']}
														 shots={players[i]['shots']} />;
		}

		return (
			<>
				<h5>{triCode}</h5>
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
						{onIcePlayers}
					</tbody>
				</table>	
			</>
		);
	}
}