import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';
import { connect } from 'react-redux';
import Radium from 'radium';
import IonIcon from 'react-ionicons';
import iPhoneDb from 'db/iPhoneDb';

import Navbar from 'popup/components/Navbar';
import PhoneList from 'popup/components/PhoneList';
import WarningMessage from 'popup/components/WarningMessage';

import {
  MONITORLIST_SYNC_RESET,
  MONITORLIST_SYNC_REQUESTED,

  SYNCSTATUS_NOOP,
  SYNCSTATUS_LOADING,
  SYNCSTATUS_SYNCED,
  SYNCSTATUS_FAILED
} from 'actions/actionTypes';

@translate('translation')
@Radium
class MonitorListSetting extends Component {
  constructor(props) {
    super(props);
    const phoneList = iPhoneDb.getAll();
    // Construct an iPhone list with an added property "checked"
    this.state = {
      phoneList: phoneList.map((phone) => {
        return Object.assign({}, phone, {checked: false});
      })
    };
  }

  handleItemClick = ({_id}) => {
    this.setState({
      phoneList: this.state.phoneList.map((phone) => {
        if (phone._id === _id) {
          // Reverse the property "checked"
          return Object.assign({}, phone, { checked: !phone.checked })
        }
        return phone;
      })
    });
  }

  handleBackClick = (e) => {
    e.preventDefault();

    this.props.history.push('/');
  }

  handleSyncClick = (e) => {
    e.preventDefault();

    // Get a list of checked iPhones
    const monitorList = this.state.phoneList.reduce((accuList, phone) => {
      if (phone.checked) {
        accuList.push(phone._id);
      }
      return accuList;
    }, []);
    this.props.sync(monitorList);
  }

  renderPhoneModel = (phoneList) => {
    return (
      <PhoneList.Model
        key={phoneList[0].model}
        itemCheckable={true}
        onItemClick={this.handleItemClick}
        items={phoneList}
      />
    );
  }

  componentDidMount() {
    // TODO: get the monitorList from Redux store
    const {
      monitorList
    } = this.props;
    // Check all the phones in monitorList during initialization
    this.setState({
      phoneList: this.state.phoneList.map((phone) => {
        return Object.assign({}, phone, {checked: !!(monitorList.find((id) => id === phone._id))});
      })
    });
  }

  componentWillReceiveProps(nextProps) {
    const {
      resetSyncStatus
    } = this.props;

    switch(nextProps.syncStatus) {
      case SYNCSTATUS_SYNCED:
        // Succesfully sync-ed, redirect to overview
        this.props.history.push('/');
      case SYNCSTATUS_FAILED:
        // Warning message will be displayed. Reset the sync status after some time
        setTimeout(() => {
          resetSyncStatus();
        }, 1500);
    }
  }

  render() {
    const {
      t,
      syncStatus
    } = this.props;

    // TODO: can support custom filtering, grouping and sorting
    return (
      <div>
        {
          syncStatus === SYNCSTATUS_FAILED &&
          <WarningMessage message={t('error.syncFailedMessage')} />
        }
        <Navbar
          title={t('monitorListSetting.title')}
          onBack={this.handleBackClick}
        >
          <a href="#" style={[Navbar.styles.button,Navbar.styles.textButton]} onClick={this.handleSyncClick}>
            {t('monitorListSetting.save')}
          </a>
        </Navbar>
        <div style={styles.bodyContainer}>
          {iPhoneDb.groupByModel(this.state.phoneList).map(this.renderPhoneModel)}
        </div>
      </div>
    );
  }
}

const styles = {
  bodyContainer: {
    marginTop: Navbar.styleConstant.height
  }
}

MonitorListSetting.propTypes = {
  monitorList: PropTypes.array,
  syncStatus: PropTypes.string,
  sync: PropTypes.func,
  resetSyncStatus: PropTypes.func
};
const mapStateToProps = (state, ownProps) => ({
  monitorList: state.monitorList.data,
  syncStatus: state.monitorList.status
});
const mapDispatchToProps = (dispatch, ownProps) => ({
  sync: (monitorList) => {
    dispatch({
      type: MONITORLIST_SYNC_REQUESTED,
      monitorList
    });
  },
  resetSyncStatus: () => {
    dispatch({ type: MONITORLIST_SYNC_RESET });
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(MonitorListSetting);
