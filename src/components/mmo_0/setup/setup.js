import React, { Component } from 'react';
import './setup.css'
// import { toast } from 'react-toastify';
import Template_input from '../lib/template_input/Template_input';
// import Editer from '../lib/editer/Editer';
export default class Setup extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }
  render() {
      return (
        <React.Fragment>
             <Template_input/>
             {/* <Editer/> */}
        </React.Fragment>
      );
  }
}

