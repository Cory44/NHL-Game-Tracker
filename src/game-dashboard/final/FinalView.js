import React from 'react';
import GameInfo from './GameInfo.js';

export default class FinalView extends React.Component {
	constructor(props) {
		super(props);

		this.state = { response: "" };
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
		
			this.setState({
				response: response,
			});
		});
	}

	render() {

		if (this.state.response === "") {
			return(<p>Loading...</p>)
		} else {
			return (
				<div className="row">
					<GameInfo response={this.state.response} />
				</div>
			);
		}
	}
}