import React from 'react';

class Goalie extends React.Component {
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
			if (response['stats'][0]['splits'].length > 0 && this.props.position === 'G') {
				let games = response['stats'][0]['splits'][0]['stat']['games'];
				let wins = response['stats'][0]['splits'][0]['stat']['wins'];
				let losses = response['stats'][0]['splits'][0]['stat']['losses'];
				let ot = response['stats'][0]['splits'][0]['stat']['ot'];
				let record = wins + "-" + losses + "-" + ot;

				let savePct = response['stats'][0]['splits'][0]['stat']['savePercentage'];
				let gaa = response['stats'][0]['splits'][0]['stat']['goalAgainstAverage'];

				this.setState({
					games: games,
					record: record,
					savePct: savePct,
					gaa: gaa
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
				<td className="center-align">{this.state.record}</td>
				<td className="center-align">{this.state.savePct}</td>
				<td className="center-align">{this.state.gaa}</td>
			</tr>
		);
	}
}

export default Goalie;