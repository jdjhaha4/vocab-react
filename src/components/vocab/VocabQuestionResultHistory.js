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

  .worng_answer {
    display:inline-block;
    padding:5px;
    margin:3px 0 3px 10px;
    border:1px solid ${palette.gray[2]};
    border-radius:15px;
    background:${palette.gray[2]};
    color: #003399;
  }

  .time {
    display:inline-block;
    padding:5px;
    margin:3px 0 3px 10px;
    border:1px solid ${palette.gray[2]};
    border-radius:15px;
    background:${palette.gray[2]};
  }

  .wrapper {
    display:inline-block;
    height: 40px;
    line-height: 40px;
    border:1px soild red;
  }
  .previous {
    display:inline-block;
    padding: 5px;
    background: ${palette.gray[8]};
    color: white;
    border-radius: 10px;
    line-height:normal;
    vertical-align: middle;
    &:hover {
      background: ${palette.gray[6]};
      cursor: pointer;
      border-radius: 10px;
    }
  }
  .question_value {
    margin-left: 10px;
    font-size:1.1rem;
    font-weight: 600;
    color: ${palette.gray[6]};
  }
`;

const VocabQuestionResultHistory = ({
  vocabQuestionResultHistoryList,
  onClickBack,
}) => {
  let questionValue = "";
  if(vocabQuestionResultHistoryList != null && vocabQuestionResultHistoryList.length >0){
    if(vocabQuestionResultHistoryList[0]['question_value'] == 'mean'){
      questionValue = "(뜻 보고 단어 선택)";
    }else if(vocabQuestionResultHistoryList[0]['question_value'] == 'vocab'){
      questionValue = "(단어 보고 뜻 선택)";
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
            <h4>학습결과 이력<span className="question_value">{questionValue}</span></h4>
          </div>
          {vocabQuestionResultHistoryList.map((item, index) => {
            let itemSelectSeconds = 0;
            if((index-1) >= 0){
              const beforeDate = moment(vocabQuestionResultHistoryList[index-1]['regist_datetime'], 'YYYY-MM-DD hh:mm:ss');
              const itemDate = moment(vocabQuestionResultHistoryList[index]['regist_datetime'], 'YYYY-MM-DD hh:mm:ss');
              var duration = moment.duration(itemDate.diff(beforeDate));
              itemSelectSeconds = duration.asSeconds();
            }
            const resultFlag = `result_flag_${item.result_flag}`;
            return item.result_flag == 'F' ? (
              <div className={`col-12 ${resultFlag}`} key={`history_${item.id}`}>
                {item.vocab}={item.mean}
                <span className="worng_answer">선택한 오답 : {item.answer_vocab}={item.answer_mean}</span>
                <span className="time">{itemSelectSeconds}초</span>
              </div>
            ) : (
              <div className={`col-12 ${resultFlag}`} key={`history_${item.id}`}>
                {item.vocab}={item.mean}
                <span className="time">{itemSelectSeconds}초</span>
              </div>
            );
          })}
        </div>
      </div>
    </VocabQuestionResultHistoryBlock>
  );
};

export default VocabQuestionResultHistory;
