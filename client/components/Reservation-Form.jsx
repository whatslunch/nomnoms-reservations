import React, { Component } from 'react';
import styled from 'styled-components';
import moment from 'moment';
import Date from './Date.jsx';
import Calendar from './Calendar.jsx';
import Time from './Time.jsx';
import People from './People.jsx';

const ListBox = styled.ul`
  list-style-type: none;
  flex-wrap: wrap;
  margin: 0;
  padding: 0;
  position: relative;
`;

const SubmitBox = styled.div`
  padding: 3px;
  width: 100%;
  box-sizing: border-box;
  button {
    width: 100%;
    box-sizing: border-box;
    height: 30px;
    padding: 5px 9px;
    border: rgb(51, 51, 51) solid 1px;
    border-radius: 3px;
    font-weight: 700;
    color: white;
    background-color: rgb(60, 181, 46);
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.3);
    cursor: pointer;
    &:hover {
      background-color: #41c532;
    }
  }
`;

class ReservationForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      dateClicked: false,
      selectedDate: null,
      selectedMonth: null,
      selectedYear: null,
      firstWeekday: null,
      monthGrid: []
    };
    this.toggleCalendar = this.toggleCalendar.bind(this);
    this.previousMonth = this.previousMonth.bind(this);
    this.nextMonth = this.nextMonth.bind(this);
    this.generateCalendar = this.generateCalendar.bind(this);
    this.updateSelectedDate= this.updateSelectedDate.bind(this);
  }

  componentDidMount() {
    const today = moment().format('dddd, MMMM D, YYYY');
    const month = parseInt(moment().format('M'));
    const year = parseInt(moment().format('YYYY'));
    const firstWeekday = moment().startOf('month').format('d');
    this.setState({
      selectedDate: today,
      selectedMonth: month,
      selectedYear: year,
      firstWeekday: firstWeekday
    });
  }

  generateCalendar() {
    let days;
    let month = this.state.selectedMonth;
    let firstWeekday = this.state.firstWeekday;
    let daysOnMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    days = daysOnMonth[month - 1];
    let output = [];
    let week = [];
    for (let i = 0; i < firstWeekday; i++) {
      week.push(null);
    }
    for (let j = 1; j <= days; j++) {
      week.push(j);
      if (week.length === 7) {
        output.push(week);
        week = [];
      } else if (j === days) {
        while (week.length < 7) {
          week.push(null);
        }
        output.push(week);
      }
    } 
    this.setState({
      monthGrid: output
    });
  }

  previousMonth() {
    let updatedMonth = this.state.selectedMonth - 1;
    let updatedYear = this.state.selectedYear;
    if (updatedMonth === 0) {
      updatedMonth = 12;
      updatedYear = this.state.selectedYear - 1;
    }
    let updatedWeekday = moment(`${updatedYear} ${updatedMonth}`, 'YYYY MM').format('d')
    this.setState({
      selectedMonth: updatedMonth,
      selectedYear: updatedYear,
      firstWeekday: updatedWeekday
    })
  }

  nextMonth() {
    let updatedMonth = this.state.selectedMonth + 1;
    let updatedYear = this.state.selectedYear;
    if (updatedMonth === 13) {
      updatedMonth = 1;
      updatedYear = this.state.selectedYear + 1;
    }
    let updatedWeekday = moment(`${updatedYear} ${updatedMonth}`, 'YYYY MM').format('d')
    this.setState({
      selectedMonth: updatedMonth,
      selectedYear: updatedYear,
      firstWeekday: updatedWeekday
    });
  }

  updateSelectedDate(updatedDate) {
    this.setState({
      selectedDate: updatedDate
    });
  }

  toggleCalendar() {
    this.setState({
      dateClicked: !this.state.dateClicked
    });
  }

  render() {
    let header = moment(`${this.state.selectedMonth} ${this.state.selectedYear}`, 'M YYYY').format('MMMM YYYY');
    let weekday = moment().format('d');
    let calendar;
    if (this.state.dateClicked) {
      calendar = 
        <Calendar 
          header={header}
          selectedDate={this.state.selectedDate}
          previousMonth={this.previousMonth}
          nextMonth={this.nextMonth}
          generateCalendar={this.generateCalendar}
          toggleCalendar={this.toggleCalendar}
          monthGrid={this.state.monthGrid}
          updateSelectedDate={this.updateSelectedDate}
        />
    }
    return (
      <ListBox>
        <Date 
          toggleCalendar={this.toggleCalendar}
          selectedDate={this.state.selectedDate}
        />
        {calendar}
        <Time hours={this.props.hours[weekday]} />
        <People />
        <SubmitBox>
          <button>Find a Table</button>
        </SubmitBox>
      </ListBox>
    );
  }

}

export default ReservationForm;
