import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';
import { takeLatest } from 'redux-saga/effects';
import createRequestSaga, {
  createRequestActionTypes,
} from '../lib/createRequestSaga';
import createDelayRequestSaga from '../lib/createDelayRequestSaga';
import * as authAPI from '../lib/api/auth';

const CHANGE_FIELD = 'auth/CHANGE_FIELD';
const INITIALIZE_FORM = 'auth/INITIALIZE_FORM';
const LOGOUT = 'auth/LOGOUT';

const [REGISTER, REGISTER_SUCCESS, REGISTER_FAILURE] =
  createRequestActionTypes('auth/REGISTER');

const [LOGIN, LOGIN_SUCCESS, LOGIN_FAILURE] =
  createRequestActionTypes('auth/LOGIN');

const [ID_DUPL_CHECK, ID_DUPL_CHECK_SUCCESS, ID_DUPL_CHECK_FAILURE] =
  createRequestActionTypes('auth/ID_DUPL_CHECK');
const [NICKNAME_DUPL_CHECK, NICKNAME_DUPL_CHECK_SUCCESS, NICKNAME_DUPL_CHECK_FAILURE] =
  createRequestActionTypes('auth/NICKNAME_DUPL_CHECK');

const ID_DUPL_INIT = 'auth/ID_DUPL_INIT';
const NICKNAME_DUPL_INIT = 'auth/NICKNAME_DUPL_INIT';

export const changeField = createAction(
  CHANGE_FIELD,
  ({ form, key, value }) => ({
    form, // register, login
    key, // username, password, passwordConfirm
    value, // 실제 바꾸려는 값
  }),
);
export const initializeForm = createAction(INITIALIZE_FORM, (form) => form); // register, login
export const authLogout = createAction(LOGOUT);

export const register = createAction(
  REGISTER,
  ({ id, nickname, password }) => ({
    id,
    nickname,
    password,
  }),
);

export const login = createAction(LOGIN, ({ id, password }) => ({
  id,
  password,
}));

export const idDuplCheck = createAction(ID_DUPL_CHECK, ({id})=>({id,}));
export const nicknameDuplCheck = createAction(NICKNAME_DUPL_CHECK, ({nickname})=>({nickname,}));
export const idDuplInit = createAction(ID_DUPL_INIT);
export const nicknameDuplInit = createAction(NICKNAME_DUPL_INIT);

//사가 생성
const registerSaga = createRequestSaga(REGISTER, authAPI.register);
const loginSaga = createRequestSaga(LOGIN, authAPI.login);
const idDuplCheckSaga = createDelayRequestSaga(ID_DUPL_CHECK, authAPI.idDuplCheck, 500);
const nicknameDuplCheckSaga = createDelayRequestSaga(NICKNAME_DUPL_CHECK, authAPI.nicknameDuplCheck, 500);

export function* authSaga() {
  yield takeLatest(REGISTER, registerSaga);
  yield takeLatest(LOGIN, loginSaga);
  yield takeLatest(ID_DUPL_CHECK, idDuplCheckSaga);
  yield takeLatest(NICKNAME_DUPL_CHECK, nicknameDuplCheckSaga);
}

const initialState = {
  register: {
    id: '',
    idDuplCheck: null,
    idDuplCheckError: null,
    nicknameDuplCheck: null,
    nicknameDuplCheckError: null,
    nickname: '',
    password: '',
    passwordConfirm: '',
  },
  login: {
    id: '',
    password: '',
  },
  auth: null,
  authError: null,
};

const auth = handleActions(
  {
    [CHANGE_FIELD]: (state, { payload: { form, key, value } }) =>
      produce(state, (draft) => {
        draft[form][key] = value; //예: state.register.username 을 바꾼다
      }),
    [INITIALIZE_FORM]: (state, { payload: form }) => ({
      ...state,
      [form]: initialState[form],
      authError: null, //폼 전환 시 회원 인증 에러 초기화
    }),
    [LOGOUT]: (state, action) => ({
      ...state,
      auth: null, //jwt 제거
      authError: null,
    }),
    //회원가입 성공
    [REGISTER_SUCCESS]: (state, { payload: auth }) => ({
      ...state,
      authError: null,
      auth,
    }),
    //회원가입 실패
    [REGISTER_FAILURE]: (state, { payload: error }) => ({
      ...state,
      authError: error,
    }),
    //로그인 성공
    [LOGIN_SUCCESS]: (state, { payload: auth }) => ({
      ...state,
      authError: null,
      auth,
    }),
    //로그인 실패
    [LOGIN_FAILURE]: (state, { payload: error }) => ({
      ...state,
      authError: error,
    }),
    //아이디 중복체크 성공
    [ID_DUPL_CHECK_SUCCESS]: (state, { payload: idDuplCheck }) => produce(state, (draft) => {
      draft["register"]["idDuplCheck"] = idDuplCheck;
      draft["register"]["idDuplCheckError"] = null;
    }),
    //아이디 중복체크 실패
    [ID_DUPL_CHECK_FAILURE]: (state, { payload: error }) => produce(state, (draft) => {
      draft["register"]["idDuplCheckError"] = error;
    }),
    //아이디 중복체크 초기화
    [ID_DUPL_INIT]: (state, { payload: init }) => produce(state, (draft) => {
      draft["register"]["idDuplCheck"] = null;
    }),
    //닉네임 중복체크 성공
    [NICKNAME_DUPL_CHECK_SUCCESS]: (state, { payload: idDuplCheck }) => produce(state, (draft) => {
      draft["register"]["nicknameDuplCheck"] = idDuplCheck;
      draft["register"]["nicknameDuplCheckError"] = null;
    }),
    //닉네임 중복체크 실패
    [NICKNAME_DUPL_CHECK_FAILURE]: (state, { payload: error }) => produce(state, (draft) => {
      draft["register"]["nicknameDuplCheckError"] = error;
    }),
    //닉네임 중복체크 초기화
    [NICKNAME_DUPL_INIT]: (state, { payload: init }) => produce(state, (draft) => {
      draft["register"]["nicknameDuplCheck"] = null;
    }),
  },
  initialState,
);

export default auth;
