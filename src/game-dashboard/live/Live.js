import React from 'react';
import GameInfo from './GameInfo.js';
import OnIce from './OnIce.js';
import Scoring from './Scoring.js';

class LiveView extends React.Component {
	constructor(props) {
		super(props);

		this.state = { response: "" }
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
			return (<p>Loading...</p>);
		} else {

			return (
				<div className="row">
					<GameInfo response={this.state.response} />
					<hr/>
					<Scoring response={this.state.response} />
					<hr/>
					<h4>Currently on Ice</h4>
					<div className="col m12 l6">
						<OnIce response={this.state.response} team={"home"} />
					</div>
					<div className="col m12 l6">
						<OnIce response={this.state.response} team={"away"} />
					</div>
				</div>
			);
		}
	}
}

export default LiveView;