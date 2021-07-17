import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';
import { takeLatest } from 'redux-saga/effects';
import createRequestSaga, {
  createRequestActionTypes,
} from '../lib/createRequestSaga';

const [GET_VOCAB_LIST, GET_VOCAB_LIST_SUCCESS, GET_VOCAB_LIST_FAILURE] =
  createRequestActionTypes('vocab/GET_VOCAB_LIST');

export const getVocabList = createAction(GET_VOCAB_LIST, ({ groupCode }) => ({
  groupCode,
}));

