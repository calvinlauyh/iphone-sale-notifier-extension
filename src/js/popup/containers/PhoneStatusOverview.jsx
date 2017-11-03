import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';
import { connect } from 'react-redux';
import Radium from 'radium';
import constant from 'constant';
import iPhoneDb from 'db/iPhoneDb';
import { buildOverview } from 'popup/utils/phoneStatusUtils';

import Navbar from 'popup/components/Navbar';
import PhoneList from 'popup/components/PhoneList';
import ToggleCheckbox from 'popup/components/ToggleCheckbox';

import {
  MONITORLIST_SET,
  PHONESTATUS_SET,
  STATUS_SET,
  STATUS_SYNC_REQUESTED
} from 'actions/actionTypes';

@translate('translation')
@Radium
class PhoneStatusOverview extends Component {
  initEnable = () => {
    const {
      setEnable
    } = this.props;
    // Get status from local storage
    const status = localStorage.getItem('status');
    if (status === null) {
      // status is not found in local storage. Normally the background
      // script will repair it. Retry after some time
      console.error('Missing `status` in localStorage');
      setTimeout(this.initEnable, 5000);
      return;
    }
    setEnable(JSON.parse(status) === constant.STATUS.ENABLED);
  }

  updatePhoneStatus = () => {
    const {
      setPhoneStatus
    } = this.props;
    // Get phoneStatus from local storage
    const phoneStatus = localStorage.getItem('phoneStatus');
    if (phoneStatus === null) {
      // phoneStatus is not found in local storage. Normally the background
      // script will repair it. Retry after some time
      console.error('Missing `phoneStatus` in localStorage');
      setTimeout(this.updatePhoneStatus, 5000);
      return;
    }
    setPhoneStatus(JSON.parse(phoneStatus));
  }

  initMonitorList = () => {
    const {
      setMonitorList
    } = this.props;
    // Get monitorList from local storage
    const monitorList = localStorage.getItem('monitorList');
    if (monitorList === null) {
      // phoneStatus is not found in local storage. Normally the background
      // script will repair it. Retry after some time
      console.error('Missing `monitorList` in localStorage');
      setTimeout(this.initMonitorList, 5000);
      return;
    }
    setMonitorList(JSON.parse(monitorList));
  }

  handleEditClick = (e) => {
    e.preventDefault();

    this.props.history.push('/monitorListSetting');
  }

  handleAboutClick = (e) => {
    e.preventDefault();

    this.props.history.push('/about');
  }

  handleStatusChange = (enable) => {
    this.props.syncEnable(enable);
  }

  componentDidMount() {
    this.initEnable();
    this.initMonitorList();

    // Regularly update the phone status from local storage
    this.updatePhoneStatus();
    this.updateTimer = setInterval(this.updatePhoneStatus, 5000);
  }

  componentWillUnmount() {
    clearInterval(this.updateTimer);
  }

  renderModelStatus(modelStatus) {
    return (
      <PhoneList.Model
        key={modelStatus[0].model}
        items={modelStatus}
      />
    );
  }

  render() {
    const {
      t,
      monitorList,
      phoneStatus,
      enabled
    } = this.props;

    const phoneStatusOverview = buildOverview(iPhoneDb, monitorList, phoneStatus);

    return (
      <div>
        <Navbar title={t('app.name')}>
          <a href="#"
            style={[Navbar.styles.button, Navbar.styles.textButton]}
            onClick={this.handleEditClick}
          >
            {t('phoneStatusOverview.edit')}
          </a>
          <a href="#"
            style={[Navbar.styles.button, Navbar.styles.textButton]}
            onClick={this.handleAboutClick}
          >
            {t('phoneStatusOverview.about')}
          </a>
        </Navbar>
        <div style={styles.bodyContainer}>
          <div style={styles.statusContainer}>
            <div style={styles.statusLabel}>{t('phoneStatusOverview.statusLabel')}</div>
            <div style={styles.statusInput}>
              <ToggleCheckbox checked={enabled} onChange={this.handleStatusChange} />
            </div>
          </div>
          <div style={styles.overviewContainer}>
            {phoneStatusOverview.map(this.renderModelStatus)}
          </div>
          {phoneStatusOverview.length === 0 && <div style={styles.promptChooseContainer}>
            {t('phoneStatusOverview.promptChoose')}
          </div>}
          <div style={styles.promptDisclaimerContainer}>
            {t('phoneStatusOverview.promptDisclaimer')}
          </div>
        </div>
      </div>
    );
  }
}

const statusFieldHeight = 30;
const styles = {
  bodyContainer: {
    position: 'relative',
    marginTop: Navbar.styleConstant.height
  },
  statusContainer: {
    display: 'flex',
    flexDirection: 'row',
    position: 'absolute',
    right: 0,
    top: 5,
    zIndex: 2
  },
  statusLabel: {
    flex: 1,
    paddingRight: 10,
    lineHeight: statusFieldHeight+'px'
  },
  statusInput: {
    flex: 1,
    paddingRight: 10
  },
  overviewContainer: {},
  promptChooseContainer: {
    padding: '80px 30px 35px',
    textAlign: 'center',
    fontSize: 15,
    color: '#D54'
  },
  promptDisclaimerContainer: {
    padding: '15px 30px 15px',
    textAlign: 'center'
  }
}

PhoneStatusOverview.propTypes = {
  monitorList: PropTypes.array,
  phoneStatus: PropTypes.object,
  enabled: PropTypes.bool,
  setMonitorList: PropTypes.func,
  setPhoneStatus: PropTypes.func,
  setEnable: PropTypes.func,
  syncEnable: PropTypes.func
};
const mapStateToProps = (state, ownProps) => ({
   monitorList: state.monitorList.data,
   phoneStatus: state.phoneStatus.data,
   enabled: (state.status === constant.STATUS.ENABLED)
});
const mapDispatchToProps = (dispatch, ownProps) => ({
  setMonitorList: (monitorList) => {
    dispatch({
      type: MONITORLIST_SET,
      monitorList
    });
  },
  setPhoneStatus: (phoneStatus) => {
    dispatch({
      type: PHONESTATUS_SET,
      phoneStatus
    });
  },
  setEnable: (enable) => {
    dispatch({
      type: STATUS_SET,
      status: enable? constant.STATUS.ENABLED: constant.STATUS.DISABLED
    });
  },
  syncEnable: (enable) => {
    dispatch({
      type: STATUS_SYNC_REQUESTED,
      status: enable? constant.STATUS.ENABLED: constant.STATUS.DISABLED
    });
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(PhoneStatusOverview);
