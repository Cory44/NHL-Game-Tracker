import React from 'react';
import GameCard from './GameCard.js';

class GameList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {games: ''};
	}

	componentDidMount() {
		this.getData();
	}

	getData() {

    const date = this.props.date;

		fetch('https://statsapi.web.nhl.com/api/v1/schedule?date=' + date)
		.then(response => {
			return response.json();
		})
		.then(response => {
			if (response['dates'].length > 0) {
				let games = response['dates'][0]['games'];
				let gamesPk = []

				for(let i = 0; i < games.length; i++) {
					gamesPk[i] = games[i]['gamePk'];
				}

				this.setState({games: gamesPk});
			}
		});
	}

	componentWillUnmount() {
  	// clearInterval(this.interval);
	}

  render() {
  	const stateGames = this.state.games
  	const games = [];

  	for(let i = 0; i < stateGames.length; i++) {
  		games[i] = <GameCard id={stateGames[i]} key={stateGames[i]} />;
        //games[i] = <p>{stateGames[i]}</p>;
  	}

  	if (games.length > 0) {
  		return (
    		<div className="row">{games}</div>
    	);
    }
    else {
    	return (
    		<div className="row">No Games Scheduled</div>
    	);
    }
  }
}

export default GameList;
