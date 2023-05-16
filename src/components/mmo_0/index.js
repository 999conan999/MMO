import React, { Component } from 'react';
import Index_menu from './main'
import { Provider } from 'react-redux';
import store from './store_redux/store';
export default class Index extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }
  render() {
      return (
        <Provider store={store}>
            <Index_menu/>
        </Provider>
      );
  }
}

