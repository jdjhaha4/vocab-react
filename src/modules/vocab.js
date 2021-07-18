import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';
import { takeLatest } from 'redux-saga/effects';
import createRequestSaga, {
  createRequestActionTypes,
} from '../lib/createRequestSaga';
import * as vocabAPI from '../lib/api/vocab';

const CHANGE_FIELD = 'vocab/CHANGE_FIELD';
const [GET_VOCAB_LIST, GET_VOCAB_LIST_SUCCESS, GET_VOCAB_LIST_FAILURE] =
  createRequestActionTypes('vocab/GET_VOCAB_LIST');
const [ADD_VOCAB, ADD_VOCAB_SUCCESS, ADD_VOCAB_FAILURE] =
  createRequestActionTypes('vocab/ADD_VOCAB');

export const changeField = createAction(CHANGE_FIELD, ({ key, value }) => ({
  key, // vocab, mean
  value, // 실제 바꾸려는 값
}));
export const getVocabList = createAction(GET_VOCAB_LIST, ({ groupCode }) => ({
  groupCode,
}));

export const addVocab = createAction(ADD_VOCAB, ({ vocab, mean }) => ({
  vocab,
  mean,
}));

const vocabAddSaga = createRequestSaga(ADD_VOCAB, vocabAPI.addVocab);

export function* vocabSaga() {
  yield takeLatest(ADD_VOCAB, vocabAddSaga);
}

const initialState = {
  form: {
    vocab: '',
    mean: '',
  },
  vocabList: [],
  vocabError: null,
};

const vocab = handleActions(
  {
    [CHANGE_FIELD]: (state, { payload: {  key, value } }) =>
      produce(state, (draft) => {
        draft["form"][key] = value; //예: state.register.username 을 바꾼다
      }),
    [ADD_VOCAB_SUCCESS]: (state, { payload: { vocabItem } }) =>
      produce(state, (draft) => {
        draft['vocabList'].push(vocabItem);
      }),
    [ADD_VOCAB_FAILURE]: (state, { payload: { vocabError } }) =>
      produce(state, (draft) => {
        draft['vocabError'] = vocabError;
      }),
  },
  initialState,
);

export default vocab;
