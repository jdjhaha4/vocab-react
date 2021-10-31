import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';
import { takeLatest } from 'redux-saga/effects';
import createRequestSaga, {
  createRequestActionTypes,
} from '../lib/createRequestSaga';
import * as vocabAttentionAPI from '../lib/api/vocab_attention';

const [
  GET_VOCAB_ATTENTION_LIST,
  GET_VOCAB_ATTENTION_LIST_SUCCESS,
  GET_VOCAB_ATTENTION_LIST_FAILURE,
] = createRequestActionTypes('vocab_attention/GET_VOCAB_ATTENTION_LIST');

const [
  GET_VOCAB_ATTENTION_DETAIL_LIST,
  GET_VOCAB_ATTENTION_DETAIL_LIST_SUCCESS,
  GET_VOCAB_ATTENTION_DETAIL_LIST_FAILURE,
] = createRequestActionTypes('vocab_attention/GET_VOCAB_ATTENTION_DETAIL_LIST');

export const getVocabAttentionList = createAction(GET_VOCAB_ATTENTION_LIST);
export const getVocabAttentionDetailList = createAction(GET_VOCAB_ATTENTION_DETAIL_LIST);

const getVocabAttentionListSaga = createRequestSaga(
  GET_VOCAB_ATTENTION_LIST,
  vocabAttentionAPI.getVocabAttentionList,
);

const getVocabAttentionDetailListSaga = createRequestSaga(
  GET_VOCAB_ATTENTION_DETAIL_LIST,
  vocabAttentionAPI.getVocabAttentionDetail,
);

export function* vocabAttentionSaga() {
  yield takeLatest(GET_VOCAB_ATTENTION_LIST, getVocabAttentionListSaga);
  yield takeLatest(GET_VOCAB_ATTENTION_DETAIL_LIST, getVocabAttentionDetailListSaga);
}

const initialState = {
  vocabAttentionList: [],
  vocabAttentionError: null,
  vocabAttention: {},
  vocabAttentionDetailList: [],
  vocabAttentionDetailError: null,
};

const vocab_attention = handleActions(
  {
    [GET_VOCAB_ATTENTION_LIST_SUCCESS]: (
      state,
      { payload: resultVocabAttentionList },
    ) => {
      const newState = produce(state, (draft) => {
        draft['vocabAttentionList'] = [];
        resultVocabAttentionList.map((vocabAttentionItem) => {
          draft['vocabAttentionList'].push(vocabAttentionItem);
        });
      });
      return newState;
    },
    [GET_VOCAB_ATTENTION_LIST_FAILURE]: (state, { payload: error }) => {
      console.log(error);
      return state;
    },
    [GET_VOCAB_ATTENTION_DETAIL_LIST_SUCCESS]: (
      state,
      { payload: {resultVocabAttention, resultVocabAttentionDetailList} },
    ) => {
      const newState = produce(state, (draft) => {
        draft['vocabAttention'] = resultVocabAttention;
        draft['vocabAttentionDetailList'] = [];
        resultVocabAttentionDetailList.map((vocabAttentionDetailItem) => {
          draft['vocabAttentionDetailList'].push(vocabAttentionDetailItem);
        });
      });
      return newState;
    },
    [GET_VOCAB_ATTENTION_DETAIL_LIST_FAILURE]: (state, { payload: error }) => {
      console.log(error);
      return state;
    },
  },
  initialState,
);

export default vocab_attention;
