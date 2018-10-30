import React, { Component } from 'react';
import styled from 'styled-components';
import Date from './Date.jsx';
import Calendar from './Calendar.jsx';
import Time from './Time.jsx';
import People from './People.jsx';

const ListBox = styled.ul`
  list-style-type: none;
  flex-wrap: wrap;
  margin: 0;
  padding: 0;
  position: relative;
`;

const SubmitBox = styled.div`
  padding: 3px;
  width: 100%;
  box-sizing: border-box;
`;

const SubmitWrapper = styled.button`
  width: 100%;
  box-sizing: border-box;
  height: 30px;
  padding: 5px 9px;
  border: rgb(51, 51, 51) solid 1px;
  border-radius: 3px;
  font-weight: 700;
  color: white;
  background-color: rgb(60, 181, 46);
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.3);
`;

class ReservationForm extends Component {

  constructor() {
    super();
    this.state = {
      dateClicked: false
    };
    this.toggleCalendar = this.toggleCalendar.bind(this);
  }

  toggleCalendar() {
    this.setState({
      dateClicked: !this.state.dateClicked
    });
  }

  render() {
    let calendar;
    if (this.state.dateClicked) {
      calendar = <Calendar />
    }
    return (
      <ListBox>
        <Date toggleCalendar={this.toggleCalendar}/>
        {calendar}
        <Time />
        <People />
        <SubmitBox>
          <SubmitWrapper>Find a Table</SubmitWrapper>
        </SubmitBox>
      </ListBox>
    );
  }

}

export default ReservationForm;
