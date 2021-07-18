import {combineReducers} from 'redux';
import {all} from 'redux-saga/effects';
import auth,{authSaga} from './auth';
import user,{userSaga} from './user';
import loading from './loading';
import navigation from './navigation';
import vocab,{vocabSaga} from './vocab';

const rootReducer = combineReducers({
    auth,
    loading,
    user,
    navigation,
    vocab,
});

export function* rootSaga(){
    yield all([authSaga(), userSaga(), vocabSaga()]);
}

export default rootReducer;