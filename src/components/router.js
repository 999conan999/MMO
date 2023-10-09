import React, { Component } from 'react';
import Index from './mmo_0/index.js'
// import Generate_contents from './plugin_render_contents/index.js'
export default class Hub extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }
  render() {
      return (
        <React.Fragment>
            <Index/>
            {/* <Generate_contents/> */}
        </React.Fragment>
      );
  }
}

