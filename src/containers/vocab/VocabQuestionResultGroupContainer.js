import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import VocabQuestionResultGroup from '../../components/vocab/VocabQuestionResultGroup';
import { withRouter } from 'react-router-dom';
import { getVocabQuestionResultGroupList } from '../../modules/vocab_question_result';

const VocabQuestionResultGroupContainer = ({ history, match }) => {
  const { groupcode } = match.params;
  const dispatch = useDispatch();
  const { vocabQuestionResultGroupList } = useSelector(
    ({ vocab_question_result }) => ({
      vocabQuestionResultGroupList: vocab_question_result.groupList,
    }),
  );

  useEffect(() => {
    dispatch(getVocabQuestionResultGroupList({group_code:groupcode}));
  }, []);

  return (
    <VocabQuestionResultGroup vocabQuestionResultGroupList={vocabQuestionResultGroupList}/>
  );
};

export default withRouter(VocabQuestionResultGroupContainer);
