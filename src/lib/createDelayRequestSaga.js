import {call, put, delay} from 'redux-saga/effects';
import { startLoading, finishLoading } from '../modules/loading';

export default function createDelayRequestSaga(type, request, delayMillis) {
    const SUCCESS = `${type}_SUCCESS`;
    const FAILURE = `${type}_FAILURE`;

    return function*(action){
        yield put(startLoading(type)); //로딩 시작
        try{
            yield delay(delayMillis);
            const response = yield call(request, action.payload);
            yield put({
                type: SUCCESS,
                payload: response.data,
            });
        }catch(e) {
            yield put({
                type: FAILURE,
                payload: e,
                error: true,
            });
            yield put({
                type: 'app_background/TOKEN_EXPIRED_ERROR',
                payload: e,
                error: true,
            })
        }
        yield put(finishLoading(type)); //로딩 끝
    };
}