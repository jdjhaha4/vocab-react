import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import VocabStudy from '../../components/vocab/VocabStudy';
import { getVocabGroupList } from '../../modules/vocab_group';

const VocabStudyContainer = () => {
  const dispatch = useDispatch();

  const { vocabGroupList } = useSelector(({ vocab_group }) => ({
    vocabGroupList: vocab_group.vocabGroupList,
  }));

  //컴포넌트가 처음 렌더링될 때
  useEffect(() => {
    dispatch(getVocabGroupList());
  }, [dispatch]);

  return (<VocabStudy vocabGroupList={vocabGroupList}/>);
};

export default VocabStudyContainer;
