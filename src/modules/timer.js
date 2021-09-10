import { createAction, handleActions } from 'redux-actions';
import { put, delay, takeEvery, takeLatest, select } from 'redux-saga/effects';
import produce from 'immer';

const INCREASE = 'timer/INCREASE';
const START = 'timer/START';
const STOP = 'timer/STOP';
const INIT = 'timer/INIT';
const INCREASE_ASYNC = 'timer/INCREASE_ASYNC';

export const increase = createAction(INCREASE);
export const start = createAction(START);
export const stop = createAction(STOP);
export const init = createAction(INIT);

export const increaseAsync = createAction(INCREASE_ASYNC, () => undefined);

function* increaseSaga() {
  while (yield select((state) => state.timer['flag'])) {
    const flag = yield select((state) => state.timer['flag']);
    if (!flag) {
      break;
    } else {
      yield delay(1000);
      yield put(increase());
    }
  }
}

export function* timerSaga() {
  yield takeLatest(INCREASE_ASYNC, increaseSaga);
}

const initialState = {
  count: 0,
  hour: 0,
  minute: 0,
  second: 0,
  flag: false,
};
const timer = handleActions(
  {
    [INCREASE]: (state) => {
      const newState = produce(state, (draft) => {
        if (draft['flag']) {
          draft['count'] += 1;
          draft['hour'] = Math.floor(draft['count'] / (60 * 60));
          draft['minute'] = Math.floor((draft['count'] % (60 * 60)) / 60);
          draft['second'] = Math.floor(draft['count'] % 60);
        }
      });
      return newState;
    },
    [START]: (state) => {
      const newState = produce(state, (draft) => {
        draft['flag'] = true;
      });
      return newState;
    },
    [STOP]: (state) => {
      const newState = produce(state, (draft) => {
        draft['flag'] = false;
      });
      return newState;
    },
    [INIT]: (state) => {
      const newState = produce(state, (draft) => {
        draft['count'] = 0;
        draft['hour'] = 0;
        draft['minute'] = 0;
        draft['second'] = 0;
        draft['flag'] = false;
      });
      return newState;
    },
  },
  initialState,
);

export default timer;
