import React, { Component } from 'react';
import Index from './mmo_0/index.js'
export default class Hub extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }
  render() {
      return (
        <React.Fragment>
            <Index/>
        </React.Fragment>
      );
  }
}

