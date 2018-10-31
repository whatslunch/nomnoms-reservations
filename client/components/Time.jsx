import React, { Component } from 'react';
import styled from 'styled-components';
import moment from 'moment';

const TimeBox = styled.li`
  padding: 3px;
  width: 50%;
  box-sizing: border-box;
  display: inline-block;
  position: relative;
  cursor: pointer;
  span {
    position: absolute; 
    top: 0;
    bottom: 0;
    height: 20px;
    width: 14px;
    margin: auto;
    cursor: pointer;
    &.left {
      left: 10px;
    }
    &.right {
      right: 6px;
    }
  }
  select {
    width: 100%;
    box-sizing: border-box;
    border: 1px solid #ccc;
    height: 30px;
    padding: 5px 9px;
    padding-left: 30px;
    cursor: pointer;
    border-radius: 3px;
    background-color: white;
    appearance: none;
  }
`;

class Time extends Component {

  constructor(props) {
    super(props);
    this.state = {
      timeArr: []
    };
  }

  componentDidUpdate() {
  }

  populateHours() {
    let hours = this.props.hours;
    let time = hours.opening_hour;
    const timeArr = [];
    while (hours.opening_hour !== hours.closing_hour) {
      timeArr.push(time);
      time = hours.opening_hour.match(/\d/).join('');
      console.log(time);
    }
  }

  render() {
    return (
      <TimeBox>
        <span className="left">
          <i class="far fa-clock"></i>
        </span>
        <select></select>
        <span className="right">
          <i className="fas fa-caret-down"></i>
        </span>
      </TimeBox>
    );
  }

}

export default Time;
