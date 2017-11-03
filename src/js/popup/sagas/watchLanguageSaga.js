import 'regenerator-runtime/runtime';
import { takeEvery, call, put } from 'redux-saga/effects';
import {
  LANGUAGE_SYNC_REQUESTED,
  LANGUAGE_SYNC_SUCCEEDED,
  LANGUAGE_SYNC_FAILED,
  LANGUAGE_SET
} from 'actions/actionTypes';

function doSyncLanguage(language) {
  return new Promise((resolve, reject) => {
    chrome.runtime.sendMessage({
      type: LANGUAGE_SET,
      language
    }, (response) => {
      if (!response) {
        reject();
        return;
      }
      resolve();
    });
  });
}

function* syncLanguage(action) {
  const {
    language
  } = action;
  try {
    yield call(doSyncLanguage, language);
    yield put({ type: LANGUAGE_SET, language });
    yield put({ type: LANGUAGE_SYNC_SUCCEEDED });
  } catch(error) {
    yield put({ type: LANGUAGE_SYNC_FAILED, error });
  }
}

export default function* watchLanguage() {
  yield takeEvery(LANGUAGE_SYNC_REQUESTED, syncLanguage);
}
