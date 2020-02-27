import React from 'react';
import Header from './header/Header.js';
import Preview from './preview/Preview.js';
import LiveView from './live/Live.js';
import FinalView from './final/FinalView.js'

export default class GameDashboard extends React.Component {
	constructor(props) {
		super(props);
		this.state = { 
            response: 0,
        };
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

			this.setState({
				//homeTeamId: homeTeamId,
				//homeTeam: homeTeam,
				//awayTeamId: awayTeamId,
				//awayTeam: awayTeam,
				status: status,
				response: response
				// time: time
			});
		});
	}

	render() {
		let header = '';
		const id = this.props.match.params.id;

		if (this.state.response !== 0){
			header = <Header response={this.state.response} />;
		} else {
			return <p>Loading...</p>;
		}

		if (this.state.status === 'Preview') {
			return (
				<div>
					{header}
					<Preview response={this.state.response}/>
				</div>
			);
		} else if (this.state.status === 'Live') {
			return (
				<div>
					{header}
					<LiveView 
						response={this.state.response}
					/>
				</div>
			);
		} else {
			return (
				<div>
					{header}
					<FinalView response={this.state.response} />
				</div>
			);
		}
	}
}
