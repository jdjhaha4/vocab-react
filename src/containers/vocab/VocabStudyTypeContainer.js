import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import VocabStudyType from '../../components/vocab/VocabStudyType';
import { withRouter } from 'react-router-dom';
import { getVocabGroupData } from '../../modules/vocab_group';

const VocabStudyTypeContainer = ({ history, match }) => {
  const { groupcode } = match.params;
  const dispatch = useDispatch();

  const { vocabGroupData } = useSelector(({ vocab_group }) => ({
    vocabGroupData: vocab_group.vocabGroupData,
  }));

  useEffect(() => {
    let group_code = groupcode;
    dispatch(getVocabGroupData({ group_code }));
  }, [groupcode]);

  const onClickBack = useCallback(() => {
    history.goBack();
  }, []);

  //여기서 그룹명, 그룹에 속한 단어 갯수 조회하여 전달

  return (
    <VocabStudyType vocabGroupData={vocabGroupData} onClickBack={onClickBack} />
  );
};

export default withRouter(VocabStudyTypeContainer);
