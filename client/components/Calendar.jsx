import React, { Component } from 'react';
import styled from 'styled-components';

const OuterCalendar = styled.li`
  width: 100%;
  position: absolute;
  z-index: 9999;
  background-color: white;
  padding: 3px;
  box-sizing: border-box;
`;

const InnerCalendar = styled.div`
  border: 1px solid #ccc;
  border-right: none;
  border-shadow: 0 1px 2px rgba(10,10,10,0.2);
  border-radius: 5px;
  width: 100%;
  align: right;
`;

const CalendarHead = styled.div`
  margin: 0 auto;
  border-right: 1px solid #ccc;
  div {
    display: flex;
    span {
      display: flex;
      justify-content: center;
      align-items: center;
      width: calc(100% / 7);
      height: 36px;
      box-model: border-box;
      padding: 3px;
      &.month {
        width: calc(5 * (100% / 7));
        font-weight: bold;
        font-size: 14px;
      }
    }
  }
`;

const CalendarBody = styled.div`
  margin: 0 auto;
  div {
    display: flex;
    span {
      display: flex;
      justify-content: center;
      align-items: center;
      width: calc(100% / 7);
      height: 38px;
      border-top: 1px solid #ccc;
      border-right: 1px solid #ccc;
      font-size: 14px;
    }
    &.weekday {
      span {
        height: 23px;
        border: none;
        color: #d32323;
        font-size: 12px;
        font-weight: bold;
        &:last-of-type{
          border-right: 1px solid #ccc;
        }
      }
    }
  }
`;

class Calendar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      startingWeekDay: 1,
      month: 10,
      monthGrid: []
    };
  } 

  componentDidMount() {
    let month = this.generateCalendar();
    this.setState({
      monthGrid: month
    });
  }

  generateCalendar() {
    let days;
    let month = this.state.month;
    if (
      month === 1 ||
      month === 3 ||
      month === 5 ||
      month === 7 ||
      month === 8 ||
      month === 10 ||
      month === 12
    ) {
      days = 31;
    } else if (
      month === 4 ||
      month === 6 ||
      month === 9 ||
      month === 11
    ) {
      days = 30;
    } else {
      days = 28;
    }
    let output = [];
    let week = [];
    for (let i = 0; i < this.state.startingWeekDay; i++) {
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
    return output;
  }

  render() {
    return (
      <OuterCalendar>
        <InnerCalendar>
          <CalendarHead>
            <div>
              <span><i className="fas fa-angle-double-left"></i></span>
              <span className="month">October 2018</span>
              <span><i className="fas fa-angle-double-right"></i></span>
            </div>
          </CalendarHead>
          <CalendarBody>
            <div className="weekday">
              <span>S</span>
              <span>M</span>
              <span>T</span>
              <span>W</span>
              <span>T</span>
              <span>F</span>
              <span>S</span>
            </div>
            {this.state.monthGrid.map(week => (
              <div>{week.map(day => (
                <span>{day}</span>
              ))}</div>
            ))}
          </CalendarBody>
        </InnerCalendar>
      </OuterCalendar>
    );
  }

}

export default Calendar;
