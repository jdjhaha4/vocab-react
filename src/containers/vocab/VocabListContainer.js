import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import VocabList from '../../components/vocab/VocabList';
import {
  changeField,
  addVocab,
  getVocabList,
  removeVocab,
  changeSelectedGroupCode,
  updateVocab,
} from '../../modules/vocab';
import { getVocabGroupList } from '../../modules/vocab_group';

const VocabListContainer = () => {
  const dispatch = useDispatch();

  const { sub_menu_id } = useSelector(({ navigation }) => ({
    sub_menu_id: navigation.sub_menu_id,
  }));

  const { vocabGroupList } = useSelector(({ vocab_group }) => ({
    vocabGroupList: vocab_group.vocabGroupList,
  }));

  const { form, vocabList, vocabError, vocabListReload, selectedGroupCode, vocabBeingAdded } = useSelector(
    ({ vocab }) => ({
      form: vocab.form,
      vocabList: vocab.vocabList,
      vocabError: vocab.vocabError,
      vocabListReload: vocab.vocabListReload,
      selectedGroupCode: vocab.selectedGroupCode,
      vocabBeingAdded: vocab.vocabBeingAdded,
    }),
  );
  
  const { addVocabLoadingFlag } =
  useSelector(({ loading }) => ({
    addVocabLoadingFlag:
      loading['vocab/ADD_VOCAB'],
  }));

  const onChangeGroupCode = useCallback((groupCode) => {
    dispatch(changeSelectedGroupCode({ groupCode }));
  }, []);

  //인풋 변경 이벤트 핸들러
  const onChange = (e) => {
    const { value, name } = e.target;
    dispatch(
      changeField({
        key: name,
        value,
      }),
    );
  };

  const onFocusComplete = () => {
    dispatch(
      changeField({
        key: 'vocabFocus',
        value: false,
      }),
    );
  };

  const onKeyUp = (e) => {
    if (e.key === 'Enter') {
      onAddVocab();
    }
  };

  const onAddVocab = useCallback(() => {
    const { vocab, mean } = form;
    if (vocab.trim() === '' || mean.trim() === '' || vocabBeingAdded) {
      return;
    }
    dispatch(addVocab({ vocab, mean, selectedGroupCode }));
  }, [form, vocabBeingAdded]);

  const onRemoveVocab = useCallback((e, id) => {
    dispatch(removeVocab({ id }));
    e.stopPropagation();
    e.preventDefault();
  }, []);

  const onUpdateVocab = useCallback((vocabItem) => {
    dispatch(updateVocab({ id:vocabItem.id, vocab:vocabItem.vocab, mean:vocabItem.mean }));
  }, []);

  //컴포넌트가 처음 렌더링될 때
  useEffect(() => {
    dispatch(getVocabGroupList());
    dispatch(getVocabList({ groupCode: selectedGroupCode }));
  }, [dispatch]);

  //vocabListReload 가 트루로 변경될 때
  useEffect(() => {
    if (vocabListReload) {
      dispatch(getVocabGroupList());
      dispatch(getVocabList({ groupCode: selectedGroupCode }));
    }
  }, [vocabListReload]);

  return (
    <VocabList
      form={form}
      vocabList={vocabList}
      vocabError={vocabError}
      onChange={onChange}
      onKeyUp={onKeyUp}
      onAddVocab={onAddVocab}
      getVocabList={getVocabList}
      onFocusComplete={onFocusComplete}
      onRemoveVocab={onRemoveVocab}
      vocabGroupList={vocabGroupList}
      selectedGroupCode={selectedGroupCode}
      onChangeGroupCode={onChangeGroupCode}
      addVocabLoadingFlag={addVocabLoadingFlag}
      onUpdateVocab={onUpdateVocab}
    />
  );
};

export default VocabListContainer;
