import React, { Component } from 'react';
import styled from 'styled-components';
import moment from 'moment';
import Weekday from './Weekday.jsx';

const Wrapper = styled.div`
  h4 {
    color: #d32323;
    margin-bottom: 14px;
  }
`;

const HourTable = styled.div`

`;

class Hour extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Wrapper>
        <h4>Hour</h4>
        <HourTable>
          {this.props.hours.map(weekday => (
            <Weekday day={weekday} />
          ))}
        </HourTable>
      </Wrapper>
    );
  }

}

export default Hour;
