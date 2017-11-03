import { combineReducers } from 'redux';
import MonitorListReducer from './MonitorListReducer';
import PhoneStatusReducer from './PhoneStatusReducer';
import StatusReducer from './StatusReducer';
import LanguageReducer from './LanguageReducer';

const createReducer = () => combineReducers({
  monitorList: MonitorListReducer,
  phoneStatus: PhoneStatusReducer,
  status: StatusReducer,
  language: LanguageReducer
});
export default createReducer;
