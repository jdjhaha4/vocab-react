import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import VocabQuestionResultHistory from '../../components/vocab/VocabQuestionResultHistory';
import { withRouter } from 'react-router-dom';
import { getVocabQuestionResultHistoryList } from '../../modules/vocab_question_result_history';
import { getVocabGroupData } from '../../modules/vocab_group';

const VocabQuestionResultHistoryContainer = ({ history, match }) => {
  const { vocab_question_result_id } = match.params;
  const dispatch = useDispatch();
  const { vocabQuestionResultHistoryList } = useSelector(
    ({ vocab_question_result_history }) => ({
      vocabQuestionResultHistoryList: vocab_question_result_history.list,
    }),
  );

  const { vocabGroupData } = useSelector(({ vocab_group }) => ({
    //vocabGroupData: vocab_group.vocabGroupData,
  }));

  useEffect(() => {
    //dispatch(getVocabQuestionResultGroupList({ group_code: groupcode }));
  }, []);

  useEffect(() => {
    dispatch(getVocabQuestionResultHistoryList({ vocab_question_result_id }));
  }, [vocab_question_result_id]);
  const onClickBack = useCallback(() => {
    history.goBack();
  }, []);
  return (
    <VocabQuestionResultHistory
    vocabQuestionResultHistoryList={vocabQuestionResultHistoryList}
    onClickBack={onClickBack}
    />
  );
};

export default withRouter(VocabQuestionResultHistoryContainer);
