import React, { Component } from 'react';
import styled from 'styled-components';

const TimeBox = styled.li`
  padding: 3px;
  width: 50%;
  box-sizing: border-box;
  display: inline-block;
  position: relative;
`;


const IconWrapper = styled.span`
  position: absolute; 
  left: 14px;
  top: 0;
  bottom: 0;
  height: 20px;
  width: 14px;
  margin: auto;
`;

const SelectWrapper = styled.select`
  width: 100%;
  box-sizing: border-box;
  border: 1px solid #ccc;
  height: 30px;
  padding: 5px 9px;
  padding-left: 30px;
  border-radius: 3px;
  background-color: white;
  appearance: none;
  cursor: pointer;
`;

const TriangleWrapper = styled.span`
  position: absolute; 
  right: 6px;
  top: 0;
  bottom: 0;
  height: 20px;
  width: 14px;
  margin: auto;
`;

class Time extends Component {

  render() {
    return (
      <TimeBox>
        <IconWrapper>
          <i class="far fa-clock"></i>
        </IconWrapper>
        <SelectWrapper />
        <TriangleWrapper>
          <i className="fas fa-caret-down"></i>
        </TriangleWrapper>
      </TimeBox>
    );
  }

}

export default Time;
