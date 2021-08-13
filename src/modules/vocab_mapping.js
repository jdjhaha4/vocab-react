import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';
import { takeLatest } from 'redux-saga/effects';
import createRequestSaga, {
  createRequestActionTypes,
} from '../lib/createRequestSaga';
import * as vocabGroupMappingAPI from '../lib/api/vocab_mapping';

const CHANGE_GROUP_CODE = 'vocab_mapping/CHANGE_GROUP_CODE';
const [
  GET_VOCAB_GROUP_MAPPING_LIST,
  GET_VOCAB_GROUP_MAPPING_LIST_SUCCESS,
  GET_VOCAB_GROUP_MAPPING_LIST_FAILURE,
] = createRequestActionTypes('vocab_mapping/GET_VOCAB_GROUP_MAPPING_LIST');
const [
  ADD_VOCAB_GROUP_MAPPING,
  ADD_VOCAB_GROUP_MAPPING_SUCCESS,
  ADD_VOCAB_GROUP_MAPPING_FAILURE,
] = createRequestActionTypes('vocab_mapping/ADD_VOCAB_GROUP_MAPPING');
const [
  REMOVE_VOCAB_GROUP_MAPPING,
  REMOVE_VOCAB_GROUP_MAPPING_SUCCESS,
  REMOVE_VOCAB_GROUP_MAPPING_FAILURE,
] = createRequestActionTypes('vocab_mapping/REMOVE_VOCAB_GROUP_MAPPING');

export const changeGroupCode = createAction(
  CHANGE_GROUP_CODE,
  ({ groupCode, groupName }) => ({
    groupCode,
    groupName,
  }),
);

export const getVocabGroupMappingList = createAction(
  GET_VOCAB_GROUP_MAPPING_LIST,
  ({ groupCode }) => ({
    groupCode,
  }),
);

export const addVocabGroupMapping = createAction(
  ADD_VOCAB_GROUP_MAPPING,
  ({ groupCode, vocabId }) => ({
    groupCode,
    vocabId,
  }),
);

export const removeVocabGroupMapping = createAction(
  REMOVE_VOCAB_GROUP_MAPPING,
  ({ groupCode, vocabId }) => ({
    groupCode,
    vocabId,
  }),
);

const getVocabGroupMappingListSaga = createRequestSaga(
  GET_VOCAB_GROUP_MAPPING_LIST,
  vocabGroupMappingAPI.getVocabGroupMappingList,
);
const addVocabGroupMappingSaga = createRequestSaga(
  ADD_VOCAB_GROUP_MAPPING,
  vocabGroupMappingAPI.addVocabGroupMapping,
);
const removeVocabGroupMappingSaga = createRequestSaga(
  REMOVE_VOCAB_GROUP_MAPPING,
  vocabGroupMappingAPI.removeVocabGroupMapping,
);

export function* vocabGroupMappingSaga() {
  yield takeLatest(GET_VOCAB_GROUP_MAPPING_LIST, getVocabGroupMappingListSaga);
  yield takeLatest(ADD_VOCAB_GROUP_MAPPING, addVocabGroupMappingSaga);
  yield takeLatest(REMOVE_VOCAB_GROUP_MAPPING, removeVocabGroupMappingSaga);
}

const initialState = {
  groupCode: '',
  groupName:'',
  vocabGroupMappingList: [],
  vocabGroupMappingError: null,
  vocabGroupMappingListReload: false,
};

const vocab_group_mapping = handleActions(
  {
    [CHANGE_GROUP_CODE]: (state, { payload: { groupCode, groupName } }) =>
      produce(state, (draft) => {
        draft['groupCode'] = groupCode;
        draft['groupName'] = groupName;
        draft['vocabGroupMappingListReload'] = true;
      }),
    [GET_VOCAB_GROUP_MAPPING_LIST_SUCCESS]: (
      state,
      { payload: resultVocabGroupMappingList },
    ) => {
      const newState = produce(state, (draft) => {
        draft['vocabGroupMappingList'] = [];
        draft['vocabGroupMappingListReload'] = false;
        resultVocabGroupMappingList.map((vocabGroupMappingItem) => {
          const vocaJsonObj = JSON.parse(vocabGroupMappingItem['voca_json']);
          vocaJsonObj['group_code'] = vocabGroupMappingItem['group_code'];
          vocaJsonObj['group_name'] = vocabGroupMappingItem['group_name'];
          vocaJsonObj['vocab_id'] = vocabGroupMappingItem['vocab_id'];
          draft['vocabGroupMappingList'].push(vocaJsonObj);
        });
      });
      return newState;
    },
    [GET_VOCAB_GROUP_MAPPING_LIST_FAILURE]: (state, { payload: error }) => {
      console.log(error);
      return state;
    },
    [ADD_VOCAB_GROUP_MAPPING_SUCCESS]: (state, { payload: resultCnt }) => {
      const newState = produce(state, (draft) => {
        draft['vocabGroupMappingListReload'] = true;
      });
      return newState;
    },
    [ADD_VOCAB_GROUP_MAPPING_FAILURE]: (state, { payload: error }) => {
      console.log(error);
      return state;
    },

    [REMOVE_VOCAB_GROUP_MAPPING_SUCCESS]: (
      state,
      { payload: removedGroupCode },
    ) => {
      const newState = produce(state, (draft) => {
        draft['vocabGroupMappingListReload'] = true;
      });
      return newState;
    },
    [REMOVE_VOCAB_GROUP_MAPPING_FAILURE]: (state, { payload: error }) => {
      console.log(error);
      return state;
    },
  },
  initialState,
);

export default vocab_group_mapping;
