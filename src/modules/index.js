import {combineReducers} from 'redux';
import {all} from 'redux-saga/effects';
import auth,{authSaga} from './auth';
import user,{userSaga} from './user';
import loading from './loading';
import navigation from './navigation';
import vocab,{vocabSaga} from './vocab';
import vocab_group,{vocabGroupSaga} from './vocab_group';

const rootReducer = combineReducers({
    auth,
    loading,
    user,
    navigation,
    vocab,
    vocab_group,
});

export function* rootSaga(){
    yield all([authSaga(), userSaga(), vocabSaga(), vocabGroupSaga()]);
}

export default rootReducer;