import React, { Component } from 'react';
import { render } from 'react-dom';
import styled from 'styled-components';
import axios from 'axios';
import moment from 'moment'
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
  a {
    margin-left: 5px;
  }
`;

const ReservationFormWrapper = styled.div`
  margin: 0;
`;

class App extends Component {

  constructor() {
    super();
    this.state = {
      reservations: [],
      hours: []
    };
  }

  componentDidMount() {
    const restaurant_id = window.location.pathname.slice(1);
    axios.get(`/api/${restaurant_id}/reservation`)
      .then(result => {
        const reservations = result.data.map(reservation => {
          return Object.assign({}, reservation, {
            time: moment(reservation.time).format('kk:mm'),
            date: moment(reservation.time).format('MM YYYY')
          });
        });
        axios.get(`/api/${restaurant_id}/hour`)
          .then(result => {
            const hours = result.data.map(weekday => {
              return Object.assign({}, weekday, {
                opening_hour: weekday.opening_hour.slice(0, 5),
                closing_hour: weekday.closing_hour.slice(0, 5)
              });
            });
            this.setState({
              reservations: reservations,
              hours: hours
            });
          })
      });
  }

  render() {
    return (
      <Wrapper>
        <Heading>
          <i className="far fa-calendar"></i>
          <a>Make a Reservation</a>
        </Heading>
        <ReservationFormWrapper>
          <ReservationForm
            reservations={this.state.reservations}
            hours={this.state.hours}
          />
        </ReservationFormWrapper>
      </Wrapper>
    );
  }

}

render(
  <App />,
  document.querySelector('#reservation-container')
);
