import React, { Component } from 'react';
import { render } from 'react-dom';

class App extends Component {

  constructor() {
    super();
  }

  render() {
    return (
      <div>
        Hello World
      </div>
    );
  }

}

render(
  <App />,
  document.querySelector('#reservation-container')
);
