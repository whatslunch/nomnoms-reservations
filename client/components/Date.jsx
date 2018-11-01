import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const DateBox = styled.li`
  padding: 3px;
  width: 100%;
  box-sizing: border-box;
  position: relative;
  cursor: pointer;
  span {
    top: 0;
    bottom: 0;
    height: 20px;
    width: 14px;
    margin: auto;
    position: absolute;
    &.left {
      left: 14px;
    }
    &.right {
      right: 6px;
    }
  }
  input {
    width: 100%;
    box-sizing: border-box;
    border: 1px solid #ccc;
    height: 30px;
    padding: 5px 9px;
    padding-left: 30px;
    border-radius: 3px;
    cursor: pointer;
  }
`;

const Date = ({ toggleCalendar, selectedDate }) => (
  <DateBox onClick={toggleCalendar}>
    <span className="left">
      <i className="far fa-calendar" />
    </span>
    <input type="text" value={selectedDate} />
    <span className="right">
      <i className="fas fa-caret-down" />
    </span>
  </DateBox>
);

Date.propTypes = {
  toggleCalendar: PropTypes.func.isRequired,
  selectedDate: PropTypes.func.isRequired,
};


export default Date;
