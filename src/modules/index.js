import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';
import auth, { authSaga } from './auth';
import user, { userSaga } from './user';
import loading from './loading';
import navigation from './navigation';
import vocab, { vocabSaga } from './vocab';
import vocab_group, { vocabGroupSaga } from './vocab_group';
import vocab_group_mapping, { vocabGroupMappingSaga } from './vocab_mapping';
import vocab_study_multiple, {
  vocabStudyMultipleSaga,
} from './vocab_study_multiple';
import timer,{timerSaga} from './timer';
import vocab_question_result,{vocabQuestionResultSaga} from './vocab_question_result';
import vocab_question_result_history,{vocabQuestionResultHistorySaga} from './vocab_question_result_history';
import app_background from './app_background';


const rootReducer = combineReducers({
  auth,
  loading,
  user,
  navigation,
  vocab,
  vocab_group,
  vocab_group_mapping,
  vocab_study_multiple,
  timer,
  vocab_question_result,
  vocab_question_result_history,
  app_background,
});

export function* rootSaga() {
  yield all([
    authSaga(),
    userSaga(),
    vocabSaga(),
    vocabGroupSaga(),
    vocabGroupMappingSaga(),
    vocabStudyMultipleSaga(),
    timerSaga(),
    vocabQuestionResultSaga(),
    vocabQuestionResultHistorySaga(),
  ]);
}

export default rootReducer;
