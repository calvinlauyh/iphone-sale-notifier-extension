import { put, takeEvery, all } from 'redux-saga/effects';
import watchMonitorListSaga from './watchMonitorListSaga';
import watchStatusSaga from './watchStatusSaga';
import watchLanguageSaga from './watchLanguageSaga';


// single entry point to start all Sagas at once
export default function* rootSaga() {
  yield all([
    watchMonitorListSaga(),
    watchStatusSaga(),
    watchLanguageSaga()
  ]);
}