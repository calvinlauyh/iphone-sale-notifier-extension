import 'regenerator-runtime/runtime';
import { takeEvery, call, put } from 'redux-saga/effects';
import {
  STATUS_SYNC_REQUESTED,
  STATUS_SYNC_SUCCEEDED,
  STATUS_SYNC_FAILED,
  STATUS_SET
} from 'actions/actionTypes';

function doSyncStatus(status) {
  return new Promise((resolve, reject) => {
    chrome.runtime.sendMessage({
      type: STATUS_SET,
      status
    }, (response) => {
      if (!response) {
        reject();
        return;
      }
      resolve();
    });
  });
}

function* syncStatus(action) {
  const {
    status
  } = action;
  try {
    yield call(doSyncStatus, status);
    yield put({ type: STATUS_SET, status });
    yield put({ type: STATUS_SYNC_SUCCEEDED });
  } catch(error) {
    yield put({ type: STATUS_SYNC_FAILED, error });
  }
}

export default function* watchStatus() {
  yield takeEvery(STATUS_SYNC_REQUESTED, syncStatus);
}