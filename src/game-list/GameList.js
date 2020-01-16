import React from 'react';
import GameCard from './GameCard.js';

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
        let date = new Date();
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();

        if (month < 10)
            month = '0' + month;

        let dateFetch = year + "-" + month + "-" + day;

		fetch('https://statsapi.web.nhl.com/api/v1/schedule?date=' + dateFetch)
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
  		games[i] = <GameCard id={stateGames[i]} />;
        //games[i] = <p>{stateGames[i]}</p>;
  	}
  	return <div className="gameList">{games}</div>;
  }
}

export default GameList;
