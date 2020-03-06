import React from 'react';
import GameInfo from './GameInfo.js';
import OnIce from './OnIce.js';
import Scoring from './Scoring.js';

export default class LiveView extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		let response = this.props.repsonse;

		if (response === undefined) {
			return <p>Loading ...</p>;
		} else {
			return (
				<div className="row">
					<GameInfo response={response} />
					<hr/>
					<Scoring response={response} />
					<hr/>
					<h4>Currently on Ice</h4>
					<div className="col m12 l6">
						<OnIce response={response} team={"home"} />
					</div>
					<div className="col m12 l6">
						<OnIce response={response} team={"away"} />
					</div>
				</div>
			);
		}
	}
}