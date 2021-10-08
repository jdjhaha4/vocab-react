import React, { useCallback, useEffect } from 'react';
import styled, { css } from 'styled-components';
import palette from '../../lib/styles/palette';
import { Line } from 'react-chartjs-2';
import moment from '../../../node_modules/moment/moment';

const VocabQuestionResultHistoryBlock = styled.div`
  height: calc(100vh - 150px);
  background-color: ${palette.gray[0]};

  .result_flag_T {
    background-color: ${palette.gray[1]};
  }

  .result_flag_F {
    background-color: rgba(255, 99, 132, 0.2);
  }

  .result_flag_N {
    background-color: rgba(0, 150, 132, 0.2);
  }

  .worng_answer {
    display: inline-block;
    padding: 5px;
    margin: 3px 0 3px 10px;
    border: 1px solid ${palette.gray[2]};
    border-radius: 15px;
    background: ${palette.gray[2]};
    color: #003399;
  }

  .time {
    display: inline-block;
    padding: 5px;
    margin: 3px 0 3px 10px;
    border: 1px solid ${palette.gray[2]};
    border-radius: 15px;
    background: ${palette.gray[2]};
  }

  .wrapper {
    display: inline-block;
    height: 40px;
    line-height: 40px;
    border: 1px soild red;
  }
  .previous {
    display: inline-block;
    padding: 5px;
    background: ${palette.gray[8]};
    color: white;
    border-radius: 10px;
    line-height: normal;
    vertical-align: middle;
    &:hover {
      background: ${palette.gray[6]};
      cursor: pointer;
      border-radius: 10px;
    }
  }
  .question_value {
    margin-left: 10px;
    font-size: 1.1rem;
    font-weight: 600;
    color: ${palette.gray[6]};
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

const VocabQuestionResultHistory = ({
  vocabQuestionResultHistoryList,
  onClickBack,
}) => {
  let questionValueStr = '';
  let questionValue = '';
  let questionType = '';
  if (
    vocabQuestionResultHistoryList != null &&
    vocabQuestionResultHistoryList.length > 0
  ) {
    if (
      vocabQuestionResultHistoryList[0]['question_type'] == 'multipleChoice' &&
      vocabQuestionResultHistoryList[0]['question_value'] == 'mean'
    ) {
      questionValueStr = '객관식 (뜻 보고 단어 선택)';
      questionType = 'multipleChoice';
      questionValue = 'mean';
    } else if (
      vocabQuestionResultHistoryList[0]['question_type'] == 'multipleChoice' &&
      vocabQuestionResultHistoryList[0]['question_value'] == 'vocab'
    ) {
      questionValueStr = '객관식 (단어 보고 뜻 선택)';
      questionType = 'multipleChoice';
      questionValue = 'vocab';
    } else if (
      vocabQuestionResultHistoryList[0]['question_type'] == 'subjective' &&
      vocabQuestionResultHistoryList[0]['question_value'] == 'vocab'
    ) {
      questionValueStr = '주관식 (단어 보고 뜻 입력)';
      questionType = 'subjective';
      questionValue = 'vocab';
    } else if (
      vocabQuestionResultHistoryList[0]['question_type'] == 'subjective' &&
      vocabQuestionResultHistoryList[0]['question_value'] == 'mean'
    ) {
      questionValueStr = '주관식 (뜻 보고 단어 입력)';
      questionType = 'subjective';
      questionValue = 'mean';
    }
  }
  return (
    <VocabQuestionResultHistoryBlock>
      <div className="container">
        <div className="row">
          <div className="col-2">
            <div className="wrapper">
              <span
                className="previous"
                onClick={() => onClickBack()}
              >{`< 이전`}</span>
            </div>
          </div>
          <div className="col-10">
            <h4>
              학습결과 이력
              <span className="question_value">{questionValueStr}</span>
            </h4>
          </div>
          {vocabQuestionResultHistoryList.map((item, index) => {
            let itemSelectSeconds = 0;
            if (index - 1 >= 0) {
              const beforeDate = moment(
                vocabQuestionResultHistoryList[index - 1]['regist_datetime'],
                'YYYY-MM-DD hh:mm:ss',
              );
              const itemDate = moment(
                vocabQuestionResultHistoryList[index]['regist_datetime'],
                'YYYY-MM-DD hh:mm:ss',
              );
              var duration = moment.duration(itemDate.diff(beforeDate));
              itemSelectSeconds = duration.asSeconds();
            }
            const resultFlag = `result_flag_${item.result_flag}`;

            let divTag = (
              <div
                className={`col-12 ${resultFlag}`}
                key={`history_${item.id}`}
              >
                <span className="round_char">{index + 1}</span>
                {item.vocab}={item.mean}
                {questionType === 'subjective' && questionValue === 'vocab' ? (
                  <span className="worng_answer">
                    입력한 뜻 : {item.answer_mean}
                  </span>
                ) : null}
                {questionType === 'subjective' && questionValue === 'mean' ? (
                  <span className="worng_answer">
                    입력한 단어 : {item.answer_vocab}
                  </span>
                ) : null}
                <span className="time">{itemSelectSeconds}초</span>
              </div>
            );

            if (item.result_flag == 'F') {
              divTag = (
                <div
                  className={`col-12 ${resultFlag}`}
                  key={`history_${item.id}`}
                >
                  <span className="round_char">{index + 1}</span>
                  {item.vocab}={item.mean}
                  {questionType == 'multipleChoice' &&
                  (questionValue == 'vocab' || questionValue == 'mean') ? (
                    <span className="worng_answer">
                      선택한 오답 : {item.answer_vocab}={item.answer_mean}
                    </span>
                  ) : null}
                  {questionType == 'subjective' && questionValue == 'vocab' ? (
                    <span className="worng_answer">
                      입력한 뜻 : {item.answer_mean}
                    </span>
                  ) : null}
                  {questionType == 'subjective' && questionValue == 'mean' ? (
                    <span className="worng_answer">
                      입력한 단어 : {item.answer_vocab}
                    </span>
                  ) : null}
                  <span className="time">{itemSelectSeconds}초</span>
                </div>
              );
            } else if (item.result_flag == 'N') {
              divTag = (
                <div
                  className={`col-12 ${resultFlag}`}
                  key={`history_${item.id}`}
                >
                  <span className="round_char">{index + 1}</span>
                  {item.vocab}={item.mean}
                  <span className="worng_answer">모름</span>
                  <span className="time">{itemSelectSeconds}초</span>
                </div>
              );
            }

            return divTag;
          })}
        </div>
      </div>
    </VocabQuestionResultHistoryBlock>
  );
};

export default VocabQuestionResultHistory;
