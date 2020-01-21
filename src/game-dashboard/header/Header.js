import React from 'react';
import Record from './Record.js';

class Header extends React.Component {

	render() {
		return(
			<div className="row">
				<div className="col m5 s12 center-align">
					<h3>{this.props.homeTeam}</h3>
					<Record teamId={this.props.homeTeamId} />
				</div>

				<h3 className="col m2 s12 center-align">VS.</h3>

				<div className="col m5 s12 center-align">
					<h3>{this.props.awayTeam}</h3>
					<Record teamId={this.props.awayTeamId} />
				</div>
			</div>
		);
	}
}

export default Header;