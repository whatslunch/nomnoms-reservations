import React from 'react';
import PropTypes from 'prop-types';
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
      font-size: 12px;
      font-weight: bold;
      &.open {
        color: #41a700;
      }
      &.closed {
        color: rgb(211, 35, 35);
      }
    }
  }
`;

const Weekday = ({ weekday }) => {
  const day = moment(weekday.weekday, 'd').format('ddd');
  const opening = moment(weekday.opening_hour, 'kk:mm').format('hh:mm a');
  const closing = moment(weekday.closing_hour, 'kk:mm').format('hh:mm a');
  let today;
  if (
    parseInt(moment().format('d'), 10) === parseInt(weekday.weekday, 10)
    && parseInt(moment().format('kk'), 10) <= parseInt(moment(weekday.closing_hour, 'kk:mm').format('kk'), 10)
    && parseInt(moment().format('kk'), 10) >= parseInt(moment(weekday.opening_hour, 'kk:mm').format('kk'), 10)
  ) {
    today = <span className="open">Open now</span>;
  } else {
    today = <span className="closed">Closed</span>;
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
};

Weekday.propTypes = {
  weekday: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.any)).isRequired,
};

export default Weekday;
