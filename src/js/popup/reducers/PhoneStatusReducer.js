import {
  PHONESTATUS_SET
} from 'actions/actionTypes';

const initialState = {
  data: {}
};

const PhoneStatusReducer = (state = initialState, action) => {
  switch(action.type) {
    case PHONESTATUS_SET:
      return Object.assign({}, state, {
        data: action.phoneStatus
      });
    default:
      return state;
  }
}

export default PhoneStatusReducer;
