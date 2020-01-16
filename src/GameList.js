import React from 'react';

class GameList extends React.Component {
	constructor(props) {
		super(props);
		this.getData = this.getData.bind(this);
		this.state = {games: ''};
	}

	componentDidMount() {
		this.getData();
	}

	getData() {
		fetch('https://statsapi.web.nhl.com/api/v1/schedule?date=2020-01-16')
		.then(response => {
			return response.json();
		})
		.then(response => {
			let games = response['dates'][0]['games'];
			let gamesPk = []

			for(let i = 0; i < games.length; i++) {
				gamesPk[i] = games[i]['gamePk'];
			}

			this.setState({games: gamesPk});
			// return gamesPk;
		});
	}

	componentWillUnmount() {
  	// clearInterval(this.interval);
	}

  render() {
  	const stateGames = this.state.games
  	const games = [];

  	for(let i = 0; i < stateGames.length; i++) {
  		//games[i] = <Game id={stateGames[i]} />;
        games[i] = <p>{stateGames[i]}</p>;
  	}
  	return <div className="gameList">{games}</div>;
  }
}

export default GameList;
