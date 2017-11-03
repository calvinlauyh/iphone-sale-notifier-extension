import {
  MONITORLIST_SYNC_RESET,
  MONITORLIST_SYNC_REQUESTED,
  MONITORLIST_SYNC_SUCCEEDED,
  MONITORLIST_SYNC_FAILED,
  MONITORLIST_SET,

  SYNCSTATUS_NOOP,
  SYNCSTATUS_LOADING,
  SYNCSTATUS_SYNCED,
  SYNCSTATUS_FAILED
} from 'actions/actionTypes';

const initialState = {
  status: SYNCSTATUS_NOOP,
  data: [],
  error: null
};

const MonitorListReducer = (state = initialState, action) => {
  switch(action.type) {
    case MONITORLIST_SET:
      return Object.assign({}, state, {
        data: action.monitorList
      });
    case MONITORLIST_SYNC_RESET:
      return Object.assign({}, state, {
        status: SYNCSTATUS_NOOP
      });
    case MONITORLIST_SYNC_REQUESTED:
      return Object.assign({}, state, {
        status: SYNCSTATUS_LOADING
      });
    case MONITORLIST_SYNC_SUCCEEDED:
      return Object.assign({}, state, {
        status: SYNCSTATUS_SYNCED
      });
    case MONITORLIST_SYNC_FAILED:
      return Object.assign({}, state, {
        status: SYNCSTATUS_FAILED,
        error: action.error
      });
    default:
      return state;
  }
}

export default MonitorListReducer;
