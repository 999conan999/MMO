import './App.css';
import React, { Component } from 'react';
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Hub from './components/router';
export default class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
    }
  }
  render() {
      return (
        <React.Fragment>
        <ToastContainer
          position="top-right"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          />
        <Hub/>
      </React.Fragment>
      );
  }
}

