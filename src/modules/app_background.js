import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';
import { takeLatest } from 'redux-saga/effects';

const TOKEN_EXPIRED = 'app_background/TOKEN_EXPIRED';
const TOKEN_EXPIRED_ERROR = 'app_background/TOKEN_EXPIRED_ERROR';
const CHANGE_FIELD = 'app_background/CHANGE_FIELD';

export const tokenExpired = createAction(TOKEN_EXPIRED, ({ expired }) => ({
  expired,
}));

export const changeField = createAction(CHANGE_FIELD, ({ key, value }) => ({
  key,
  value,
}));

const initialState = {
  expired: false,
  error: false,
  errorCode:-1,
};

const app_background = handleActions(
  {
    [TOKEN_EXPIRED]: (state, { payload: { expired } }) => {
      const newState = produce(state, (draft) => {
        draft['expired'] = expired;
      });
      return newState;
    },
    [CHANGE_FIELD]: (state, { payload: { key, value } }) => {
      const newState = produce(state, (draft) => {
        draft[key] = value;
      });
      return newState;
    },
    [TOKEN_EXPIRED_ERROR]: (state, { payload }) => {
      const newState = produce(state, (draft) => {
        if(payload['request_type'] != 'auth/LOGIN'){
          if (payload['response']['status']==401) {
            draft['expired'] = true;
          }else {
            draft['error'] = true;
            draft['errorCode'] = payload['response']['status'];
          }
        }
      });
      return newState;
    },
  },
  initialState,
);

export default app_background;
