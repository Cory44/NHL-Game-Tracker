import React from 'react';
import Header from './header/Header.js';
import Preview from './preview/Preview.js';
import LiveView from './live/Live.js';
import FinalView from './final/FinalView.js'

export default class GameDashboard extends React.Component {
	constructor(props) {
		super(props);
		this.state = { 
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
		let response = '';

		const id = this.props.match.params.id;

		if (this.state.response !== undefined){
			response = this.state.response
			header = <Header response={response} />;
		}

		if (response === '') {
			return <p>Loading ...</p>
		} else {
			if (this.state.status === 'Preview') {
				return (
					<div>
						{header}
						<Preview response={response}/>
					</div>
				);
			} else if (this.state.status === 'Live') {
				console.log(response);
				return (
					<div>
						{header}
						<LiveView response={response} />
					</div>
				);
			} else {
				return (
					<div>
						{header}
						<FinalView response={response} />
					</div>
				);
			}
		}
	}
}
