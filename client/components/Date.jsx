import React, { Component } from 'react';
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

const Date = (props) => (
  <DateBox onClick={props.toggleCalendar}>
    <span className="left">
      <i class="far fa-calendar"></i>
    </span>
    <input type="text" value={props.selectedDate} />
    <span className="right">
      <i className="fas fa-caret-down"></i>
    </span>
  </DateBox>   
);


export default Date;
