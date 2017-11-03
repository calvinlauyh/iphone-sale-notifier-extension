import React, { Component } from 'react';
import Radium from 'radium';

import App from 'popup/App';
import Navbar from './Navbar';

@Radium
export default class WarningMessage extends Component {
  render() {
    const {
      message
    } = this.props;
    return (
      <div style={styles.container}>{message}</div>
    );
  }
}

const styles = {
  container: {
    position: 'fixed',
    top: Navbar.styleConstant.height+30,
    left: '50%',
    width: 180,
    marginLeft: -100,
    padding: '0 10px',
    textAlign: 'center',
    color: '#FFF',
    lineHeight: '35px',
    backgroundColor: '#D54',
    boxShadow: '3px 3px 10px #888'
  }
}
