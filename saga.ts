import { all, call, delay, put, take, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { failure, loadAllPostsListSuccess, tickClock, loadPostSuccess } from './actions';
import { actionTypes } from './actions/types';
import { SagaIterator } from 'redux-saga';
import { LoadPost } from './interfaces/actions.interfaces';

function* runClockSaga(): SagaIterator {
  yield take(actionTypes.START_CLOCK);
  while (true) {
    yield put(tickClock(false));
    yield delay(1000);
  }
}

function* loadAllPostsListSaga(): SagaIterator {
  try {
    const res = yield call(axios.get, "https://simple-blog-api.crew.red/posts");
    yield put(loadAllPostsListSuccess(res.data));
  } catch (err) {
    yield put(failure(err));
  }
}

function* loadPostSaga(action: LoadPost): SagaIterator {
  console.log(action)
  try {
    const res = yield call(axios.get, `https://simple-blog-api.crew.red/posts/${action.payLoad}?_embed=comments`);
    yield put(loadPostSuccess(res.data));
  } catch (err) {
    yield put(failure(err));
  }
}

function* rootSaga(): SagaIterator {
  yield all([call(runClockSaga), takeLatest(actionTypes.LOAD_ALL_POSTS_LIST, loadAllPostsListSaga), takeLatest(actionTypes.LOAD_POST, loadPostSaga)]);
}

export default rootSaga;
