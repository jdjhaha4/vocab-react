import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';
import { takeLatest } from 'redux-saga/effects';
import createRequestSaga, {
  createRequestActionTypes,
} from '../lib/createRequestSaga';
import * as vocabGroupAPI from '../lib/api/vocab_group';

const CHANGE_FIELD = 'vocab_group/CHANGE_FIELD';
const [
  GET_VOCAB_GROUP_LIST,
  GET_VOCAB_GROUP_LIST_SUCCESS,
  GET_VOCAB_GROUP_LIST_FAILURE,
] = createRequestActionTypes('vocab_group/GET_VOCAB_GROUP_LIST');
const [
  GET_VOCAB_GROUP_DATA,
  GET_VOCAB_GROUP_DATA_SUCCESS,
  GET_VOCAB_GROUP_DATA_FAILURE,
] = createRequestActionTypes('vocab_group/GET_VOCAB_GROUP_DATA');
const [ADD_VOCAB_GROUP, ADD_VOCAB_GROUP_SUCCESS, ADD_VOCAB_GROUP_FAILURE] =
  createRequestActionTypes('vocab_group/ADD_VOCAB_GROUP');
const [
  REMOVE_VOCAB_GROUP,
  REMOVE_VOCAB_GROUP_SUCCESS,
  REMOVE_VOCAB_GROUP_FAILURE,
] = createRequestActionTypes('vocab_group/REMOVE_VOCAB_GROUP');

export const changeField = createAction(CHANGE_FIELD, ({ key, value }) => ({
  key, // vocab, mean
  value, // 실제 바꾸려는 값
}));
export const getVocabGroupList = createAction(GET_VOCAB_GROUP_LIST);
export const getVocabGroupData = createAction(GET_VOCAB_GROUP_DATA);

export const addVocabGroup = createAction(
  ADD_VOCAB_GROUP,
  ({ group_name }) => ({
    group_name,
  }),
);

export const removeVocabGroup = createAction(
  REMOVE_VOCAB_GROUP,
  ({ group_code }) => ({
    group_code,
  }),
);

const vocabGroupGetListSaga = createRequestSaga(
  GET_VOCAB_GROUP_LIST,
  vocabGroupAPI.getVocabGroupList,
);
const vocabGroupGetDataSaga = createRequestSaga(
  GET_VOCAB_GROUP_DATA,
  vocabGroupAPI.getVocabGroupData,
);
const vocabGroupAddSaga = createRequestSaga(
  ADD_VOCAB_GROUP,
  vocabGroupAPI.addVocabGroup,
);
const vocabGroupRemoveSaga = createRequestSaga(
  REMOVE_VOCAB_GROUP,
  vocabGroupAPI.removeVocabGroup,
);

export function* vocabGroupSaga() {
  yield takeLatest(ADD_VOCAB_GROUP, vocabGroupAddSaga);
  yield takeLatest(GET_VOCAB_GROUP_LIST, vocabGroupGetListSaga);
  yield takeLatest(GET_VOCAB_GROUP_DATA, vocabGroupGetDataSaga);
  yield takeLatest(REMOVE_VOCAB_GROUP, vocabGroupRemoveSaga);
}

const initialState = {
  form: {
    group_name: '',
    groupNameFocus: false,
  },
  vocabGroupList: [],
  vocabGroupError: null,
  vocabGroupListReload: false,
  vocabGroupData: {},
};

const vocab_group = handleActions(
  {
    [CHANGE_FIELD]: (state, { payload: { key, value } }) =>
      produce(state, (draft) => {
        draft['form'][key] = value; 
      }),
    [ADD_VOCAB_GROUP_SUCCESS]: (state, { payload: resultCnt }) => {
      const newState = produce(state, (draft) => {
        draft['form']['group_name'] = '';
        draft['form']['groupNameFocus'] = true;
        draft['vocabGroupListReload'] = true;
      });
      return newState;
    },
    [ADD_VOCAB_GROUP_FAILURE]: (state, { payload: error }) => {
      console.log(error);
      return state;
    },
    [GET_VOCAB_GROUP_LIST_SUCCESS]: (state, { payload: resultVocabGroupList }) => {
      const newState = produce(state, (draft) => {
        draft['vocabGroupList'] = [];
        draft['vocabGroupListReload'] = false;
        resultVocabGroupList.map((vocabGroupItem) => {
          draft['vocabGroupList'].push(vocabGroupItem);
        });
      });
      return newState;
    },
    [GET_VOCAB_GROUP_LIST_FAILURE]: (state, { payload: error }) => {
      console.log(error);
      return state;
    },
    [GET_VOCAB_GROUP_DATA_SUCCESS]: (state, { payload: resultVocabGroupData }) => {
      const newState = produce(state, (draft) => {
        draft['vocabGroupData'] = resultVocabGroupData;
      });
      return newState;
    },
    [GET_VOCAB_GROUP_DATA_FAILURE]: (state, { payload: error }) => {
      console.log(error);
      return state;
    },
    [REMOVE_VOCAB_GROUP_SUCCESS]: (state, { payload: removedGroupCode }) => {
      const newState = produce(state, (draft) => {
        const removedGroupCodeIndex = draft['vocabGroupList'].findIndex(
          (vocabGroupItem) => vocabGroupItem.group_code === removedGroupCode,
        );
        draft['vocabGroupList'].splice(removedGroupCodeIndex, 1);
      });
      return newState;
    },
    [REMOVE_VOCAB_GROUP_FAILURE]: (state, { payload: error }) => {
      console.log(error);
      return state;
    },
  },
  initialState,
);

export default vocab_group;