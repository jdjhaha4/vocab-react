import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';
import { takeLatest } from 'redux-saga/effects';
import createRequestSaga, {
  createRequestActionTypes,
} from '../lib/createRequestSaga';
import * as vocabQuestionResultHistoryAPI from '../lib/api/vocab_question_result_history';

const [
  GET_VOCAB_QUESTION_RESULT_HISTORY_LIST,
  GET_VOCAB_QUESTION_RESULT_HISTORY_LIST_SUCCESS,
  GET_VOCAB_QUESTION_RESULT_HISTORY_LIST_FAILURE,
] = createRequestActionTypes(
  'vocab_question_result_history/GET_VOCAB_QUESTION_RESULT_HISTORY_LIST',
);

export const getVocabQuestionResultHistoryList = createAction(
  GET_VOCAB_QUESTION_RESULT_HISTORY_LIST,
);

const getVocabQuestionResultHistoryListSaga = createRequestSaga(
  GET_VOCAB_QUESTION_RESULT_HISTORY_LIST,
  vocabQuestionResultHistoryAPI.getVocabQuestionResultHistoryList,
);

export function* vocabQuestionResultHistorySaga(){
    yield takeLatest(GET_VOCAB_QUESTION_RESULT_HISTORY_LIST, getVocabQuestionResultHistoryListSaga);
}

const initialState = {
    list:[],
}

const vocab_question_result_history = handleActions(
    {
        [GET_VOCAB_QUESTION_RESULT_HISTORY_LIST_SUCCESS]: (state, { payload: resultVocabQuestionResultHistoryList }) => {
            const newState = produce(state, (draft) => {
              draft['list'] = [];
              resultVocabQuestionResultHistoryList.map((vocabQuestionResultHistoryItem) => {
                draft['list'].push(vocabQuestionResultHistoryItem);
              });
            });
            return newState;
          },
          [GET_VOCAB_QUESTION_RESULT_HISTORY_LIST_FAILURE]: (state, { payload: error }) => {
            console.log(error);
            return state;
          },
    },
    initialState
);

export default vocab_question_result_history;