import React from 'react';
import Player from './Player.js';

class OnIce extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			onIce:[]
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


			let onIce = response['liveData']['boxscore']['teams'][team]['onIcePlus'];

			this.setState({
				onIce: onIce
			});
		});
	}

	render() {
		const players = [];
		const onIce = this.state.onIce;

		for (var i = 0; i < onIce.length; i++) {
			players[i] = <Player id={this.state.onIce[i]['playerId']} shift={this.state.onIce[i]['shiftDuration']} />
		}
		return (
			<div>{players}</div>	
		)
	}
}

export default OnIce;