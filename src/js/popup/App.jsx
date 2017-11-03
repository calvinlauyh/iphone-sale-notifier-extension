import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Radium from 'radium';
import { HashRouter, Route } from 'react-router-dom';
import { Provider, connect } from 'react-redux';
import configureStore from './store/configureStore'

import PhoneStatusOverview from './containers/PhoneStatusOverview';
import MonitorListSetting from './containers/MonitorListSetting';
import About from './containers/About';

const styles = {
  container: {
    width: 380,
    fontSize: 13
  }
};

@Radium
export default class App extends Component {
  static width = styles.container.width;

  render() {
    return (
      <Provider store={configureStore()}>
        <HashRouter>
          <div style={styles.container}>
            <Route exact path="/" component={PhoneStatusOverview} />
            <Route exact path="/monitorListSetting" component={MonitorListSetting} />
            <Route exact path="/about" component={About} />
          </div>
        </HashRouter>
      </Provider>
    );
  }
}
