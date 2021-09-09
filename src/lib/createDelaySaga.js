import {call, put, delay} from 'redux-saga/effects';
import { startLoading, finishLoading } from '../modules/loading';

export default function createDelaySaga(type, delayMillis) {
    const SUCCESS = `${type}_SUCCESS`;
    const FAILURE = `${type}_FAILURE`;

    return function*(action){
        yield put(startLoading(type)); //로딩 시작
        try{
            yield delay(delayMillis);
            yield put({
                type: SUCCESS,
            });
        }catch(e) {
            yield put({
                type: FAILURE,
                payload: e,
                error: true,
            });
        }
        yield put(finishLoading(type)); //로딩 끝
    };
}