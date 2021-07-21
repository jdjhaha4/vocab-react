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
const [REMOVE_VOCAB, REMOVE_VOCAB_SUCCESS, REMOVE_VOCAB_FAILURE] =
  createRequestActionTypes('vocab/REMOVE_VOCAB');

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

export const removeVocab = createAction(REMOVE_VOCAB, ({ id }) => ({
  id,
}));

const vocabGetListSaga = createRequestSaga(
  GET_VOCAB_LIST,
  vocabAPI.getVocabList,
);
const vocabAddSaga = createRequestSaga(ADD_VOCAB, vocabAPI.addVocab);
const vocabRemoveSaga = createRequestSaga(REMOVE_VOCAB, vocabAPI.removeVocab);

export function* vocabSaga() {
  yield takeLatest(ADD_VOCAB, vocabAddSaga);
  yield takeLatest(GET_VOCAB_LIST, vocabGetListSaga);
  yield takeLatest(REMOVE_VOCAB, vocabRemoveSaga);
}

const initialState = {
  form: {
    id: 0,
    vocab: '',
    mean: '',
    vocabFocus: false,
  },
  vocabList: [],
  vocabError: null,
  vocabListReload: false,
};

const vocab = handleActions(
  {
    [CHANGE_FIELD]: (state, { payload: { key, value } }) =>
      produce(state, (draft) => {
        draft['form'][key] = value; //예: state.register.username 을 바꾼다
      }),
    [ADD_VOCAB_SUCCESS]: (state, { payload: resultCnt }) => {
      console.log(resultCnt);
      const newState = produce(state, (draft) => {
        draft['form']['vocab'] = '';
        draft['form']['mean'] = '';
        draft['form']['vocabFocus'] = true;
        draft['vocabListReload'] = true;
      });
      return newState;
    },
    [ADD_VOCAB_FAILURE]: (state, { payload: error }) => {
      console.log(error);
      return state;
    },
    [GET_VOCAB_LIST_SUCCESS]: (state, { payload: resultVocabList }) => {
      const newState = produce(state, (draft) => {
        draft['vocabList'] = [];
        draft['vocabListReload'] = false;
        resultVocabList.map((vocabItem) => {
          const vocaJsonObj = JSON.parse(vocabItem['voca_json']);
          vocaJsonObj['id'] = vocabItem['id'];
          draft['vocabList'].push(vocaJsonObj);
        });
      });
      return newState;
    },
    [GET_VOCAB_LIST_FAILURE]: (state, { payload: error }) => {
      console.log(error);
      return state;
    },
    [REMOVE_VOCAB_SUCCESS]: (state, { payload: removedId }) => {
      console.log(removedId);
      const newState = produce(state, (draft) => {
        const removedIdIndex = draft['vocabList'].findIndex(
          (vocabItem) => vocabItem.id === removedId,
        );
        draft['vocabList'].splice(removedIdIndex, 1);
      });
      return newState;
    },
    [REMOVE_VOCAB_FAILURE]: (state, { payload: error }) => {
      console.log(error);
      return state;
    },
  },
  initialState,
);

export default vocab;
