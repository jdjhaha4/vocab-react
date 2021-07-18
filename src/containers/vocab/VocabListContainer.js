import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import VocabList from '../../components/vocab/VocabList';
import { changeField, addVocab } from '../../modules/vocab';

const VocabListContainer = () => {
  const dispatch = useDispatch();

  const { form, vocabList, vocabError } = useSelector(({ vocab }) => ({
    form: vocab.form,
    vocabList: vocab.vocabList,
    vocabError: vocab.vocabError,
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

  const onAddVocab = useCallback(() => {
    const {vocab, mean} = form;
    dispatch(addVocab({vocab, mean}));
  }, [form]);

  return (
    <VocabList
      form={form}
      vocabList={vocabList}
      vocabError={vocabError}
      onChange={onChange}
      onAddVocab={onAddVocab}
    />
  );
};

export default VocabListContainer;
