import React from 'react';

class GameInfo extends React.Component {
	constructor(props) {
		super(props);
		this.state = { 
			time: '',
			venue: ''
		};
	}

	componentDidMount() {
		this.getGameInfo();
	}	

	getGameInfo() {
		const id = this.props.id;

		fetch('https://statsapi.web.nhl.com/api/v1/game/' + id + '/feed/live')
		.then(response => {
			return response.json();
		})
		.then(response => {
			let time = new Date(response['gameData']['datetime']['dateTime']).toLocaleTimeString([], {hour: 'numeric', minute:'2-digit'});
			let venue = response['gameData']['teams']['home']['venue']['name']

			this.setState({
				time: time,
				venue: venue
			});
		});
	}

	render() {
		return (
			<div>
				<h5 className="col s12 center-align">Preview</h5>
				<p className="col s12 center-align">{this.state.time}</p>
				<p className="col s12 center-align">{this.state.venue}</p>
			</div>
		);
	}
}

export default GameInfo;