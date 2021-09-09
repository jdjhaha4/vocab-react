import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import VocabStudyMultiple from '../../components/vocab/VocabStudyMultiple';
import { getVocabList, shuffleVocab } from '../../modules/vocab';
import { withRouter } from 'react-router-dom';
import { getVocabGroupData } from '../../modules/vocab_group';
import {
  initQuestionList,
  postQuestionResult,
  changeField,
  goToTheNextQuestion,
} from '../../modules/vocab_study_multiple';

const VocabStudyMultipleContainer = ({ history, match }) => {
  const { groupcode } = match.params;
  const dispatch = useDispatch();
  const { vocabList } = useSelector(({ vocab }) => ({
    vocabList: vocab.vocabList,
  }));
  const { vocabGroupData } = useSelector(({ vocab_group }) => ({
    vocabGroupData: vocab_group.vocabGroupData,
  }));
  const { question } = useSelector(({ vocab_study_multiple }) => ({
    question: vocab_study_multiple,
  }));
  const { postQuestionResultLoadingFlag } = useSelector(({ loading }) => ({
    postQuestionResultLoadingFlag:
      loading['vocab_study_multiple/POST_QUESTION_RESULT'],
  }));

  useEffect(() => {
    let group_code = groupcode;
    dispatch(getVocabGroupData({ group_code }));
    dispatch(getVocabList({ groupCode: groupcode }));
  }, [groupcode]);
  const onClickBack = useCallback(() => {
    history.goBack();
  }, []);

  useEffect(() => {
    dispatch(initQuestionList({ vocabList }));
  }, [vocabList]);

  const compareAnswer = useCallback(
    ({ id, vocab, mean }) => {
      if (question.vocab['id'] === id) {
        //해당 단어 정답을 맞췄음을 서버에 전달
        dispatch(
          postQuestionResult({
            vocab_id: question.vocab['id'],
            vocab: question.vocab['vocab'],
            mean: question.vocab['mean'],
            answer_vocab_id: id,
            answer_vocab: vocab,
            answer_mean: mean,
            result_flag: 'T',
          }),
        );
        //정답 처리
        //정답 보기가 초록색으로 강조 표시 됨
        //3~5초 뒤에 다음 단어로 화면 전환
        dispatch(
          changeField({
            resultFlag: 'T',
            answerVocabId: id,
            wrongAnswerVocabId: -1,
          }),
        );
      } else {
        //해당 단어 오답임을 서버에 전달
        dispatch(
          postQuestionResult({
            vocab_id: question.vocab['id'],
            vocab: question.vocab['vocab'],
            mean: question.vocab['mean'],
            answer_vocab_id: id,
            answer_vocab: vocab,
            answer_mean: mean,
            result_flag: 'F',
          }),
        );
        //오답 처리
        //정답, 오답 보기가 빨간색, 초록색으로 강조 표시 됨
        //3~5초 뒤에 다음 단어로 화면 전환
        dispatch(
          changeField({
            resultFlag: 'F',
            answerVocabId: question.vocab['id'],
            wrongAnswerVocabId: id,
          }),
        );
      }
      
      dispatch(goToTheNextQuestion());
    },
    [question],
  );

  return (
    <VocabStudyMultiple
      vocabGroupData={vocabGroupData}
      onClickBack={onClickBack}
      question={question}
      compareAnswer={compareAnswer}
      postQuestionResultLoadingFlag={postQuestionResultLoadingFlag}
    />
  );
};

export default withRouter(VocabStudyMultipleContainer);
