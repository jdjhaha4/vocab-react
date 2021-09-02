import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import VocabStudyLook from '../../components/vocab/VocabStudyLook';
import { getVocabList } from '../../modules/vocab';
import { withRouter } from 'react-router-dom';
import { getVocabGroupData } from '../../modules/vocab_group';

const VocabStudyLookContainer = ({ match }) => {
  const { groupcode } = match.params;
  const dispatch = useDispatch();
  const { vocabList } = useSelector(({ vocab }) => ({
    vocabList: vocab.vocabList,
  }));
  const { vocabGroupData } = useSelector(({ vocab_group }) => ({
    vocabGroupData: vocab_group.vocabGroupData,
  }));
  useEffect(() => {
    let group_code = groupcode;
    dispatch(getVocabGroupData({ group_code }));
    dispatch(getVocabList({ groupCode: groupcode }));
  }, [groupcode]);
  return (
    <VocabStudyLook vocabList={vocabList} vocabGroupData={vocabGroupData} />
  );
};

export default withRouter(VocabStudyLookContainer);
