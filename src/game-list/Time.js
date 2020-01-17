import React from 'react';

class Time extends React.Component {
  constructor(props) {
    super(props);
    this.state = {time: ''};
  }

  componentDidMount() {
  	this.getTime();
  }

  getTime() {
  	const id = this.props.id;

  	fetch('https://statsapi.web.nhl.com/api/v1/game/' + id + '/feed/live')
		.then(response => {
			return response.json();
		})
		.then(response => {
			let time = response['liveData']['linescore']['currentPeriodOrdinal'] + " - " + response['liveData']['linescore']['currentPeriodTimeRemaining'];

  		this.setState({
  			time: time
  		});
  	});
  }

  render() {
  	return (
  		<span>{this.state.time}</span>
  	);
  }
}

export default Time;
