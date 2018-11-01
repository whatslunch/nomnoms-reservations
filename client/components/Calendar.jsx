import React, { Component } from 'react';
import PropTypes from 'prop-types';
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
  static propTypes = {
    generateCalendar: PropTypes.func.isRequired,
    updateSelectedDate: PropTypes.func.isRequired,
    toggleCalendar: PropTypes.func.isRequired,
    previousMonth: PropTypes.func.isRequired,
    nextMonth: PropTypes.func.isRequired,
    monthGrid: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)).isRequired,
    selectedDate: PropTypes.string.isRequired,
    header: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);
    this.toggleSelected = this.toggleSelected.bind(this);
  }

  componentDidMount() {
    const { generateCalendar } = this.props;
    generateCalendar();
  }

  componentDidUpdate() {
    this.updateCalendar();
  }

  updateCalendar() {
    const { selectedDate } = this.props;
    const date = moment(selectedDate, 'dddd, MMMM D, YYYY').format('D');
    const month = moment(selectedDate, 'dddd, MMMM D, YYYY').format('MMMM YYYY');
    const todayDay = parseInt(moment().format('D'), 10);
    const todayMonth = parseInt(moment().format('M'), 10);
    const todayYear = parseInt(moment().format('YYYY'), 10);
    const table = document.querySelector('.weekday').parentElement.childNodes;
    for (let i = 1; i < table.length; i += 1) {
      for (let j = 0; j < table[i].children.length; j += 1) {
        table[i].children[j].className = '';
        const time = moment(document.querySelector('.month').textContent, 'MMMM, YYYY');
        if (
          (parseInt(time.format('YYYY'), 10) < todayYear)
          || (parseInt(time.format('M'), 10) < todayMonth && parseInt(time.format('YYYY'), 10) <= todayYear)
          || (parseInt(table[i].children[j].textContent, 10) < todayDay && parseInt(time.format('M'), 10) <= todayMonth && parseInt(time.format('YYYY'), 10) <= todayYear)
        ) {
          table[i].children[j].classList.add('disabled');
        } else if (table[i].children[j].textContent === date && month === document.querySelector('.month').textContent) {
          table[i].children[j].classList.add('selected');
        }
      }
    }
  }

  toggleSelected(event) {
    if (!event.target.classList.contains('disabled')) {
      const { updateSelectedDate, toggleCalendar } = this.props;
      const selected = `${event.target.textContent} ${document.querySelector('span.month').textContent}`;
      const selectedDay = moment(selected, 'D MMMM YYYY').format('dddd, MMMM D, YYYY');
      updateSelectedDate(selectedDay);
      toggleCalendar();
    }
  }

  render() {
    const {
      previousMonth, nextMonth, generateCalendar, header, monthGrid,
    } = this.props;
    return (
      <OuterCalendar>
        <InnerCalendar>
          <CalendarHead>
            <div>
              <span
                role="button"
                onClick={async () => {
                  await new Promise((resolve) => {
                    previousMonth();
                    resolve();
                  });
                  generateCalendar();
                }}
              >
                <i className="fas fa-angle-double-left" />
              </span>
              <span className="month">{header}</span>
              <span
                role="button"
                onClick={async () => {
                  await new Promise((resolve) => {
                    nextMonth();
                    resolve();
                  });
                  generateCalendar();
                }}
              >
                <i className="fas fa-angle-double-right" />
              </span>
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
            {monthGrid.map(week => (
              <div>
                {week.map(day => (
                  <span role="button" onClick={this.toggleSelected}>{day}</span>
                ))}
              </div>
            ))}
          </CalendarBody>
        </InnerCalendar>
      </OuterCalendar>
    );
  }
}

export default Calendar;
