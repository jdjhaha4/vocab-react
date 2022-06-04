import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';
import { takeLatest } from 'redux-saga/effects';
import createRequestSaga, {
  createRequestActionTypes,
} from '../lib/createRequestSaga';
import * as shareAPI from '../lib/api/share';

const [
  GET_MY_SHARE_DATA,
  GET_MY_SHARE_DATA_SUCCESS,
  GET_MY_SHARE_DATA_FAILURE,
] = createRequestActionTypes('share/GET_MY_SHARE_DATA');

const [
  GET_OTHERS_SHARE_DATA,
  GET_OTHERS_SHARE_DATA_SUCCESS,
  GET_OTHERS_SHARE_DATA_FAILURE,
] = createRequestActionTypes('share/GET_OTHERS_SHARE_DATA');

const [
  GET_OTHERS_SHARE_ONE_DATA,
  GET_OTHERS_SHARE_ONE_DATA_SUCCESS,
  GET_OTHERS_SHARE_ONE_DATA_FAILURE,
] = createRequestActionTypes('share/GET_OTHERS_SHARE_ONE_DATA');

const [
  GET_OTHERS_SHARE_VOCAB_LIST,
  GET_OTHERS_SHARE_VOCAB_LIST_SUCCESS,
  GET_OTHERS_SHARE_VOCAB_LIST_FAILURE,
] = createRequestActionTypes('share/GET_OTHERS_SHARE_VOCAB_LIST');
const SHUFFLE_VOCAB = 'share/SHUFFLE_VOCAB';

export const getMyShareData = createAction(GET_MY_SHARE_DATA);
export const getOthersShareData = createAction(GET_OTHERS_SHARE_DATA);
export const getOthersShareOneData = createAction(
  GET_OTHERS_SHARE_ONE_DATA,
  ({ group_code }) => ({
    group_code,
  }),
);
export const getOthersShareVocabList = createAction(
  GET_OTHERS_SHARE_VOCAB_LIST,
  ({ group_code }) => ({
    group_code,
  }),
);
export const shuffleVocab = createAction(SHUFFLE_VOCAB);

const getMyShareDataSaga = createRequestSaga(
  GET_MY_SHARE_DATA,
  shareAPI.getMyShareData,
);
const getOthersShareDataSaga = createRequestSaga(
  GET_OTHERS_SHARE_DATA,
  shareAPI.getOthersShareData,
);
const getOthersShareOneDataSaga = createRequestSaga(
  GET_OTHERS_SHARE_ONE_DATA,
  shareAPI.getOthersShareOneData,
);
const getOthersShareVocabListSaga = createRequestSaga(
  GET_OTHERS_SHARE_VOCAB_LIST,
  shareAPI.getOthersShareVocabList,
);

export function* shareSaga() {
  yield takeLatest(GET_MY_SHARE_DATA, getMyShareDataSaga);
  yield takeLatest(GET_OTHERS_SHARE_DATA, getOthersShareDataSaga);
  yield takeLatest(GET_OTHERS_SHARE_ONE_DATA, getOthersShareOneDataSaga);
  yield takeLatest(GET_OTHERS_SHARE_VOCAB_LIST, getOthersShareVocabListSaga);
}

const initialState = {
  myShareGroupList: [],
  othersShareGroupList: [],
  othersShareGroupData:{},
  vocabList: [],
};

function shuffle(array) {
  var currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

const share = handleActions(
  {
    [GET_MY_SHARE_DATA_SUCCESS]: (state, { payload: data }) => {
      const newState = produce(state, (draft) => {
        draft['myShareGroupList'] = data['myShareGroupList'];
      });
      return newState;
    },
    [GET_MY_SHARE_DATA_FAILURE]: (state, { payload: error }) => {
      console.log(error);
      return state;
    },
    [GET_OTHERS_SHARE_DATA_SUCCESS]: (state, { payload: data }) => {
      const newState = produce(state, (draft) => {
        draft['othersShareGroupList'] = data['othersShareGroupList'];
      });
      return newState;
    },
    [GET_OTHERS_SHARE_DATA_FAILURE]: (state, { payload: error }) => {
      console.log(error);
      return state;
    },
    [GET_OTHERS_SHARE_ONE_DATA_SUCCESS]: (state, { payload: data }) => {
      const newState = produce(state, (draft) => {
        draft['othersShareGroupData'] = data;
      });
      return newState;
    },
    [GET_OTHERS_SHARE_ONE_DATA_FAILURE]: (state, { payload: error }) => {
      console.log(error);
      return state;
    },
    [GET_OTHERS_SHARE_VOCAB_LIST_SUCCESS]: (state, { payload: resultVocabList }) => {
      const newState = produce(state, (draft) => {
        draft['vocabList'] = [];
        if(resultVocabList != undefined && resultVocabList != null){
          resultVocabList.map((vocabItem) => {
            const vocaJsonObj = JSON.parse(vocabItem['voca_json']);
            vocaJsonObj['id'] = vocabItem['id'];
  
            try {
              const vocabDicArray = JSON.parse(vocabItem['vocab_dic_json']);
              vocaJsonObj['dicArr'] = vocabDicArray;
            } catch (e) {}
            draft['vocabList'].push(vocaJsonObj);
          });
        }
      });
      return newState;
    },
    [GET_OTHERS_SHARE_VOCAB_LIST_FAILURE]: (state, { payload: error }) => {
      console.log(error);
      return state;
    },
    [SHUFFLE_VOCAB]: (state, {}) =>
      produce(state, (draft) => {
        draft['vocabList'] = shuffle(draft['vocabList']);
      }),
  },
  initialState,
);

export default share;
