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
  .flex_con {
    display:flex;
    flex-wrap:wrap;
    justify-content:space-between;
    align-items:center;
    gap:0.5em;
  }
  .flex_con .flex_item:nth-child(2) {
    flex-grow:1;
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
      questionValueStr = '????????? (??? ?????? ?????? ??????)';
      questionType = 'multipleChoice';
      questionValue = 'mean';
    } else if (
      vocabQuestionResultHistoryList[0]['question_type'] == 'multipleChoice' &&
      vocabQuestionResultHistoryList[0]['question_value'] == 'vocab'
    ) {
      questionValueStr = '????????? (?????? ?????? ??? ??????)';
      questionType = 'multipleChoice';
      questionValue = 'vocab';
    } else if (
      vocabQuestionResultHistoryList[0]['question_type'] == 'subjective' &&
      vocabQuestionResultHistoryList[0]['question_value'] == 'vocab'
    ) {
      questionValueStr = '????????? (?????? ?????? ??? ??????)';
      questionType = 'subjective';
      questionValue = 'vocab';
    } else if (
      vocabQuestionResultHistoryList[0]['question_type'] == 'subjective' &&
      vocabQuestionResultHistoryList[0]['question_value'] == 'mean'
    ) {
      questionValueStr = '????????? (??? ?????? ?????? ??????)';
      questionType = 'subjective';
      questionValue = 'mean';
    }else if (
      vocabQuestionResultHistoryList[0]['question_type'] == 'subjective' &&
      vocabQuestionResultHistoryList[0]['question_value'] == 'dictation'
    ) {
      questionValueStr = '?????? ????????????';
      questionType = 'subjective';
      questionValue = 'dictation';
    }
  }
  return (
    <VocabQuestionResultHistoryBlock>
      <div className="">
        <div className="flex_con">
          <div className="flex_item">
            <div className="wrapper">
              <span
                className="previous"
                onClick={() => onClickBack()}
              >{`< ??????`}</span>
            </div>
          </div>
          <div className="flex_item">
            <h4>
              ???????????? ??????
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
                    ????????? ??? : {item.answer_mean}
                  </span>
                ) : null}
                {questionType === 'subjective' && (questionValue == 'mean' || questionValue == 'dictation') ? (
                  <span className="worng_answer">
                    ????????? ?????? : {item.answer_vocab}
                  </span>
                ) : null}
                <span className="time">{itemSelectSeconds}???</span>
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
                      ????????? ?????? : {item.answer_vocab}={item.answer_mean}
                    </span>
                  ) : null}
                  {questionType == 'subjective' && questionValue == 'vocab' ? (
                    <span className="worng_answer">
                      ????????? ??? : {item.answer_mean}
                    </span>
                  ) : null}
                  {questionType == 'subjective' && (questionValue == 'mean' || questionValue == 'dictation') ? (
                    <span className="worng_answer">
                      ????????? ?????? : {item.answer_vocab}
                    </span>
                  ) : null}
                  <span className="time">{itemSelectSeconds}???</span>
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
                  <span className="worng_answer">??????</span>
                  <span className="time">{itemSelectSeconds}???</span>
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
