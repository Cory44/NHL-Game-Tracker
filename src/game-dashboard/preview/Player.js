import React from 'react';

class Player extends React.Component {
	constructor(props) {
		super(props);
		this.state = { 
			games: 0,
			goals: 0,
			assists: 0,
			points: 0
		}
	}

	componentDidMount() {
		this.getPlayerData();
	}

	getPlayerData() {
		const id = this.props.id;

		fetch('https://statsapi.web.nhl.com/api/v1/people/' + id + '/stats?stats=statsSingleSeason')
		.then(response => {
			return response.json();
		})
		.then(response => {
			if (response['stats'][0]['splits'].length > 0 && this.props.position !== 'G') {
				let games = response['stats'][0]['splits'][0]['stat']['games'];
				let goals = response['stats'][0]['splits'][0]['stat']['goals'];
				let assists = response['stats'][0]['splits'][0]['stat']['assists'];
				let points = goals + assists;

				this.setState({
					games: games,
					goals: goals,
					assists: assists,
					points: points
				});
			}
		});	
	}

	render() {

		return (
			<tr>
				<td className="center-align">{this.props.number}</td>
				<td>{this.props.name}</td>
				<td className="center-align">{this.props.position}</td>
				<td className="center-align">{this.state.games}</td>
				<td className="center-align">{this.state.goals}</td>
				<td className="center-align">{this.state.assists}</td>
				<td className="center-align">{this.state.points}</td>
			</tr>
		);
	}
}

export default Player;