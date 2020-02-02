import React from 'react';

class Player extends React.Component {
	constructor(props) {
		super(props);
		this.state = { name: '' };
	}

	componentDidMount() {
		this.getPlayerData();
	}

	getPlayerData() {
		const id = this.props.id;

		fetch('https://statsapi.web.nhl.com/api/v1/people/' + id)
		.then(response => {
			return response.json();
		})
		.then(response => {
			let name = response['people'][0]['fullName'];

			console.log(name);

			this.setState({ name: name });
		});
	}

	render() {
		return (
			<div>
				<p>{this.state.name}</p>
			</div>
		);
	}
}

export default Player;