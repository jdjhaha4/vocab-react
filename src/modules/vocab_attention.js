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

export const getVocabAttentionList = createAction(GET_VOCAB_ATTENTION_LIST);

const getVocabAttentionListSaga = createRequestSaga(
  GET_VOCAB_ATTENTION_LIST,
  vocabAttentionAPI.getVocabAttentionList,
);

export function* vocabAttentionSaga() {
  yield takeLatest(GET_VOCAB_ATTENTION_LIST, getVocabAttentionListSaga);
}

const initialState = {
  vocabAttentionList: [],
  vocabError: null,
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
  },
  initialState,
);

export default vocab_attention;
