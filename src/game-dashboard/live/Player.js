import React from 'react';

class Player extends React.Component {
	render() {
		return (
			<tr>
				<td>{this.props.position}</td>
				<td>{this.props.name}</td>
				<td>{this.props.stats}</td>
				<td>{this.props.shots}</td>
			</tr>
		);
	}
}

export default Player;