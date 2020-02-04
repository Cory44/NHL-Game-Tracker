import React from 'react';
import GameInfo from './GameInfo.js';
import OnIce from './OnIce.js';

class LiveView extends React.Component {
	render() {

		return (
			<div className="row">
				<GameInfo id={this.props.id} />
				<div className="col m12 l6">
					<OnIce id={this.props.id} team={"home"} />
				</div>
				<div className="col m12 l6">
					<OnIce id={this.props.id} team={"away"} />
				</div>
			</div>
		);
	}
}

export default LiveView;