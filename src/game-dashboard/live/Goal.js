import React from 'react';

export default class Goal extends React.Component {
	constructor(props) {
		super(props)
	}

	render() {
		return (
			<div>
				<h6 className="col s1">{this.props.team}</h6>
				<h6 className="col s1">{this.props.period}</h6>
				<h6 className="col s1">{this.props.time}</h6>
				<h6 className="col s9">{this.props.desc}</h6>
			</div>
		);
	}
}