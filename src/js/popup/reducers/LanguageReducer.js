import constant from 'constant';
import {
  LANGUAGE_SET
} from 'actions/actionTypes';

const initialState = constant.LANGUAGE.EN;
const LanguageReducer = (state = initialState, action) => {
  switch(action.type) {
    case LANGUAGE_SET:
      return action.language;
    default:
      return state;
  }
}

export default LanguageReducer;
