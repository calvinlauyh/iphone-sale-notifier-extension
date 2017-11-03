import constant from 'constant';
import {
  STATUS_SET
} from 'actions/actionTypes';

const initialState = constant.STATUS.ENABLED;
const StatusReducer = (state = initialState, action) => {
  switch(action.type) {
    case STATUS_SET:
      return action.status;
    default:
      return state;
  }
}

export default StatusReducer;
