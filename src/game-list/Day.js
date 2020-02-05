import React from 'react';

class Day extends React.Component {
	constructor(props) {
		super(props);
		const date = this.props.date;

		this.state = {
			yesterday: this.yesterday(date),
			today: date,
			tomorrow: this.tomorrow(date)
		};

		this.handleYesterdayClick = this.handleYesterdayClick.bind(this);
		this.handleTomorrowClick = this.handleTomorrowClick.bind(this);
	}

	leapYear(year) {
		if ((year - 2012) % 4 === 0)
			return true;
		else
			return false;
	}

	monthDays(month, year) {
		if (month === 4 || month === 6 || month === 9 || month === 11)
			return 30;
		else if (month === 2)
			if(this.leapYear(year))
				return 29;
			else
				return 28;
		else
			return 31;
	}

	yesterday(today) {
		const date = today;
		let yesterday;
		let year = parseInt(date.slice(0, 4), 10);
		let month = parseInt(date.slice(5, 7), 10);
		let day = parseInt(date.slice(8, 10), 10);

		if (day !== 1){
			if (month < 10)
  			month = '0' + month;

  		if (day < 10)
  			day = '0' + (day - 1);
  		else
  			day = day - 1;

			yesterday = year + "-" + month + "-" + day;
		}
		else if (month !== 1) {
			if (month < 10)
  			month = '0' + (month - 1);
  		else
  			month = (month - 1);

			yesterday = year + "-" + month + "-" + this.monthDays(month, year);
		}
		else {
			yesterday = (year - 1) + "-12-31";
		}

		return yesterday;
	}

	tomorrow(today) {
		const date = today;
		let tomorrow;
		let year = parseInt(date.slice(0, 4), 10);
		let month = parseInt(date.slice(5, 7), 10);
		let day = parseInt(date.slice(8, 10), 10);

		// console.log(year + "-" + month + "-" + day);
		// console.log(this.monthDays(month, year));

		if (day !== this.monthDays(month, year)){
			if (month < 10)
  			month = '0' + month;

  		if (day + 1 < 10)
  			day = '0' + (day + 1);
  		else
  			day = day + 1;

			tomorrow = year + "-" + month + "-" + day;
		}
		else if (month !== 12) {
			if (month + 1 < 10)
  			month = '0' + (month + 1);
  		else
  			month = month + 1;
			tomorrow = year + "-" + month + "-01";
		}
		else {
			tomorrow = (year + 1) + "-01-01";
		}

		return tomorrow;
	}

	handleYesterdayClick() {
		this.props.handleDayChange(this.state.yesterday);
	}

	handleTomorrowClick() {
		this.props.handleDayChange(this.state.tomorrow);
	}

	render() {
		let dateVar = new Date();

    const year = dateVar.getFullYear();
    let monthVar = dateVar.getMonth() + 1;
    let day = dateVar.getDate();	

    if (monthVar < 10)
  		monthVar = '0' + monthVar;

    if (day < 10)
      day = '0' + day;

  	const month = monthVar;
  	const today = year + "-" + month + "-" + day;

  	let date = "Today";

  	if (this.state.today !== today)
  		date = this.state.today; 


    return (
    	<div className="row">


    		<div className="row col s4 valign-wrapper" onClick={this.handleYesterdayClick}>
    			<i className="small material-icons right-align col s4">arrow_back</i>
    			<p className="left-align col s8">{this.state.yesterday}</p>
    		</div>

    		<div className="row col s4 valign-wrapper">
    			<p className="col s12 center-align">{date}</p>
    		</div>

    		<div className="row col s4 valign-wrapper" onClick={this.handleTomorrowClick}>
    			<p className="right-align col s8">{this.state.tomorrow}</p>
    			<i className="small material-icons left-align col s4">arrow_forward</i>
    		</div>
    	</div>
    )
	}
}

export default Day;