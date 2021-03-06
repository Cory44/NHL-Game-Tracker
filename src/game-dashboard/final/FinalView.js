import React from 'react';
import GameInfo from './GameInfo.js';

export default class FinalView extends React.Component {
	render() {
    	const response = this.props.response;

		return (
			<div className="row">
				<GameInfo response={response} />
				<hr />
			</div>
		);
	}
}
