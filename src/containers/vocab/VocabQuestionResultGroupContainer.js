import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import VocabQuestionResultGroup from '../../components/vocab/VocabQuestionResultGroup';
import { withRouter } from 'react-router-dom';
import { getVocabQuestionResultGroupList } from '../../modules/vocab_question_result';
import { getVocabGroupDataForResult } from '../../modules/vocab_group';

const VocabQuestionResultGroupContainer = ({ history, match }) => {
  const { groupcode } = match.params;
  const dispatch = useDispatch();
  const { vocabQuestionResultGroupList } = useSelector(
    ({ vocab_question_result }) => ({
      vocabQuestionResultGroupList: vocab_question_result.groupList,
    }),
  );

  const { vocabGroupData } = useSelector(({ vocab_group }) => ({
    vocabGroupData: vocab_group.vocabGroupData,
  }));

  useEffect(() => {
    dispatch(getVocabQuestionResultGroupList({ group_code: groupcode }));
  }, []);

  useEffect(() => {
    let group_code = groupcode;
    dispatch(getVocabGroupDataForResult({ group_code }));
  }, [groupcode]);

  const moveToHistory = useCallback((vocab_question_result_id) => {
    history.push(`/vocab/question/history/${vocab_question_result_id}`);
  }, []);

  return (
    <VocabQuestionResultGroup
      vocabGroupData={vocabGroupData}
      vocabQuestionResultGroupList={vocabQuestionResultGroupList}
      moveToHistory={moveToHistory}
    />
  );
};

export default withRouter(VocabQuestionResultGroupContainer);
