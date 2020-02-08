import React from 'react';

export default class Goal extends React.Component {
	constructor(props) {
		super(props)
	}

	render() {
		return (
			<div>
				<p className="col m1 s2">{this.props.team}</p>
				<p className="col m1 s2">{this.props.period}</p>
				<p className="col m1 s2">{this.props.time}</p>
				<p className="col m9 s6">{this.props.desc}</p>
			</div>
		);
	}
}