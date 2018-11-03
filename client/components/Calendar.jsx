import React, { Component } from 'react';
import styled from 'styled-components';
import moment from 'moment';

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
      &.selected {
        background-color: rgba(207,18,0,0.8);
        color: white;
        font-weight: bold;
      }
      &.disabled {
        color: #e6e6e6;
        cursor: not-allowed;
      }
    }
    &.weekday {
      span {
        height: 23px;
        border: none;
        color: #d32323;
        font-size: 12px;
        font-weight: bold;
        &:last-of-type {
          border-right: 1px solid #ccc;
        }
      }
    }
  }
`;

class Calendar extends Component {

  constructor(props) {
    super(props);
    this.toggleSelected = this.toggleSelected.bind(this);
  } 

  componentDidMount() {
    this.props.generateCalendar();
  }

  componentDidUpdate() {
    this.updateCalendar();
  }

  updateCalendar() {
    const date = moment(this.props.selectedDate, 'dddd, MMMM D, YYYY').format('D');
    const month = moment(this.props.selectedDate, 'dddd, MMMM D, YYYY').format('MMMM YYYY');
    const todayDay = parseInt(moment().format('D'));
    const todayMonth = parseInt(moment().format('M'));
    const todayYear = parseInt(moment().format('YYYY'));
    const table = document.querySelector('.weekday').parentElement.childNodes;
    for (let i = 1; i < table.length; i++) {
      for (let square of table[i].children) {
        square.className = '';
        const time = moment(document.querySelector('.month').textContent, 'MMMM, YYYY');
        if (
          (parseInt(time.format('YYYY')) < todayYear) ||
          (parseInt(time.format('M')) < todayMonth && parseInt(time.format('YYYY')) <= todayYear) ||
          (parseInt(square.textContent) < todayDay && parseInt(time.format('M')) <= todayMonth && parseInt(time.format('YYYY')) <= todayYear)
        ) {
          square.classList.add('disabled');
        } else if (square.textContent === date && month === document.querySelector('.month').textContent) {
          square.classList.add('selected');
        }
      }
    }
  }

  disablePastDates() {
    const date = moment(this.props.selectedDate, 'dddd, MMMM D, YYYY').format('D');
    const month = moment(this.props.selectedDate, 'dddd, MMMM D, YYYY').format('MMMM YYYY');
    const table = document.querySelector('.weekday').parentElement.childNodes;
  
  }

  toggleSelected(event) {
    if (!event.target.classList.contains('disabled')) {
      const selected = `${event.target.textContent} ${document.querySelector('span.month').textContent}`;
      const selectedDay = moment(selected, 'D MMMM YYYY').format('dddd, MMMM D, YYYY')
      this.props.updateSelectedDate(selectedDay);
      this.props.toggleCalendar();
    }
  }

  render() {
    return (
      <OuterCalendar>
        <InnerCalendar>
          <CalendarHead>
            <div>
              <span
                onClick={async () => {
                  await new Promise((resolve, reject) => {
                    this.props.previousMonth();
                    resolve();
                  });
                  this.props.generateCalendar();
                }}
              ><i className="fas fa-angle-double-left"></i></span>
              <span className="month">{this.props.header}</span>
              <span
                onClick={async () => {
                  await new Promise((resolve, reject) => {
                    this.props.nextMonth();
                    resolve();
                  });
                  this.props.generateCalendar();
                }}
              ><i className="fas fa-angle-double-right"></i></span>
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
            {this.props.monthGrid.map(week => (
              <div>{week.map(day => (
                <span onClick={this.toggleSelected}>{day}</span>
              ))}</div>
            ))}
          </CalendarBody>
        </InnerCalendar>
      </OuterCalendar>
    );
  }

}

export default Calendar;
