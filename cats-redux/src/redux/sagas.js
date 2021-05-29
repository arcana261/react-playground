import ACTION_TYPES from './types'
import { all, takeLatest } from 'redux-saga/effects'

function* initializeApp(action) {
}

function* mainSaga() {
  yield takeLatest(ACTION_TYPES.INITIALIZE_APP, initializeApp)
}

export default function* rootSaga() {
  yield all(mainSaga()) //postsSaga()
}
