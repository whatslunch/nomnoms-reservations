import React from 'react';
import styled from 'styled-components';
import moment from 'moment';

const WeekdayWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  span {
    font-size: 14px;
    &.weekday {
      width: 54px;
      font-weight: bold;
    }
    &.hours {
      flex-grow: 3;
    }
    &.extra {
      flex-grow: 2;
      color: #41a700;
      font-size: 12px;
      font-weight: bold;
    }
  }
`;

const Weekday = (props) => {
  let day = moment(props.day.weekday, 'd').format('ddd');
  let opening = moment(props.day.opening_hour, 'kk:mm').format('hh:mm a');
  let closing = moment(props.day.closing_hour, 'kk:mm').format('hh:mm a');
  let today;
  if (
    parseInt(moment().format('d')) === parseInt(props.day.weekday) &&
    parseInt(moment().format('kk')) <= parseInt(moment(props.day.closing_hour, 'kk:mm').format('kk')) &&
    parseInt(moment().format('kk')) >= parseInt(moment(props.day.opening_hour, 'kk:mm').format('kk'))
  ) {
    today = <span>Open now</span>
  }
  return (
    <WeekdayWrapper>
      <span className="weekday">
        {day}
      </span>
      <span className="hours">
        <div>{`${opening} -`}</div>
        <div>{closing}</div>
      </span>
      <span className="extra">
        {today}
      </span>
    </WeekdayWrapper>
  );
}

export default Weekday;
