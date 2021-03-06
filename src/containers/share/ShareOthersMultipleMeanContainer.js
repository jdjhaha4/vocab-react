import React, { useCallback, useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import VocabStudyMultipleMean from '../../components/vocab/VocabStudyMultipleMean';
import { withRouter } from 'react-router-dom';
import { getOthersShareVocabList, getOthersShareOneData, shuffleVocab } from '../../modules/share';
import {
  initQuestionList,
  insertQuestionResult,
  updateQuestionResult,
  updateQuestionResult2,
  postQuestionResult,
  changeField,
  goToTheNextQuestion,
  setUpdateFlag,
  unmountAction,
} from '../../modules/vocab_study_multiple';
import { increaseAsync, start, stop, init } from '../../modules/timer';
import { isEmpty } from '../../util/jsonUtil';
import { cloneObject } from '../../util/arrayUtil';
import produce from 'immer';
import { changeNaviSubMenu } from '../../modules/navigation';

const ShareOthersMultipleMeanContainer = ({ history, match }) => {

  const { groupcode } = match.params;
  const dispatch = useDispatch();
  const { vocabList } = useSelector(({ share }) => ({
    vocabList: share.vocabList,
  }));
  const { vocabGroupData } = useSelector(({ share }) => ({
    vocabGroupData: share.othersShareGroupData,
  }));
  const { question } = useSelector(({ vocab_study_multiple }) => ({
    question: vocab_study_multiple,
  }));
  const { postQuestionResultLoadingFlag, goToTheNextQuestionLoadingFlag } =
    useSelector(({ loading }) => ({
      postQuestionResultLoadingFlag:
        loading['vocab_study_multiple/POST_QUESTION_RESULT'],
      goToTheNextQuestionLoadingFlag:
        loading['vocab_study_multiple/GO_TO_THE_NEXT_QUESTION'],
    }));
  const { studyTime } = useSelector(({ timer }) => ({
    studyTime: timer,
  }));

  useEffect(() => {
    let group_code = groupcode;
    dispatch(getOthersShareOneData({ group_code }));
    //dispatch(getOthersShareVocabList({ group_code}));
    return () => {
      dispatch(init());
    };
  }, [groupcode]);

  useEffect(() => {
    dispatch(
      setUpdateFlag({
        unmountFlag: false,
        flag: false,
        vocabQuestionResultId: question['vocabQuestionResultId'],
        answerCount: question['answerCount'],
        wrongAnswerCount: question['wrongAnswerCount'],
        complete_flag: 'F',
        study_time_seconds: studyTime['count'],
      }),
    );
  }, [
    question['vocabQuestionResultId'],
    question['answerCount'],
    question['wrongAnswerCount'],
    studyTime['count'],
  ]);

  useEffect(() => {
    return () => {
      dispatch(updateQuestionResult2({complete_flag:'F'}));
      dispatch(unmountAction());
    };
  }, []);

  const onClickBack = useCallback(() => {
    history.goBack();
  }, []);

  useEffect(() => {
    dispatch(initQuestionList({ vocabList }));
    //타이머 시작
    dispatch(start());
    dispatch(increaseAsync());
  }, []);

  useEffect(() => {
    if (!isEmpty(vocabGroupData)) {
      dispatch(
        insertQuestionResult({
          group_code: vocabGroupData.group_code,
          group_name: vocabGroupData.group_name,
          vocab_count: vocabGroupData.vocab_count,
          answer_count: 0,
          wrong_answer_count: 0,
          complete_flag: 'F',
          study_time_seconds: 0,
          question_type_code:'MM',
        }),
      );
    }
  }, []);

  useEffect(() => {
    if (question['complete']) {
      dispatch(stop());
      // dispatch(
      //   setUpdateFlag({
      //     unmountFlag: false,
      //     flag: false,
      //     vocabQuestionResultId: question['vocabQuestionResultId'],
      //     answerCount: question['answerCount'],
      //     wrongAnswerCount: question['wrongAnswerCount'],
      //     complete_flag: 'T',
      //     study_time_seconds: studyTime['count'],
      //   }),
      // );
      dispatch(updateQuestionResult2({complete_flag:'T'}));
    }
  }, [question['complete']]);

  // useEffect(() => {
  //   if (question['updateData']['flag']) {
  //     dispatch(
  //       updateQuestionResult({
  //         id: question['updateData']['vocabQuestionResultId'],
  //         answer_count: question['updateData']['answerCount'],
  //         wrong_answer_count: question['updateData']['wrongAnswerCount'],
  //         complete_flag: question['updateData']['complete_flag'],
  //         study_time_seconds: question['updateData']['study_time_seconds'],
  //       }),
  //     );
  //     dispatch(
  //       setUpdateFlag({
  //         unmountFlag:false,
  //         flag: false,
  //         vocabQuestionResultId: -1,
  //         answerCount: 0,
  //         wrongAnswerCount: 0,
  //         complete_flag: 'N',
  //         study_time_seconds: 0,
  //       }),
  //     );
  //   }
  // }, [question['updateData']['flag']]);

  const moveToThePage = useCallback(() => {
    dispatch(init());
    history.replace(`/share/others/type/${groupcode}`);
  }, []);

  const moveToTheResult = useCallback(() => {
    dispatch(init());
    dispatch(changeNaviSubMenu('vocab/question/result'));
    history.replace(`/vocab/question/result/${groupcode}`);
  }, []);

  const compareAnswer = useCallback(
    ({ id, vocab, mean }) => {
      if (question.vocab['id'] === id) {
        //해당 단어 정답을 맞췄음을 서버에 전달
        dispatch(
          postQuestionResult({
            vocab_question_result_id: question['vocabQuestionResultId'],
            group_code: groupcode,
            question_type: 'multipleChoice',
            question_value: 'mean',
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

        dispatch(goToTheNextQuestion({ delayMillis: 500 }));
      } else {
        //해당 단어 오답임을 서버에 전달
        dispatch(
          postQuestionResult({
            vocab_question_result_id: question['vocabQuestionResultId'],
            group_code: groupcode,
            question_type: 'multipleChoice',
            question_value: 'mean',
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
        dispatch(goToTheNextQuestion({ delayMillis: 3000 })); //오답인 경우 3초 뒤에 이동
      }
    },
    [question],
  );

  return (
    <VocabStudyMultipleMean
      vocabGroupData={vocabGroupData}
      onClickBack={onClickBack}
      question={question}
      compareAnswer={compareAnswer}
      postQuestionResultLoadingFlag={postQuestionResultLoadingFlag}
      goToTheNextQuestionLoadingFlag={goToTheNextQuestionLoadingFlag}
      moveToThePage={moveToThePage}
      studyTime={studyTime}
      moveToTheResult={moveToTheResult}
    />
  );
};

export default withRouter(ShareOthersMultipleMeanContainer);
