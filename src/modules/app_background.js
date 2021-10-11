import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';
import { takeLatest } from 'redux-saga/effects';

const TOKEN_EXPIRED = 'app_background/TOKEN_EXPIRED';
const TOKEN_EXPIRED_ERROR = 'app_background/TOKEN_EXPIRED_ERROR';

export const tokenExpired = createAction(TOKEN_EXPIRED, ({ expired }) => ({
  expired,
}));

const initialState = {
  expired: false,
};

const app_background = handleActions(
  {
    [TOKEN_EXPIRED]: (state, { payload: { expired } }) => {
      const newState = produce(state, (draft) => {
        draft['expired'] = expired;
      });
      return newState;
    },
    [TOKEN_EXPIRED_ERROR]: (state, { payload }) => {
      const newState = produce(state, (draft) => {
        if (payload['response']['status']) {
          draft['expired'] = true;
        }
      });
      return newState;
    },
  },
  initialState,
);

export default app_background;
