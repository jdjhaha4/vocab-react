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
const [
  GET_VOCAB_GROUP_DATA_FOR_RESULT,
  GET_VOCAB_GROUP_DATA_FOR_RESULT_SUCCESS,
  GET_VOCAB_GROUP_DATA_FOR_RESULT_FAILURE,
] = createRequestActionTypes('vocab_group/GET_VOCAB_GROUP_DATA_FOR_RESULT');
const [ADD_VOCAB_GROUP, ADD_VOCAB_GROUP_SUCCESS, ADD_VOCAB_GROUP_FAILURE] =
  createRequestActionTypes('vocab_group/ADD_VOCAB_GROUP');
const [UPDATE_VOCAB_GROUP, UPDATE_VOCAB_GROUP_SUCCESS, UPDATE_VOCAB_GROUP_FAILURE] =
  createRequestActionTypes('vocab_group/UPDATE_VOCAB_GROUP');
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
export const getVocabGroupDataForResult = createAction(GET_VOCAB_GROUP_DATA_FOR_RESULT);

export const addVocabGroup = createAction(
  ADD_VOCAB_GROUP,
  ({ group_name }) => ({
    group_name,
  }),
);
export const updateVocabGroup = createAction(
  UPDATE_VOCAB_GROUP,
  ({ group_code, group_name, release_boolean }) => ({
    group_code,
    group_name,
    release_boolean,
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
const vocabGroupGetDataForResultSaga = createRequestSaga(
  GET_VOCAB_GROUP_DATA_FOR_RESULT,
  vocabGroupAPI.getVocabGroupDataForResult,
);
const vocabGroupAddSaga = createRequestSaga(
  ADD_VOCAB_GROUP,
  vocabGroupAPI.addVocabGroup,
);
const vocabGroupUpdateSaga = createRequestSaga(
  UPDATE_VOCAB_GROUP,
  vocabGroupAPI.updateVocabGroup,
);
const vocabGroupRemoveSaga = createRequestSaga(
  REMOVE_VOCAB_GROUP,
  vocabGroupAPI.removeVocabGroup,
);

export function* vocabGroupSaga() {
  yield takeLatest(ADD_VOCAB_GROUP, vocabGroupAddSaga);
  yield takeLatest(UPDATE_VOCAB_GROUP, vocabGroupUpdateSaga);
  yield takeLatest(GET_VOCAB_GROUP_LIST, vocabGroupGetListSaga);
  yield takeLatest(GET_VOCAB_GROUP_DATA, vocabGroupGetDataSaga);
  yield takeLatest(REMOVE_VOCAB_GROUP, vocabGroupRemoveSaga);
  yield takeLatest(GET_VOCAB_GROUP_DATA_FOR_RESULT, vocabGroupGetDataForResultSaga);
}

const initialState = {
  form: {
    group_name: '',
    release_boolean:false,
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
    [UPDATE_VOCAB_GROUP_SUCCESS]: (state, { payload: updatedVocabGroupItem }) => {
      const newState = produce(state, (draft) => {
        const updatedIdIndex = draft['vocabGroupList'].findIndex(
          (vocabGroupItem) => vocabGroupItem.group_code === updatedVocabGroupItem.group_code,
        );
        draft['vocabGroupList'][updatedIdIndex]['group_name'] = updatedVocabGroupItem['group_name'];
        draft['vocabGroupList'][updatedIdIndex]['release_boolean'] = updatedVocabGroupItem['release_boolean'];
      });
      return newState;
    },
    [UPDATE_VOCAB_GROUP_FAILURE]: (state, { payload: error }) => {
      console.log(error);
      return state;
    },
    [GET_VOCAB_GROUP_LIST_SUCCESS]: (
      state,
      { payload: resultVocabGroupList },
    ) => {
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
    [GET_VOCAB_GROUP_DATA_SUCCESS]: (
      state,
      { payload: resultVocabGroupData },
    ) => {
      const newState = produce(state, (draft) => {
        draft['vocabGroupData'] = resultVocabGroupData;
      });
      return newState;
    },
    [GET_VOCAB_GROUP_DATA_FAILURE]: (state, { payload: error }) => {
      console.log(error);
      return state;
    },
    [GET_VOCAB_GROUP_DATA_FOR_RESULT_SUCCESS]: (
      state,
      { payload: resultVocabGroupData },
    ) => {
      const newState = produce(state, (draft) => {
        draft['vocabGroupData'] = resultVocabGroupData;
      });
      return newState;
    },
    [GET_VOCAB_GROUP_DATA_FOR_RESULT_FAILURE]: (state, { payload: error }) => {
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
