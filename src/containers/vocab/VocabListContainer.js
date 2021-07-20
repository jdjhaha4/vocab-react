import React, { useCallback ,useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import VocabList from '../../components/vocab/VocabList';
import { changeField, addVocab, getVocabList } from '../../modules/vocab';

const VocabListContainer = () => {
  const dispatch = useDispatch();

  const { form, vocabList, vocabError, vocabListReload } = useSelector(({ vocab }) => ({
    form: vocab.form,
    vocabList: vocab.vocabList,
    vocabError: vocab.vocabError,
    vocabListReload: vocab.vocabListReload,
  }));

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
        key: "vocabFocus",
        value: false,
      }),
    );
  };

  const onKeyUp = (e) => {
    if(e.key === "Enter"){
      onAddVocab();
    }
  }

  const onAddVocab = useCallback(() => {
    const { vocab, mean } = form;
    if(vocab.trim() ==='' || mean.trim() ===''){
      
      return;
    }
    dispatch(addVocab({ vocab, mean }));
  }, [form]);

  //컴포넌트가 처음 렌더링될 때
  useEffect(() => {
    dispatch(getVocabList({groupCode:''}));
  }, [dispatch]);
  //vocabListReload 가 트루로 변경될 때
  useEffect(() => {
    if(vocabListReload){
      dispatch(getVocabList({groupCode:''}));
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
    />
  );
};

export default VocabListContainer;
