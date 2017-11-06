import React, { Component } from 'react';
import PropTypes from 'prop-types';
import i18n from 'popup/i18n';
import { connect } from 'react-redux';
import reactStringReplace from 'react-string-replace';
import { translate } from 'react-i18next';
import Radium from 'radium';
import IonIcon from 'react-ionicons';
import constant from 'constant';
import chromep from 'library/chrome-promise';

import Navbar from 'popup/components/Navbar';
import ToggleCheckbox from 'popup/components/ToggleCheckbox';

import {
  LANGUAGE_SET,
  LANGUAGE_SYNC_REQUESTED
} from 'actions/actionTypes';

@translate('translation')
@Radium
class About extends Component {
  initLanguage = () => {
    const {
      setLanguage
    } = this.props;
    // Get language from local storage
    const language = localStorage.getItem('language');
    if (language === null) {
      // language is not found in local storage. Normally the background
      // script will repair it. Retry after some time
      console.error('Missing `language` in localStorage');
      setTimeout(this.initLanguage, 5000);
      return;
    }
    setLanguage(JSON.parse(language));
  }

  handleBackClick = (e) => {
    e.preventDefault();

    this.props.history.push('/');
  }

  handleLanguageChange = (e) => {
    this.props.syncLanguage(e.target.value);
  }

  gotoGitHub(e) {
    e.preventDefault();

    chromep.tabs.create({
      active: true,
      selected: true,
      url: 'https://github.com/yuhlau/iphone-sale-notifier-extension'
    });
  }

  gotoSmashicon(e) {
    e.preventDefault();

    chromep.tabs.create({
      active: true,
      selected: true,
      url: 'https://www.flaticon.com/authors/smashicons'
    });
  }

  gotoFlaticon(e) {
    e.preventDefault();

    chromep.tabs.create({
      active: true,
      selected: true,
      url: 'https://www.flaticon.com'
    });
  }

  componentDidMount() {
    this.initLanguage();
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
    const self = this;
    const nextLanguage = nextProps.language;
    if (nextLanguage !== this.props.language) {
      i18n.changeLanguage(nextLanguage, (err) => {
        if (err) {
          console.error(err);
        }
        self.forceUpdate();
      });
    }
  }

  render() {
    const {
      t,
      status,
      language
    } = this.props;

    return (
      <div>
        <Navbar
          title={t('about.title')}
          onBack={this.handleBackClick} />
        <div style={styles.container}>
          <div style={styles.languageSelectorContainer}>
            <select style={styles.languageSelector} onChange={this.handleLanguageChange}>
              <option value={constant.LANGUAGE.EN} selected={language===constant.LANGUAGE.EN}>
                {t('about.language.options.en')}
              </option>
              <option value={constant.LANGUAGE.ZH_TW} selected={language===constant.LANGUAGE.ZH_TW}>
                {t('about.language.options.zh_tw')}
              </option>
              {/*<option value={constant.LANGUAGE.ZH_HK}>{t('about.language.options.zh_hk')}</option>*/}
            </select>
          </div>
          <div style={styles.bodyContainer}>
            <div style={styles.section}>
              <div style={styles.subheader}>{t('about.introduction.title')}</div>
              <div style={styles.content}>{t('about.introduction.content')}</div>
              <div style={styles.content}>{
                reactStringReplace(
                  t('about.introduction.opensource'), '${GITHUB}', (match, i) => (
                  <a key="github"style={styles.link} href="#" onClick={this.gotoGitHub}>GitHub</a>
                ))
              }</div>
            </div>
            <div style={styles.section}>
              <div style={styles.subheader}>{t('about.attribution.title')}</div>
              <div style={styles.content}>{
                reactStringReplace(
                reactStringReplace(
                  t('about.attribution.flaticon'), '${SMASHICONS}', (match, i) => (
                    <a key="smashicons" style={styles.link} href="#" onClick={this.gotoSmashicon}>Smashicons</a>
                  )
                ), '${FLATICON}', (match, i) => (
                  <a key="flaticon" style={styles.link} href="#" onClick={this.gotoFlaticon}>www.flaticon.com</a>
                ))
              }</div>
            </div>
            <div style={styles.section}>
              <div style={styles.subheader}>{t('about.disclaimer.title')}</div>
              <div style={styles.content}>{t('about.disclaimer.content')}</div>
              <div style={styles.content}>{t('about.disclaimer.mit')}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const styles = {
  container: {
    marginTop: Navbar.styleConstant.height
  },
  bodyContainer: {
    paddingTop: 50,
  },
  languageSelectorContainer: {
    position: 'relative'
  },
  languageSelector: {
    position: 'absolute',
    display: 'block',
    top: 10,
    right: 30,
    height: 35,
    outline: 'none'
  },
  section: {
    marginBottom: 15
  },
  subheader: {
    width: 250,
    borderBottom: '1px solid #CCC',
    padding: '0 30px 5px',
    marginBottom: 5,
    color: '#D54'
  },
  content: {
    padding: '0 30px 20px',
    textAlign: 'center'
  },
  link: {
    color: '#4c5b5c',
    outline: 'none',
    textDecoration: 'underline'
  }
}

About.propTypes = {
  language: PropTypes.string,
  setLanguage: PropTypes.func
};
const mapStateToProps = (state, ownProps) => ({
  language: state.language
});
const mapDispatchToProps = (dispatch, ownProps) => ({
  setLanguage: (language) => {
    dispatch({
      type: LANGUAGE_SYNC_REQUESTED,
      language
    });
  },
  syncLanguage: (language) => {
    dispatch({
      type: LANGUAGE_SYNC_REQUESTED,
      language
    });
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(About);
