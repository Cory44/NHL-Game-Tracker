import React from 'react';
import Player from './Player.js';
import Goalie from './Goalies.js';

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
			let team = response['teams'][0]['name'];

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

			this.setState({ 
				players: players,
				team: team
			});
			
		});
	}

	render() {
		const playersState = this.state.players;
		const players = [];
		const goalies = [];


		for (var i = 0; i < playersState.length; i++) {
			let id = playersState[i]['id'];
			let number = playersState[i]['number'];
			let name = playersState[i]['name'];
			let position = playersState[i]['position'];

			if (position !== 'G')
				players[i] = <Player key={id} id={id} number={number} name={name} position={position} />;

			if (position === 'G')
				goalies[i] = <Goalie key={id} id={id} number={number} name={name} position={position} />;


		}

		if (this.state.players === []) {
			return <p>Loading...</p>;
		} else {
			return (
				<>
				<h5>{this.state.team}</h5>
				<h6>Players</h6>
				<table style={{fontSize: 12}}>
					<thead>
						<tr>
							<th className="center-align">Number</th>
							<th>Name</th>
							<th className="center-align">Position</th>
							<th className="center-align">Games</th>
							<th className="center-align">Goals</th>
							<th className="center-align">Assists</th>
							<th className="center-align">Points</th>
						</tr>
					</thead>
					<tbody>
						{players}
					</tbody>
				</table>

				<h6><br/>Goalies</h6>
				<table style={{fontSize: 12}}>
					<thead>
						<tr>
							<th className="center-align">Number</th>
							<th>Name</th>
							<th className="center-align">Position</th>
							<th className="center-align">Games</th>
							<th className="center-align">Record</th>
							<th className="center-align">Save %</th>
							<th className="center-align">GAA</th>
						</tr>
					</thead>
					<tbody>
						{goalies}
					</tbody>
				</table></>
			);
		}
	}
}

export default Roster;