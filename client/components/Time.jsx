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
      left: 14px;
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
    if (this.props.hours) {
      this.populateHours();
    }
  }

  populateHours() {
    new Promise((resolve, reject) => {
      if (this.state.timeArr.length > 0) {
        reject();
      } else {
        resolve();
      }
    })
    .then(() => {
      let hours = this.props.hours;
      let time = hours.opening_hour;
      const timeArr = [];
      while (time !== hours.closing_hour) {
        timeArr.push(time);
        time = moment(time, 'kk:mm').add(30, 'minutes').format('kk:mm');
      }
      timeArr.push(time);
      this.setState({
        timeArr: timeArr
      });
    })
    .catch(() => { return; });
  }

  render() {
    if (this.state.timeArr.length > 0) {
      return (
        <TimeBox>
          <span className="left">
            <i class="far fa-clock"></i>
          </span>
          <select>
            {this.state.timeArr.map(time => (
              <option>{time}</option>
            ))}
          </select>
          <span className="right">
            <i className="fas fa-caret-down"></i>
          </span>
        </TimeBox>
      );
    } else {
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

}

export default Time;
