import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';
import { takeLatest } from 'redux-saga/effects';
import createRequestSaga, {
  createRequestActionTypes,
} from '../lib/createRequestSaga';
import * as vocabQuestionResultAPI from '../lib/api/vocab_question_result';

const [
  GET_VOCAB_QUESTION_RESULT_LIST,
  GET_VOCAB_QUESTION_RESULT_LIST_SUCCESS,
  GET_VOCAB_QUESTION_RESULT_LIST_FAILURE,
] = createRequestActionTypes(
  'vocab_question_result/GET_VOCAB_QUESTION_RESULT_LIST',
);

const [
  GET_VOCAB_QUESTION_RESULT_GROUP_LIST,
  GET_VOCAB_QUESTION_RESULT_GROUP_LIST_SUCCESS,
  GET_VOCAB_QUESTION_RESULT_GROUP_LIST_FAILURE,
] = createRequestActionTypes(
  'vocab_question_result/GET_VOCAB_QUESTION_RESULT_GROUP_LIST',
);

export const getVocabQuestionResultList = createAction(
  GET_VOCAB_QUESTION_RESULT_LIST,
);
export const getVocabQuestionResultGroupList = createAction(
    GET_VOCAB_QUESTION_RESULT_GROUP_LIST,
    ({ group_code }) => ({
      group_code,
    }),
);

const getVocabQuestionResultListSaga = createRequestSaga(
  GET_VOCAB_QUESTION_RESULT_LIST,
  vocabQuestionResultAPI.getVocabQuestionResultList,
);
const getVocabQuestionResultGroupListSaga = createRequestSaga(
    GET_VOCAB_QUESTION_RESULT_GROUP_LIST,
  vocabQuestionResultAPI.getVocabQuestionResultGroupList,
);

export function* vocabQuestionResultSaga(){
    yield takeLatest(GET_VOCAB_QUESTION_RESULT_LIST, getVocabQuestionResultListSaga);
    yield takeLatest(GET_VOCAB_QUESTION_RESULT_GROUP_LIST, getVocabQuestionResultGroupListSaga);
}

const initialState = {
    list:[],
    groupList:[],
}

const vocab_question_result = handleActions(
    {
        [GET_VOCAB_QUESTION_RESULT_LIST_SUCCESS]: (state, { payload: resultVocabQuestionResultList }) => {
            const newState = produce(state, (draft) => {
              draft['list'] = [];
              resultVocabQuestionResultList.map((vocabQuestionResultItem) => {
                draft['list'].push(vocabQuestionResultItem);
              });
            });
            return newState;
          },
          [GET_VOCAB_QUESTION_RESULT_LIST_FAILURE]: (state, { payload: error }) => {
            console.log(error);
            return state;
          },
        [GET_VOCAB_QUESTION_RESULT_GROUP_LIST_SUCCESS]: (state, { payload: resultVocabQuestionResultGroupList }) => {
            const newState = produce(state, (draft) => {
              draft['groupList'] = [];
              resultVocabQuestionResultGroupList.map((vocabQuestionResultGroupItem) => {
                draft['groupList'].push(vocabQuestionResultGroupItem);
              });
            });
            return newState;
          },
          [GET_VOCAB_QUESTION_RESULT_GROUP_LIST_FAILURE]: (state, { payload: error }) => {
            console.log(error);
            return state;
          },
    },
    initialState
);

export default vocab_question_result;