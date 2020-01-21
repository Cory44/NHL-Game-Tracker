import React from 'react';
import Player from './Player.js';

class Roster extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			players: []
		}
	}

	componentDidMount() {
		this.getPlayers();
	}

	getPlayers() {
		const id = this.props.id;

		fetch('https://statsapi.web.nhl.com/api/v1/teams/' + id + '?expand=team.roster')
		.then(response => {
			return response.json();
		})
		.then(response => {
			let players = [];

			let tempPlayers = response['teams'][0]['roster']['roster']

			for (var i = 0; i < tempPlayers.length; i++) {
				let id = tempPlayers[i]['person']['id'];
				let number = tempPlayers[i]['jerseyNumber'];
				let name = tempPlayers[i]['person']['fullName'];
				let position = tempPlayers[i]['position']['abbreviation'];

				let player = {
					id: id,
					number: number,
					name: name,
					position: position
				}

				players[i] = player;
			}

			this.setState({ players: players });
			
		});
	}

	render() {
		const playersState = this.state.players;
		const players = [];

		for (var i = 0; i < playersState.length; i++) {
			let id = playersState[i]['id'];
			let number = playersState[i]['number'];
			let name = playersState[i]['name'];
			let position = playersState[i]['position'];

			players[i] = <Player key={id} id={id} number={number} name={name} position={position} />;
		}

		if (this.state.players === []) {
			return <p>Loading...</p>;
		} else {
			return (
				<table>
					<thead>
						<tr>
							<th>Number</th>
							<th>Name</th>
							<th>position</th>
							<th>Games</th>
							<th>Goals</th>
							<th>Assists</th>
							<th>Points</th>
						</tr>
					</thead>
					<tbody>
						{players}
					</tbody>
				</table>
			);
		}
	}
}

export default Roster;