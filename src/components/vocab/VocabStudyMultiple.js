import React, { useCallback, useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import palette from '../../lib/styles/palette';
import Button from '../common/Button';
import produce from 'immer';
import LoadingSpinner from '../common/LoadingSpinner';
import QuestionResultModal from '../common/QuestionResultModal';
import { withRouter } from 'react-router-dom';

const CorrectBlock = styled.div`
  color: green;
  font-size: 1.5rem;
  font-weight: 600;
  text-align: center;
`;
const WrongBlock = styled.div`
  color: red;
  font-size: 1.5rem;
  font-weight: 600;
  text-align: center;
`;
const VocabStudyMultipleBlock = styled.div`
  .previous {
    padding: 5px;
    background: ${palette.gray[8]};
    color: white;
    border-radius: 10px;
    margin-right: 10px;
    vertical-align: middle;
    &:hover {
      background: ${palette.gray[6]};
      cursor: pointer;
      border-radius: 10px;
    }
  }

  .group_name {
    font-size: 1.2rem;
    color: #003399;
    font-weight: 600;
  }
  .vocab_count {
    font-size: 1rem;
    color: ${palette.gray[8]};
    font-weight: 600;
  }
  .type_select {
    margin-top: 10px;
    background: ${palette.gray[3]};
    font-size: 1.2rem;
    font-weight: 600;
    vertical-align: middle;
    height: 60px;
    line-height: 60px;
  }
  .study_time{
    text-align: center;
  }
  .score {
    text-align: right;
  }
  .vocab_box {
    padding: 20px;
    margin: 10px;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(50, 50, 50, 0.3);
  }
  .vocab_title {
    color: ${palette.gray[6]};
    font-size: 1.2rem;
    font-weight: 600;
    text-align: center;
  }
  .multiple_title {
    color: ${palette.gray[6]};
    font-size: 0.9rem;
    font-weight: 600;
  }
  .vocab {
    color: #003399;
    font-size: 2rem;
    font-weight: 600;
    margin-top: 20px;
    text-align: center;
  }
  .multiple_box {
    margin-top: 50px;
  }
  .multiple_mean {
    margin: 10px 0;
    padding: 10px;
    border: 2px solid ${palette.gray[3]};
    border-radius: 5px;
    &:hover {
      border: 2px solid skyblue;
      background-color: ${palette.gray[2]};
      cursor: pointer;
    }
  }
  .multiple_mean.correct {
    border: 2px solid green;
    background-color: rgba(183, 240, 177, 0.3);
  }
  .multiple_mean.wrong {
    border: 2px solid red;
    background-color: rgba(255, 167, 167, 0.3);
  }
  .round_char {
    margin-right: 8px;
    font-size: 0.8em;
    width: 1.7em;
    border-radius: 1.5em;
    padding: 0.1em 0.1em;
    line-height: 1.25em;
    border: 1px solid ${palette.gray[6]};
    display: inline-block;
    text-align: center;
    font-weight: 500;
  }
`;
const VocabStudyMultiple = ({
  history,
  vocabGroupData,
  onClickBack,
  question,
  compareAnswer,
  postQuestionResultLoadingFlag,
  goToTheNextQuestionLoadingFlag,
  moveToThePage,
  studyTime,
}) => {
  return (
    <VocabStudyMultipleBlock>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <span
              className="previous"
              onClick={() => onClickBack()}
            >{`< 이전`}</span>
            <span className="group_name">{vocabGroupData.group_name}</span>
            <span className="vocab_count">
              ({vocabGroupData.vocab_count} 단어)
            </span>
          </div>
          <div className="col-4 type_select">객관식 문제 맞추기</div>
          <div className="col-4 type_select study_time">
            학습 시간: {studyTime.hour}시간 {studyTime.minute}분 {studyTime.second}초
          </div>
          <div className="col-4 type_select score">
            {question.index + 1} / {vocabGroupData.vocab_count}
          </div>
        </div>
        <div className="row vocab_box">
          <div className="col-12 vocab_title">단어</div>
          <div className="col-12 vocab">{question.vocab['vocab']}</div>
          <div className="col-12">
            {question.resultFlag == 'T' ? (
              <CorrectBlock>정답 입니다. 다음 문제로 이동 합니다</CorrectBlock>
            ) : null}
          </div>
          <div className="col-12">
            {question.resultFlag == 'F' ? (
              <WrongBlock>오답 입니다. 다음 문제로 이동 합니다</WrongBlock>
            ) : null}
          </div>
          <div className="col-12 multiple_box multiple_title">
            일치하는 뜻 선택
          </div>
          {question.meanMultipleChoices.map((item, index) => {
            let correctClassName =
              item.id == question.answerVocabId ? ' correct' : '';
            let wrongClassName =
              question.resultFlag == 'F' &&
              item.id == question.wrongAnswerVocabId
                ? ' wrong'
                : '';
            return (
              <div
                className="col-6"
                key={`choice_${item.id}`}
                onClick={() => {
                  compareAnswer(item);
                }}
              >
                <div
                  className={`multiple_mean${correctClassName}${wrongClassName}`}
                >
                  <span className="round_char">{index + 1}</span>
                  {item.mean}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <LoadingSpinner visible={postQuestionResultLoadingFlag} />
      <LoadingSpinner visible={goToTheNextQuestionLoadingFlag} />
      <QuestionResultModal
        title={`${vocabGroupData.group_name}(${vocabGroupData.vocab_count}단어) 테스트 완료!`}
        description="수고하셨습니다!"
        visible={question['complete']}
        confirmText="학습하기로 이동"
        studyTime={studyTime}
        vocabCount={vocabGroupData.vocab_count}
        answerCount={question['answerCount']}
        wrongAnswerCount={question['wrongAnswerCount']}
        onConfirm={() => {
          moveToThePage();
        }}
      />
    </VocabStudyMultipleBlock>
  );
};

export default withRouter(VocabStudyMultiple);
