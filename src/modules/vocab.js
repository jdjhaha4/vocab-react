import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';
import { takeLatest } from 'redux-saga/effects';
import createRequestSaga, {
  createRequestActionTypes,
} from '../lib/createRequestSaga';
import * as vocabAPI from '../lib/api/vocab';

const CHANGE_SELECTED_GROUP_CODE = 'vocab/CHANGE_SELECTED_GROUP_CODE';
const CHANGE_FIELD = 'vocab/CHANGE_FIELD';
const SHUFFLE_VOCAB = 'vocab/SHUFFLE_VOCAB';
const [GET_VOCAB_LIST, GET_VOCAB_LIST_SUCCESS, GET_VOCAB_LIST_FAILURE] =
  createRequestActionTypes('vocab/GET_VOCAB_LIST');
const [ADD_VOCAB, ADD_VOCAB_SUCCESS, ADD_VOCAB_FAILURE] =
  createRequestActionTypes('vocab/ADD_VOCAB');
const [REMOVE_VOCAB, REMOVE_VOCAB_SUCCESS, REMOVE_VOCAB_FAILURE] =
  createRequestActionTypes('vocab/REMOVE_VOCAB');

export const changeSelectedGroupCode = createAction(
  CHANGE_SELECTED_GROUP_CODE,
  ({ groupCode }) => ({
    groupCode,
  }),
);
export const changeField = createAction(CHANGE_FIELD, ({ key, value }) => ({
  key, // vocab, mean
  value, // 실제 바꾸려는 값
}));

export const shuffleVocab = createAction(SHUFFLE_VOCAB);

export const getVocabList = createAction(
  GET_VOCAB_LIST,
  ({ groupCode, ignoreVocabIdList }) => {
    if (ignoreVocabIdList == null) {
      ignoreVocabIdList = [];
    }
    return {
      groupCode,
      ignoreVocabIdList,
    };
  },
);

export const addVocab = createAction(
  ADD_VOCAB,
  ({ vocab, mean, selectedGroupCode }) => ({
    vocab,
    mean,
    selectedGroupCode,
  }),
);

export const removeVocab = createAction(REMOVE_VOCAB, ({ id }) => ({
  id,
}));

const vocabGetListSaga = createRequestSaga(
  GET_VOCAB_LIST,
  vocabAPI.getVocabList,
);
const vocabAddSaga = createRequestSaga(ADD_VOCAB, vocabAPI.addVocab);
const vocabRemoveSaga = createRequestSaga(REMOVE_VOCAB, vocabAPI.removeVocab);

export function* vocabSaga() {
  yield takeLatest(ADD_VOCAB, vocabAddSaga);
  yield takeLatest(GET_VOCAB_LIST, vocabGetListSaga);
  yield takeLatest(REMOVE_VOCAB, vocabRemoveSaga);
}

const initialState = {
  form: {
    id: 0,
    vocab: '',
    mean: '',
    vocabFocus: false,
  },
  vocabList: [],
  vocabError: null,
  vocabListReload: false,
  selectedGroupCode: 'all',
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

const vocab = handleActions(
  {
    [CHANGE_SELECTED_GROUP_CODE]: (state, { payload: { groupCode } }) =>
      produce(state, (draft) => {
        draft['selectedGroupCode'] = groupCode;
        draft['vocabListReload'] = true;
      }),
    [CHANGE_FIELD]: (state, { payload: { key, value } }) =>
      produce(state, (draft) => {
        draft['form'][key] = value;
      }),
    [SHUFFLE_VOCAB]: (state, {}) =>
      produce(state, (draft) => {
        draft['vocabList'] = shuffle(draft['vocabList']);
      }),
    [ADD_VOCAB_SUCCESS]: (state, { payload: resultCnt }) => {
      const newState = produce(state, (draft) => {
        draft['form']['vocab'] = '';
        draft['form']['mean'] = '';
        draft['form']['vocabFocus'] = true;
        draft['vocabListReload'] = true;
      });
      return newState;
    },
    [ADD_VOCAB_FAILURE]: (state, { payload: error }) => {
      console.log(error);
      return state;
    },
    [GET_VOCAB_LIST_SUCCESS]: (state, { payload: resultVocabList }) => {
      const newState = produce(state, (draft) => {
        draft['vocabList'] = [];
        draft['vocabListReload'] = false;
        resultVocabList.map((vocabItem) => {
          const vocaJsonObj = JSON.parse(vocabItem['voca_json']);
          vocaJsonObj['id'] = vocabItem['id'];

          try {
            const vocabDicArray = JSON.parse(vocabItem['vocab_dic_json']);
            vocaJsonObj['dicArr'] = vocabDicArray;
          } catch (e) {
          }
          draft['vocabList'].push(vocaJsonObj);
        });
      });
      return newState;
    },
    [GET_VOCAB_LIST_FAILURE]: (state, { payload: error }) => {
      console.log(error);
      return state;
    },
    [REMOVE_VOCAB_SUCCESS]: (state, { payload: removedId }) => {
      const newState = produce(state, (draft) => {
        const removedIdIndex = draft['vocabList'].findIndex(
          (vocabItem) => vocabItem.id === removedId,
        );
        draft['vocabList'].splice(removedIdIndex, 1);
      });
      return newState;
    },
    [REMOVE_VOCAB_FAILURE]: (state, { payload: error }) => {
      console.log(error);
      return state;
    },
  },
  initialState,
);

export default vocab;
