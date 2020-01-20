import React from 'react';
import Day from './Day.js';
import GameList from './GameList.js';

class Schedule extends React.Component {

  constructor(props) {
    super(props);
   
    this.state = {
    	date: '',
    }

    this.handleDayChange = this.handleDayChange.bind(this);
  }

  componentDidMount() {
		this.getDate();
	}

  getDate() {
  	let dateVar = new Date();

    const year = dateVar.getFullYear();
    let monthVar = dateVar.getMonth() + 1;
    const day = dateVar.getDate();	

    if (monthVar < 10)
  		monthVar = '0' + monthVar;

  	const month = monthVar;
  	const date = year + "-" + month + "-" + day;

  	this.setState({ date: date });
  }

  handleDayChange(day) {
  	this.setState({
  		date: day
  	});
  }

  render() {
  	if (this.state.date === '')
  		return <p>Loading...</p>

    return (
    	<div key={this.state.date}>
    		<Day 
    			date={this.state.date}
    			handleDayChange={this.handleDayChange}
    		/>
    		<GameList 
    			date={this.state.date} 
    			handleDayChange={this.handleDayChange}
    		/>
    	</div>
    );
  }
}

export default Schedule;