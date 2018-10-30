import React, { Component } from 'react';
import styled from 'styled-components';

const PeopleBox = styled.li`
  position: relative;
  padding: 3px;
  width: 50%;
  box-sizing: border-box;
  display: inline-block;
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

class People extends Component {

  render() {
    return (
      <PeopleBox>
        <IconWrapper>
          <i class="fas fa-users"></i>
        </IconWrapper>
        <SelectWrapper/>
        <TriangleWrapper>
          <i className="fas fa-caret-down"></i>
        </TriangleWrapper>

      </PeopleBox>   
    );
  }

}

export default People;

