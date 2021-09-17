import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import VocabQuestionResult from '../../components/vocab/VocabQuestionResult';
import { withRouter } from 'react-router-dom';
import { getVocabQuestionResultList } from '../../modules/vocab_question_result';

const VocabQuestionResultContainer = () => {
  const dispatch = useDispatch();
  const { vocabQuestionResultList } = useSelector(
    ({ vocab_question_result }) => ({
      vocabQuestionResultList: vocab_question_result.list,
    }),
  );

  useEffect(() => {
    dispatch(getVocabQuestionResultList());
  }, []);

  return (
    <VocabQuestionResult vocabQuestionResultList={vocabQuestionResultList} />
  );
};

export default VocabQuestionResultContainer;
