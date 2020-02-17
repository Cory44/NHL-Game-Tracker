import React from 'react';

class GameInfo extends React.Component {
	constructor(props) {
		super(props);
	}

	// componentDidMount() {
	// 	this.getGameInfo();
	// }	

	// getGameInfo() {
	// 	const id = this.props.id;

	// 	fetch('https://statsapi.web.nhl.com/api/v1/game/' + id + '/feed/live')
	// 	.then(response => {
	// 		return response.json();
	// 	})
	// 	.then(response => {
	// 		let time = new Date(response['gameData']['datetime']['dateTime']).toLocaleTimeString([], {hour: 'numeric', minute:'2-digit'});
	// 		let venue = response['gameData']['teams']['home']['venue']['name']

	// 		this.setState({
	// 			time: time,
	// 			venue: venue
	// 		});
	// 	});
	// }

	render() {
		let response = this.props.response;
		const time = new Date(response['gameData']['datetime']['dateTime']).toLocaleTimeString([], {hour: 'numeric', minute:'2-digit'});
		const venue = response['gameData']['teams']['home']['venue']['name']

		return (
			<div>
				<h5 className="center-align">Preview</h5>
				<p className="center-align" style={{margin: 0}}>{time}</p>
				<p className="center-align" style={{margin: 0}}>{venue}</p>
			</div>
		);
	}
}

export default GameInfo;