import React from 'react';

class Record extends React.Component {

	constructor(props) {
		super(props);

		this.state = { record: '' };
	}

	componentDidMount() {
		this.getRecordData();
	}

	getRecordData() {
		const id = this.props.teamId;

		fetch('https://statsapi.web.nhl.com/api/v1/teams/' + id + '/stats')
		.then(response => {
			return response.json();
		})
		.then(response => {
			let wins = response['stats'][0]['splits'][0]['stat']['wins'];
			let losses = response['stats'][0]['splits'][0]['stat']['losses'];
			let otl = response['stats'][0]['splits'][0]['stat']['ot'];

			let record = "(" + wins + "-" + losses + "-" + otl + ")";

			this.setState({ record: record });
		});
	}

	render() {
		return (<p className="col s12 center-align">{this.state.record}</p>);
	}
}

export default Record;