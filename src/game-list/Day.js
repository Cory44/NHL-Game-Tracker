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
		let year = date.slice(0, 4);
		let month = parseInt(date.slice(5, 7), 10);
		let day = date.slice(8, 10);


		if (day !== 1){
			if (month < 10)
  			month = '0' + month;
			yesterday = year + "-" + month + "-" + (day - 1);
		}
		else if (month !== 1) {
			if (month < 10)
  			month = '0' + month;
			yesterday = year + "-" + (month - 1) + "-" + this.monthDays(month, year);
		}
		else {
			yesterday = (year - 1) + '12-31';
		}

		return yesterday;
	}

	tomorrow(today) {
		const date = today;
		let tomorrow;
		let year = date.slice(0, 4);
		let month = parseInt(date.slice(5, 7), 10);
		let day = parseInt(date.slice(8, 10), 10);

		if (day !== this.monthDays(month, year)){
			if (month < 10)
  			month = '0' + month;
			tomorrow = year + "-" + month + "-" + (day + 1);
		}
		else if (month !== 12) {
			if (month < 10)
  			month = '0' + month;
			tomorrow = year + "-" + (month + 1) + "-" + this.monthDays(month + 1, year);
		}
		else {
			tomorrow = (year + 1) + '01-01';
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
    return (
    	<div className="row">
    		<p className="col s4 center-align" onClick={this.handleYesterdayClick}>&lt;--{this.state.yesterday}</p>
    		<p className="col s4 center-align">{this.state.today}</p>
    		<p className="col s4 center-align" onClick={this.handleTomorrowClick}>{this.state.tomorrow}--&gt;</p>
    	</div>
    )
	}
}

export default Day;