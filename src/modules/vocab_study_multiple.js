import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';
import { takeLatest } from 'redux-saga/effects';
import createRequestSaga, {
  createRequestActionTypes,
} from '../lib/createRequestSaga';
import createDelayRequestSaga from '../lib/createDelayRequestSaga';
import createDelaySaga from '../lib/createDelaySaga';
import * as vocabStudyMultipleAPI from '../lib/api/vocab_study_multiple';
import { cloneObject, shuffle, getRandom } from '../util/arrayUtil';

const CHANGE_FIELD = 'vocab_study_multiple/CHANGE_FIELD';
const INIT_QUESTION_LIST = 'vocab_study_multiple/INIT_QUESTION_LIST';
const UPDATE_FLAG = 'vocab_study_multiple/UPDATE_FLAG';
const UNMOUNT_FLAG = 'vocab_study_multiple/UNMOUNT_FLAG';

const [
  GO_TO_THE_NEXT_QUESTION,
  GO_TO_THE_NEXT_QUESTION_SUCCESS,
  GO_TO_THE_NEXT_QUESTION_FAILURE,
] = createRequestActionTypes('vocab_study_multiple/GO_TO_THE_NEXT_QUESTION');

const [
  INSERT_QUESTION_RESULT,
  INSERT_QUESTION_RESULT_SUCCESS,
  INSERT_QUESTION_RESULT_FAILURE,
] = createRequestActionTypes('vocab_study_multiple/INSERT_QUESTION_RESULT');

const [
  UPDATE_QUESTION_RESULT,
  UPDATE_QUESTION_RESULT_SUCCESS,
  UPDATE_QUESTION_RESULT_FAILURE,
] = createRequestActionTypes('vocab_study_multiple/UPDATE_QUESTION_RESULT');

const [
  UPDATE_QUESTION_RESULT2,
  UPDATE_QUESTION_RESULT2_SUCCESS,
  UPDATE_QUESTION_RESULT2_FAILURE,
] = createRequestActionTypes('vocab_study_multiple/UPDATE_QUESTION_RESULT2');

const [
  POST_QUESTION_RESULT,
  POST_QUESTION_RESULT_SUCCESS,
  POST_QUESTION_RESULT_FAILURE,
] = createRequestActionTypes('vocab_study_multiple/POST_QUESTION_RESULT');

export const changeField = createAction(
  CHANGE_FIELD,
  ({ resultFlag, answerVocabId, wrongAnswerVocabId }) => ({
    resultFlag,
    answerVocabId,
    wrongAnswerVocabId,
  }),
);

export const setUpdateFlag = createAction(
  UPDATE_FLAG,
  ({
    unmountFlag,
    flag,
    vocabQuestionResultId,
    answerCount,
    wrongAnswerCount,
    complete_flag,
    study_time_seconds,
  }) => ({
    unmountFlag,
    flag,
    vocabQuestionResultId,
    answerCount,
    wrongAnswerCount,
    complete_flag,
    study_time_seconds,
  }),
);

export const initQuestionList = createAction(
  INIT_QUESTION_LIST,
  ({ vocabList }) => ({
    vocabList,
  }),
);

export const goToTheNextQuestion = createAction(
  GO_TO_THE_NEXT_QUESTION,
  ({ delayMillis }) => ({ delayMillis }),
);

export const insertQuestionResult = createAction(
  INSERT_QUESTION_RESULT,
  ({
    group_code,
    group_name,
    vocab_count,
    answer_count,
    wrong_answer_count,
    complete_flag,
    study_time_seconds,
  }) => ({
    group_code,
    group_name,
    vocab_count,
    answer_count,
    wrong_answer_count,
    complete_flag,
    study_time_seconds,
  }),
);

export const updateQuestionResult = createAction(
  UPDATE_QUESTION_RESULT,
  ({
    id,
    answer_count,
    wrong_answer_count,
    complete_flag,
    study_time_seconds,
  }) => ({
    id,
    answer_count,
    wrong_answer_count,
    complete_flag,
    study_time_seconds,
  }),
);
export const updateQuestionResult2 = createAction(
  UPDATE_QUESTION_RESULT2,
  ({ complete_flag }) => ({
    complete_flag,
  }),
);

export const unmountAction = createAction(UNMOUNT_FLAG, () => ({}));

export const postQuestionResult = createAction(
  POST_QUESTION_RESULT,
  ({
    vocab_question_result_id,
    group_code,
    question_type,
    question_value,
    vocab_id,
    vocab,
    mean,
    answer_vocab_id,
    answer_vocab,
    answer_mean,
    result_flag,
  }) => ({
    vocab_question_result_id,
    group_code,
    question_type,
    question_value,
    vocab_id,
    vocab,
    mean,
    answer_vocab_id,
    answer_vocab,
    answer_mean,
    result_flag,
  }),
);

const insertQuestionResultSaga = createRequestSaga(
  INSERT_QUESTION_RESULT,
  vocabStudyMultipleAPI.insertQuestionResult,
);

const updateQuestionResultSaga = createRequestSaga(
  UPDATE_QUESTION_RESULT,
  vocabStudyMultipleAPI.updateQuestionResult,
);

const postQuestionResultSaga = createDelayRequestSaga(
  POST_QUESTION_RESULT,
  vocabStudyMultipleAPI.postQuestionResult,
  300,
);
const goToTheNextQuestionSaga = createDelaySaga(GO_TO_THE_NEXT_QUESTION);

export function* vocabStudyMultipleSaga() {
  yield takeLatest(POST_QUESTION_RESULT, postQuestionResultSaga);
  yield takeLatest(GO_TO_THE_NEXT_QUESTION, goToTheNextQuestionSaga);
  yield takeLatest(INSERT_QUESTION_RESULT, insertQuestionResultSaga);
  yield takeLatest(UPDATE_QUESTION_RESULT, updateQuestionResultSaga);
}

const initialState = {
  list: [],
  vocab: {},
  meanMultipleChoices: [],
  index: 0,
  resultFlag: '',
  answerVocabId: -1,
  wrongAnswerVocabId: -1,
  complete: false,
  vocabQuestionResultId: -1,
  answerCount: 0,
  wrongAnswerCount: 0,
  updateData: {
    unmountFlag: false,
    flag: false,
    vocabQuestionResultId: -1,
    answerCount: 0,
    wrongAnswerCount: 0,
    complete_flag: 'N',
    study_time_seconds: 0,
  },
};

const vocab_study_multiple = handleActions(
  {
    [CHANGE_FIELD]: (
      state,
      { payload: { resultFlag, answerVocabId, wrongAnswerVocabId } },
    ) => {
      const newState = produce(state, (draft) => {
        draft['resultFlag'] = resultFlag;
        draft['answerVocabId'] = answerVocabId;
        draft['wrongAnswerVocabId'] = wrongAnswerVocabId;
        if (resultFlag == 'T') {
          draft['answerCount'] += 1;
        } else {
          draft['wrongAnswerCount'] += 1;
        }
      });

      return newState;
    },
    [UPDATE_FLAG]: (
      state,
      {
        payload: {
          unmountFlag,
          flag,
          vocabQuestionResultId,
          answerCount,
          wrongAnswerCount,
          complete_flag,
          study_time_seconds,
        },
      },
    ) => {
      const newState = produce(state, (draft) => {
        draft['updateData']['unmountFlag'] = unmountFlag;
        draft['updateData']['flag'] = flag;
        draft['updateData']['vocabQuestionResultId'] = vocabQuestionResultId;
        draft['updateData']['answerCount'] = answerCount;
        draft['updateData']['wrongAnswerCount'] = wrongAnswerCount;
        draft['updateData']['complete_flag'] = complete_flag;
        draft['updateData']['study_time_seconds'] = study_time_seconds;
      });
      return newState;
    },
    [INIT_QUESTION_LIST]: (state, { payload: { vocabList } }) =>
      produce(state, (draft) => {
        draft['index'] = 0;
        draft['complete'] = false;
        draft['answerCount'] = 0;
        draft['wrongAnswerCount'] = 0;
        draft['updateData']['unmountFlag'] = false;
        if (vocabList != null && vocabList.length > 0) {
          let questionList = [];
          questionList = cloneObject(vocabList);
          questionList = shuffle(questionList);
          draft['list'] = questionList;
          if (draft['list'].length > 0) {
            draft['vocab'] = draft['list'][draft['index']];
            let multipleVocab = [];
            multipleVocab = getRandom(
              cloneObject(draft['list']),
              5,
              draft['index'],
            );
            multipleVocab = shuffle(multipleVocab);
            draft['meanMultipleChoices'] = multipleVocab;
          }
        }
      }),
    [GO_TO_THE_NEXT_QUESTION_SUCCESS]: (state) =>
      produce(state, (draft) => {
        if (draft['list'].length > draft['index'] + 1) {
          draft['index'] += 1;
          draft['resultFlag'] = '';
          draft['answerVocabId'] = -1;
          draft['wrongAnswerVocabId'] = -1;
          draft['vocab'] = draft['list'][draft['index']];
          let multipleVocab = [];
          multipleVocab = getRandom(
            cloneObject(draft['list']),
            5,
            draft['index'],
          );
          multipleVocab = shuffle(multipleVocab);
          draft['meanMultipleChoices'] = multipleVocab;
        } else {
          draft['complete'] = true;
          draft['resultFlag'] = '';
          draft['answerVocabId'] = -1;
          draft['wrongAnswerVocabId'] = -1;
        }
      }),
    [POST_QUESTION_RESULT_SUCCESS]: (state, { payload: result }) => {
      const newState = produce(state, (draft) => {});
      return newState;
    },
    [POST_QUESTION_RESULT_FAILURE]: (state, { payload: error }) => {
      console.log(error);
      return state;
    },
    [INSERT_QUESTION_RESULT_SUCCESS]: (state, { payload: vqrVO }) => {
      const newState = produce(state, (draft) => {
        draft['vocabQuestionResultId'] = vqrVO['vocab_question_result_id'];
        draft['updateData']['unmountFlag'] = false;
      });
      return newState;
    },
    [INSERT_QUESTION_RESULT_FAILURE]: (state, { payload: error }) => {
      console.log(error);
      return state;
    },
    [UPDATE_QUESTION_RESULT_SUCCESS]: (state, { payload: resultMap }) => {
      const newState = produce(state, (draft) => {});
      return newState;
    },
    [UPDATE_QUESTION_RESULT_FAILURE]: (state, { payload: error }) => {
      console.log(error);
      return state;
    },
    [UPDATE_QUESTION_RESULT2]: (state, { payload: { complete_flag } }) => {
      const newState = produce(state, (draft) => {
        draft['updateData']['unmountFlag'] = true;
        draft['updateData']['complete_flag'] = complete_flag;
      });
      return newState;
    },
    [UNMOUNT_FLAG]: (state, { payload: {} }) => {
      const newState = produce(state, (draft) => {
        draft['complete'] = false;
        draft['vocabQuestionResultId'] = -1;
        draft['answerCount'] = 0;
        draft['wrongAnswerCount'] = 0;
      });
      return newState;
    },
  },
  initialState,
);

export default vocab_study_multiple;
