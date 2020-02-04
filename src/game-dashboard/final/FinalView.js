import React from 'react';
import GameInfo from './GameInfo.js';

export default class FinalView extends React.Component {
	render() {
		return (
			<div className="row">
				<GameInfo id={this.props.id} />
			</div>
		)
	}
}