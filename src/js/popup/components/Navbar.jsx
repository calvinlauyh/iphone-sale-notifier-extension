import React, { Component } from 'react';
import Radium from 'radium';
import { translate } from 'react-i18next';
import IonIcon from 'react-ionicons';

@translate('translation')
@Radium
export default class Navbar extends Component {
  render() {
    const {
      t,
      onBack,
      title,
      children
    } = this.props;

    return (
      <div style={styles.container}>
        {onBack && (
          <a href="#" style={styles.backBtn}>
            <IonIcon icon="ion-chevron-left" fontSize="22px" color="#fff" />
          </a>
        )}
        <div style={styles.title}>{title}</div>
        <div style={styles.buttonContainer}>
          {children}
        </div>
      </div>
    );
  }
}

const containerHeight = 60;
const styles = {
  container: {
    display: 'flex',
    position: 'fixed',
    top: 0,
    left: 0,
    flexDirection: 'row',
    width: '100%',
    height: containerHeight,
    lineHeight: containerHeight+'px',
    color: '#fff',
    backgroundColor: '#333',
    zIndex: 9999
  },
  backBtn: {
    display: 'inline-block',
    paddingLeft: 10,
    textAlign: 'center',
    color: '#FFF',
    fontSize: 30,
    textDecoration: 'none'
  },
  title: {
    flex: 1,
    paddingLeft: 20,
    fontSize: 17
  },
  buttonContainer: {
    paddingRight: 10
  },
  button: {
    display: 'inline-block',
    border: 0,
    padding: '0 10px',
    textAlign: 'center',
    color: '#FFF',
    fontSize: 30,
    textDecoration: 'none',
    outline: 'none'
  },
  textButton: {
    fontSize: 15,
  }
}

Navbar.styleConstant = {
  height: containerHeight
};
Navbar.styles = {
  button: styles.button,
  textButton: styles.textButton
};
