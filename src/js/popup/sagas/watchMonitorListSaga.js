import 'regenerator-runtime/runtime';
import { takeEvery, call, put } from 'redux-saga/effects';
import {
  MONITORLIST_SYNC_REQUESTED,
  MONITORLIST_SYNC_SUCCEEDED,
  MONITORLIST_SYNC_FAILED,
  MONITORLIST_SET
} from 'actions/actionTypes';

function doSyncMonitorList(monitorList) {
  return new Promise((resolve, reject) => {
    chrome.runtime.sendMessage({
      type: MONITORLIST_SET,
      monitorList
    }, (response) => {
      if (!response) {
        reject();
        return;
      }
      resolve();
    });
  });
}

function* syncMonitorList(action) {
  const {
    monitorList
  } = action;
  try {
    yield call(doSyncMonitorList, monitorList);
    yield put({ type: MONITORLIST_SET, monitorList });
    yield put({ type: MONITORLIST_SYNC_SUCCEEDED });
  } catch(error) {
    yield put({ type: MONITORLIST_SYNC_FAILED, error });
  }
}

export default function* watchMonitorList() {
  yield takeEvery(MONITORLIST_SYNC_REQUESTED, syncMonitorList);
}