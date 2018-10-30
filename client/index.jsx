import React, { Component } from 'react';
import { render } from 'react-dom';
import styled from 'styled-components';
import ReservationForm from './components/Reservation-Form.jsx';

const Wrapper = styled.div`
  background-color: white;
  border: 1px solid #e6e6e6;
  border-radius: 4px;
  width: 300px;
  padding: 14px;
`;

const Heading = styled.h3`
  margin: 0;
  margin-bottom: 11px;
  padding: 0 11px;
`;

const HeadingWord = styled.a`
  margin-left: 5px;
`;

const ReservationFormWrapper = styled.div`
  margin: 0;
`;

class App extends Component {

  constructor() {
    super();
  }

  render() {
    return (
      <Wrapper>
        <Heading>
          <i className="far fa-calendar"></i>
          <HeadingWord>Make a Reservation</HeadingWord>
        </Heading>
        <ReservationFormWrapper>
          <ReservationForm />
        </ReservationFormWrapper>
      </Wrapper>
    );
  }

}

render(
  <App />,
  document.querySelector('#reservation-container')
);
