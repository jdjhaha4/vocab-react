import React, { useCallback, useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  updateQuestionResult,
  setUpdateFlag,
} from '../../modules/vocab_study_multiple';
const VocabStudyPageBackgroundContainer = () => {
  const dispatch = useDispatch();
  const { updateData } = useSelector(({ vocab_study_multiple }) => ({
    updateData: vocab_study_multiple.updateData,
  }));

  useEffect(() => {
    if (updateData['unmountFlag']) {
      dispatch(
        updateQuestionResult({
          id: updateData['vocabQuestionResultId'],
          answer_count: updateData['answerCount'],
          wrong_answer_count: updateData['wrongAnswerCount'],
          complete_flag: updateData['complete_flag'],
          study_time_seconds: updateData['study_time_seconds'],
        }),
      );
      dispatch(
        setUpdateFlag({
          unmountFlag: false,
          vocabQuestionResultId: -1,
          answerCount: 0,
          wrongAnswerCount: 0,
          complete_flag: 'N',
          study_time_seconds: 0,
        }),
      );
    }
  }, [updateData['unmountFlag']]);

  return null;
};

export default VocabStudyPageBackgroundContainer;
