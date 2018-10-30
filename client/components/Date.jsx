import React, { Component } from 'react';
import styled from 'styled-components';

const DateBox = styled.li`
  padding: 3px;
  width: 100%;
  box-sizing: border-box;
  position: relative;
  cursor: pointer;
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

const InputWrapper = styled.input`
  width: 100%;
  box-sizing: border-box;
  border: 1px solid #ccc;
  height: 30px;
  padding: 5px 9px;
  padding-left: 30px;
  border-radius: 3px;
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

class Date extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <DateBox onClick={this.props.toggleCalendar}>
        <IconWrapper>
          <i class="far fa-calendar"></i>
        </IconWrapper>
        <InputWrapper type="text" value="Hey" />
        <TriangleWrapper>
          <i className="fas fa-caret-down"></i>
        </TriangleWrapper>
      </DateBox>   
    );
  }

}

export default Date;
