import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';
import { takeLatest } from 'redux-saga/effects';
import createRequestSaga, {
  createRequestActionTypes,
} from '../lib/createRequestSaga';
import * as mainAPI from '../lib/api/main';

const [
  GET_MAIN_DATA,
  GET_MAIN_DATA_SUCCESS,
  GET_MAIN_DATA_FAILURE,
] = createRequestActionTypes('main/GET_MAIN_DATA');

export const getMainData = createAction(GET_MAIN_DATA);

const getMainDataSaga = createRequestSaga(
  GET_MAIN_DATA,
  mainAPI.getMainData,
);

export function* mainSaga() {
  yield takeLatest(GET_MAIN_DATA, getMainDataSaga);
}

const initialState = {
  mainData: null,
  myVocabDataList:null,
  othersGroupList:[],
};

const main = handleActions(
  {
    [GET_MAIN_DATA_SUCCESS]: (
      state,
      { payload: data },
    ) => {
      const newState = produce(state, (draft) => {
        draft['othersGroupList'] = data['othersGroupList'];
      });
      return newState;
    },
    [GET_MAIN_DATA_FAILURE]: (state, { payload: error }) => {
      console.log(error);
      return state;
    },
  },
  initialState,
);

export default main;
